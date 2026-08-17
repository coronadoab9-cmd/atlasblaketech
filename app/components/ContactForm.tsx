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
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result?.error || "We could not send your inquiry. Please try again."
        );
      }

      formElement.reset();
      setStatus("success");
    } catch (error) {
      console.error(error);

      setStatus("error");
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "We could not send your inquiry. Please try again."
      );
    }
  }

  return (
    <form
      onSubmit={submit}
      className="rounded-[30px] border border-[#dce7f2] bg-white p-6 shadow-[0_24px_70px_rgba(23,62,103,0.12)] md:p-9"
    >
      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Name" name="name" placeholder="Your name" required />

        <Field label="Company" name="company" placeholder="Company name" />

        <Field
          label="Email"
          name="email"
          type="email"
          placeholder="you@company.com"
          required
        />

        <Field
          label="Phone"
          name="phone"
          type="tel"
          placeholder="(214) 555-0100"
        />

        <div className="md:col-span-2">
          <Field
            label="Current website, if any"
            name="website"
            type="text"
            placeholder="Website, Facebook page, N/A, or anything you would like us to know"
          />
        </div>

        <Select
          label="What would you like help with?"
          name="projectType"
          options={projectTypes}
          required
        />

        <Field
          label="Preferred timeline"
          name="timeline"
          placeholder="Example: Standard 5-7 weeks or preferred launch date"
        />

        <div className="md:col-span-2">
          <Field
            label="Budget or investment goals (optional)"
            name="budget"
            placeholder="Share what feels comfortable, a range, or 'not sure yet'. We can shape the scope around it."
          />
        </div>

        <div className="md:col-span-2">
          <label
            className="mb-2 block text-sm font-extrabold text-[#16324f]"
            htmlFor="message"
          >
            Tell us about your business and vision
          </label>

          <textarea
            id="message"
            name="message"
            rows={8}
            required
            placeholder="What does your company do? What is not working today? What should customers be able to see or do? What would a successful result look like?"
            className="form-control resize-none"
          />
        </div>

        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            left: "-10000px",
            width: "1px",
            height: "1px",
            overflow: "hidden",
          }}
        >
          <label htmlFor="middleName">Leave this field blank</label>
          <input
            id="middleName"
            name="middleName"
            type="text"
            tabIndex={-1}
            autoComplete="off"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="button-primary mt-6 w-full justify-center disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {status === "sending" ? "Sending..." : "Send Project Inquiry"}
        <Icon name="arrow" className="h-5 w-5" />
      </button>

      <p className="mt-4 text-sm leading-6 text-[#6d8299]">
        Tell us about your project and we will review the details and follow up directly.
        No technical specification is required, and you do not need to know the perfect
        scope before reaching out.
      </p>

      {status === "success" ? (
        <div
          className="mt-4 rounded-2xl border border-emerald-200 bg-emerald-50 p-4"
          role="status"
        >
          <p className="font-extrabold text-emerald-800">
            Thank you - your project inquiry has been sent.
          </p>
          <p className="mt-1 text-sm text-emerald-700">
            AtlasBlake will review your goals and follow up with you directly.
          </p>
        </div>
      ) : null}

      {status === "error" ? (
        <div
          className="mt-4 rounded-2xl border border-red-200 bg-red-50 p-4"
          role="alert"
        >
          <p className="font-extrabold text-red-800">
            We could not send your inquiry.
          </p>
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
      <label
        className="mb-2 block text-sm font-extrabold text-[#16324f]"
        htmlFor={name}
      >
        {label}
      </label>

      <input
        className="form-control"
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
      />
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
      <label
        className="mb-2 block text-sm font-extrabold text-[#16324f]"
        htmlFor={name}
      >
        {label}
      </label>

      <select
        className="form-control"
        id={name}
        name={name}
        required={required}
      >
        <option value="">Select an option</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
