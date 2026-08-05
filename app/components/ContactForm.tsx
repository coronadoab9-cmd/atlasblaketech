"use client";

import { FormEvent, useState } from "react";
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

const budgets = [
  "Core Website — $3,000 + $150/month Core Care",
  "Growth Website — $5,000 + $250/month Growth Care",
  "Premium Website — $7,500+ + $400+/month Premium Care",
  "Custom technology or other written scope",
  "Not sure yet",
];

export default function ContactForm() {
  const [sent, setSent] = useState(false);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const subject = encodeURIComponent(`AtlasBlake project inquiry — ${String(form.get("company") || form.get("name") || "New project")}`);
    const body = encodeURIComponent([
      `Name: ${form.get("name") || ""}`,
      `Company: ${form.get("company") || ""}`,
      `Email: ${form.get("email") || ""}`,
      `Phone: ${form.get("phone") || ""}`,
      `Current website: ${form.get("website") || ""}`,
      `Project type: ${form.get("projectType") || ""}`,
      `Preferred timeline: ${form.get("timeline") || ""}`,
      `Estimated budget: ${form.get("budget") || ""}`,
      "",
      "Business goals and project details:",
      String(form.get("message") || ""),
    ].join("\n"));
    setSent(true);
    window.location.href = `mailto:contact@atlasblaketech.com?subject=${subject}&body=${body}`;
  }

  return (
    <form onSubmit={submit} className="rounded-[30px] border border-[#dce7f2] bg-white p-6 shadow-[0_24px_70px_rgba(23,62,103,0.12)] md:p-9">
      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Name" name="name" placeholder="Your name" required />
        <Field label="Company" name="company" placeholder="Company name" />
        <Field label="Email" name="email" type="email" placeholder="you@company.com" required />
        <Field label="Phone" name="phone" type="tel" placeholder="(214) 555-0100" />
        <div className="md:col-span-2"><Field label="Current website, if any" name="website" type="url" placeholder="https://yourcompany.com" /></div>
        <Select label="What would you like help with?" name="projectType" options={projectTypes} required />
        <Field label="Preferred timeline" name="timeline" placeholder="Example: Standard 5–7 weeks or preferred launch date" />
        <div className="md:col-span-2"><Select label="Estimated investment" name="budget" options={budgets} /></div>
        <div className="md:col-span-2">
          <label className="mb-2 block text-sm font-extrabold text-[#16324f]" htmlFor="message">Tell us about your business and vision</label>
          <textarea id="message" name="message" rows={8} required placeholder="What does your company do? What is not working today? What should customers be able to see or do? What would a successful result look like?" className="form-control resize-none" />
        </div>
      </div>
      <button type="submit" className="button-primary mt-6 w-full justify-center sm:w-auto">
        Prepare Project Email<Icon name="arrow" className="h-5 w-5" />
      </button>
      <p className="mt-4 text-sm leading-6 text-[#6d8299]">Submitting opens your email app with your project details already filled in. No technical specification is required.</p>
      {sent ? <p className="mt-3 text-sm font-extrabold text-emerald-700">Your email draft is ready to send.</p> : null}
    </form>
  );
}

function Field({ label, name, type = "text", placeholder, required = false }: { label: string; name: string; type?: string; placeholder: string; required?: boolean }) {
  return <div><label className="mb-2 block text-sm font-extrabold text-[#16324f]" htmlFor={name}>{label}</label><input className="form-control" id={name} name={name} type={type} placeholder={placeholder} required={required}/></div>;
}
function Select({ label, name, options, required = false }: { label: string; name: string; options: string[]; required?: boolean }) {
  return <div><label className="mb-2 block text-sm font-extrabold text-[#16324f]" htmlFor={name}>{label}</label><select className="form-control" id={name} name={name} required={required}><option value="">Select an option</option>{options.map((option)=><option key={option} value={option}>{option}</option>)}</select></div>;
}
