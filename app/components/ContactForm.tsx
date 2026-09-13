"use client";

import { useState, type FormEvent } from "react";
import { Icon } from "./Icons";

const projectTypes = [
  "Professional business website",
  "Website redesign",
  "Local SEO and growth",
  "Website care and support",
  "Customer portal or custom system",
  "Automation or integration",
  "Not sure yet",
];

type SubmitStatus = "idle" | "sending" | "success" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formElement = event.currentTarget;
    const form = new FormData(formElement);

    setStatus("sending");
    setErrorMessage("");

    const payload = {
      name: String(form.get("name") || ""),
      company: String(form.get("company") || ""),
      email: String(form.get("email") || ""),
      phone: String(form.get("phone") || ""),
      website: String(form.get("website") || ""),
      projectType: String(form.get("projectType") || ""),
      timeline: String(form.get("timeline") || ""),
      budget: String(form.get("budget") || ""),
      message: String(form.get("message") || ""),
      middleName: String(form.get("middleName") || ""),
    };

    try {
      const response = await fetch("/api/project-inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result?.error || "We could not send your inquiry. Please try again.");
      }

      formElement.reset();
      setStatus("success");
    } catch (error) {
      console.error(error);
      setStatus("error");
      setErrorMessage(error instanceof Error ? error.message : "We could not send your inquiry. Please try again.");
    }
  }

  return (
    <form onSubmit={submit} className="rounded-[22px] border border-[#e1e9f1] bg-white p-5 shadow-[0_18px_50px_rgba(18,49,82,.07)] sm:p-7 md:p-8">
      <div className="mb-7">
        <p className="text-xs font-black uppercase tracking-[.18em] text-[#176bff]">Project inquiry</p>
        <h2 className="mt-3 text-2xl font-black tracking-[-.03em] text-[#0b1f33]">Tell us what you want to improve.</h2>
        <p className="mt-2 text-sm leading-6 text-[#718497]">A few useful details are enough to start. You do not need to have the scope figured out yet.</p>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Name" name="name" placeholder="Your name" required />
        <Field label="Company" name="company" placeholder="Company name" />
        <Field label="Email" name="email" type="email" placeholder="you@company.com" required />
        <Field label="Phone" name="phone" type="tel" placeholder="(214) 555-0100" />

        <div className="md:col-span-2">
          <Field label="Current website, if any" name="website" placeholder="Website, Facebook page, or N/A" />
        </div>

        <Select label="What would you like help with?" name="projectType" options={projectTypes} required />
        <Field label="Preferred timeline" name="timeline" placeholder="Target date or not sure yet" />

        <div className="md:col-span-2">
          <Field
            label="Budget or investment goals (optional)"
            name="budget"
            placeholder="A range, a comfortable starting point, or not sure yet"
          />
        </div>

        <div className="md:col-span-2">
          <label className="mb-2 block text-sm font-extrabold text-[#29445f]" htmlFor="message">
            What would a successful result look like?
          </label>
          <textarea
            id="message"
            name="message"
            rows={6}
            required
            placeholder="Tell us what the business does, what is not working today, and what you want customers or employees to be able to do."
            className="form-control resize-none"
          />
        </div>

        <div aria-hidden="true" style={{ position: "absolute", left: "-10000px", width: "1px", height: "1px", overflow: "hidden" }}>
          <label htmlFor="middleName">Leave this field blank</label>
          <input id="middleName" name="middleName" type="text" tabIndex={-1} autoComplete="off" />
        </div>
      </div>

      <button type="submit" disabled={status === "sending"} className="button-primary mt-6 w-full disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto">
        {status === "sending" ? "Sending..." : "Send Project Inquiry"}
        <Icon name="arrow" className="h-4 w-4" />
      </button>

      <p className="mt-4 text-xs leading-5 text-[#8393a3]">Your inquiry goes directly to AtlasBlake and is reviewed before any proposal is prepared.</p>

      {status === "success" ? (
        <div className="mt-5 rounded-xl border border-emerald-200 bg-emerald-50 p-4" role="status">
          <p className="font-extrabold text-emerald-800">Thank you - your project inquiry has been sent.</p>
          <p className="mt-1 text-sm text-emerald-700">AtlasBlake will review the details and follow up directly.</p>
        </div>
      ) : null}

      {status === "error" ? (
        <div className="mt-5 rounded-xl border border-red-200 bg-red-50 p-4" role="alert">
          <p className="font-extrabold text-red-800">We could not send your inquiry.</p>
          <p className="mt-1 text-sm text-red-700">{errorMessage}</p>
        </div>
      ) : null}
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  required = false,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-extrabold text-[#29445f]" htmlFor={name}>{label}</label>
      <input className="form-control" id={name} name={name} type={type} placeholder={placeholder} required={required} />
    </div>
  );
}

function Select({
  label,
  name,
  options,
  required = false,
}: {
  label: string;
  name: string;
  options: string[];
  required?: boolean;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-extrabold text-[#29445f]" htmlFor={name}>{label}</label>
      <select className="form-control" id={name} name={name} required={required}>
        <option value="">Select an option</option>
        {options.map((option) => <option key={option} value={option}>{option}</option>)}
      </select>
    </div>
  );
}
