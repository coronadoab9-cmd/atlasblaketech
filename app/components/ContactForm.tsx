"use client";

import { FormEvent, useState } from "react";
import { Icon } from "./Icons";

const projectTypes = [
  "Business website",
  "Custom software",
  "Mobile application",
  "Automation or integration",
  "Existing system improvement",
  "Not sure yet",
];

const budgets = [
  "Under $2,500",
  "$2,500–$5,000",
  "$5,000–$15,000",
  "$15,000–$50,000",
  "$50,000+",
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
      `Project type: ${form.get("projectType") || ""}`,
      `Timeline: ${form.get("timeline") || ""}`,
      `Budget: ${form.get("budget") || ""}`,
      "",
      "Project details:",
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
        <Select label="What do you need?" name="projectType" options={projectTypes} required />
        <Field label="Estimated timeline" name="timeline" placeholder="Example: 6–8 weeks" />
        <div className="md:col-span-2"><Select label="Estimated budget" name="budget" options={budgets} /></div>
        <div className="md:col-span-2">
          <label className="mb-2 block text-sm font-bold text-[#16324f]" htmlFor="message">Project description</label>
          <textarea id="message" name="message" rows={7} required placeholder="Tell us what your business is trying to accomplish, what currently exists, and what a successful result would look like." className="form-control resize-none" />
        </div>
      </div>
      <button type="submit" className="button-primary mt-6 w-full justify-center sm:w-auto">
        Prepare Project Email<Icon name="arrow" className="h-5 w-5" />
      </button>
      <p className="mt-4 text-sm leading-6 text-[#6d8299]">
        Submitting opens your email app with the project details already filled in, so your inquiry is never lost.
      </p>
      {sent ? <p className="mt-3 text-sm font-bold text-emerald-700">Your email draft is ready to send.</p> : null}
    </form>
  );
}

function Field({ label, name, type = "text", placeholder, required = false }: { label: string; name: string; type?: string; placeholder: string; required?: boolean }) {
  return <div><label className="mb-2 block text-sm font-bold text-[#16324f]" htmlFor={name}>{label}</label><input className="form-control" id={name} name={name} type={type} placeholder={placeholder} required={required}/></div>;
}

function Select({ label, name, options, required = false }: { label: string; name: string; options: string[]; required?: boolean }) {
  return <div><label className="mb-2 block text-sm font-bold text-[#16324f]" htmlFor={name}>{label}</label><select className="form-control" id={name} name={name} required={required}><option value="">Select an option</option>{options.map((option)=><option key={option} value={option}>{option}</option>)}</select></div>;
}
