import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

type InquiryPayload = {
  name?: string;
  company?: string;
  email?: string;
  phone?: string;
  website?: string;
  projectType?: string;
  timeline?: string;
  budget?: string;
  message?: string;
  middleName?: string;
};

function clean(value: unknown, maxLength = 5000) {
  return String(value ?? "").trim().slice(0, maxLength);
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function row(label: string, value: string) {
  return `
    <tr>
      <td style="padding:12px 16px;border-bottom:1px solid #e5edf6;width:180px;vertical-align:top;font-weight:700;color:#16324f;">
        ${escapeHtml(label)}
      </td>
      <td style="padding:12px 16px;border-bottom:1px solid #e5edf6;color:#425d78;vertical-align:top;">
        ${escapeHtml(value || "Not provided")}
      </td>
    </tr>
  `;
}

export async function POST(request: Request) {
  try {
    const apiKey = process.env.RESEND_API_KEY;

    if (!apiKey) {
      console.error("RESEND_API_KEY is not configured.");

      return NextResponse.json(
        {
          error:
            "The inquiry system is temporarily unavailable. Please email contact@atlasblaketech.com.",
        },
        { status: 500 }
      );
    }

    const body = (await request.json()) as InquiryPayload;

    if (clean(body.middleName, 200)) {
      return NextResponse.json({ success: true });
    }

    const name = clean(body.name, 150);
    const company = clean(body.company, 200);
    const email = clean(body.email, 320);
    const phone = clean(body.phone, 100);
    const website = clean(body.website, 500);
    const projectType = clean(body.projectType, 250);
    const timeline = clean(body.timeline, 250);
    const budget = clean(body.budget, 300);
    const message = clean(body.message, 8000);

    if (!name || !email || !projectType || !message) {
      return NextResponse.json(
        { error: "Please complete all required fields." },
        { status: 400 }
      );
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    const resend = new Resend(apiKey);
    const subjectCompany = company || name;

    const text = [
      "NEW ATLASBLAKE PROJECT INQUIRY",
      "",
      `Name: ${name}`,
      `Company: ${company || "Not provided"}`,
      `Email: ${email}`,
      `Phone: ${phone || "Not provided"}`,
      `Current website: ${website || "Not provided"}`,
      `Project type: ${projectType}`,
      `Preferred timeline: ${timeline || "Not provided"}`,
      `Budget / investment goals: ${budget || "Not provided"}`,
      "",
      "BUSINESS AND PROJECT DETAILS",
      "",
      message,
      "",
      "Submitted through atlasblaketech.com",
    ].join("\n");

    const html = `
      <div style="margin:0;padding:32px 16px;background:#f4f8fc;font-family:Arial,Helvetica,sans-serif;color:#16324f;">
        <div style="max-width:700px;margin:0 auto;background:#ffffff;border:1px solid #dce7f2;border-radius:20px;overflow:hidden;">
          <div style="padding:28px 32px;background:#071a33;color:#ffffff;">
            <div style="color:#5aa8ff;font-size:12px;font-weight:700;letter-spacing:2px;">
              ATLASBLAKE TECHNOLOGIES
            </div>
            <h1 style="margin:10px 0 0;font-size:26px;line-height:1.2;">
              New Project Inquiry
            </h1>
            <p style="margin:8px 0 0;color:#b8cce0;font-size:15px;">
              A new prospective client submitted the website inquiry form.
            </p>
          </div>

          <table cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;font-size:15px;">
            ${row("Name", name)}
            ${row("Company", company)}
            ${row("Email", email)}
            ${row("Phone", phone)}
            ${row("Current website", website)}
            ${row("Project type", projectType)}
            ${row("Preferred timeline", timeline)}
            ${row("Budget / investment goals", budget)}
          </table>

          <div style="padding:28px 32px;">
            <div style="margin-bottom:10px;color:#2563eb;font-size:12px;font-weight:700;letter-spacing:1.5px;">
              BUSINESS AND PROJECT DETAILS
            </div>
            <div style="white-space:pre-wrap;line-height:1.7;color:#425d78;font-size:15px;">${escapeHtml(message)}</div>
          </div>

          <div style="padding:20px 32px;background:#f7faff;border-top:1px solid #e5edf6;color:#6d8299;font-size:12px;">
            Submitted through atlasblaketech.com
          </div>
        </div>
      </div>
    `;

    const { data, error } = await resend.emails.send({
      from:
        process.env.FORM_FROM_EMAIL ||
        "AtlasBlake Website <onboarding@resend.dev>",

      to: [
        process.env.FORM_TO_EMAIL ||
          "contact@atlasblaketech.com",
      ],

      replyTo: email,

      subject: `New AtlasBlake inquiry - ${subjectCompany}`,

      text,
      html,
    });

    if (error) {
      console.error("Resend error:", error);

      return NextResponse.json(
        {
          error:
            "We could not send your inquiry. Please try again or email contact@atlasblaketech.com.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      id: data?.id,
    });
  } catch (error) {
    console.error("Project inquiry error:", error);

    return NextResponse.json(
      {
        error:
          "We could not send your inquiry. Please try again or email contact@atlasblaketech.com.",
      },
      { status: 500 }
    );
  }
}