import type { Metadata } from "next";
import Footer from "../components/Footer";
import { Icon } from "../components/Icons";
import MarketingCta from "../components/MarketingCta";
import Navbar from "../components/Navbar";
import PageHero from "../components/PageHero";

export const metadata: Metadata = {
  title: "Our Approach | Clear, Flexible Project Planning",
  description:
    "AtlasBlake plans website and technology projects around the business goal, priorities, and realistic budget with clear scope before work begins.",
  alternates: { canonical: "/approach" },
};

const steps = [
  ["01", "Listen", "Understand the business, customers, current problems, goals, and what success should look like."],
  ["02", "Prioritize", "Separate the must-haves from the nice-to-haves and focus the first scope on what matters most."],
  ["03", "Build", "Design and develop the agreed work with clear review points, practical communication, and no silent scope changes."],
  ["04", "Support", "Launch cleanly, keep the website dependable, and expand it later when the next investment makes sense."],
];

const faqs = [
  [
    "Why are there no fixed public prices?",
    "Two businesses can ask for a website and need very different amounts of strategy, content, pages, integrations, migration work, and support. AtlasBlake reviews the actual need first and provides a clear written quote.",
  ],
  [
    "Can the project be phased?",
    "Yes. If the larger vision should not happen all at once, the work can be organized into a useful first phase with a roadmap for what comes next.",
  ],
  [
    "What if I do not know what I need yet?",
    "That is normal. Start with the business goal or the problem you want to solve. AtlasBlake can help define the practical scope from there.",
  ],
];

export default function ApproachPage() {
  return (
    <main>
      <Navbar />
      <PageHero
        eyebrow="How we work"
        title="Clear thinking before more technology."
        text="AtlasBlake starts with the business goal, not a preset package. The scope is shaped around the priorities, the customer experience, and what makes sense to invest in now."
        primaryLabel="Start a Conversation"
        primaryHref="/start-a-project"
        secondaryLabel="See Our Work"
        secondaryHref="/work"
      />

      <section className="bg-white px-5 py-16 sm:px-6 md:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {steps.map(([number, title, text]) => (
              <article key={number} className="border-t-2 border-[#176bff] pt-5">
                <p className="text-xs font-black tracking-[.18em] text-[#176bff]">{number}</p>
                <h2 className="mt-4 text-2xl font-black tracking-[-.03em]">{title}</h2>
                <p className="mt-3 leading-7 text-[#667b90]">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-[#e1e9f1] bg-[#f7f9fc] px-5 py-16 sm:px-6 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[.85fr_1.15fr] lg:items-center">
          <div>
            <p className="text-xs font-black uppercase tracking-[.2em] text-[#176bff] sm:text-sm">Flexible without being vague</p>
            <h2 className="mt-4 text-balance text-3xl font-black tracking-[-.04em] sm:text-4xl md:text-5xl">
              Change the scope when needed, not the standard of the work.
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-8 text-[#667b90]">
              A smaller first phase can be the right decision. A larger roadmap can be the right decision too. The important part is knowing what is included, why it matters, and what the investment is before development begins.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {[
              "No features added just to make the project larger",
              "Must-haves separated from future ideas",
              "Written scope and investment before development",
              "Meaningful changes discussed before extra work",
              "Client-controlled business accounts and content",
              "Room to expand as the business grows",
            ].map((item) => (
              <div key={item} className="flex gap-3 rounded-xl border border-[#e1e9f1] bg-white p-4 text-sm font-extrabold leading-6 text-[#29445f]">
                <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-[#176bff]" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-16 sm:px-6 md:py-20">
        <div className="mx-auto max-w-4xl">
          <p className="text-xs font-black uppercase tracking-[.2em] text-[#176bff] sm:text-sm">Common questions</p>
          <h2 className="mt-4 text-3xl font-black tracking-[-.04em] sm:text-4xl">Simple answers before anyone commits.</h2>
          <div className="mt-8 divide-y divide-[#e1e9f1] border-y border-[#e1e9f1]">
            {faqs.map(([question, answer]) => (
              <details key={question} className="group py-5">
                <summary className="cursor-pointer list-none pr-8 text-lg font-black text-[#18324d]">{question}</summary>
                <p className="mt-3 max-w-3xl leading-7 text-[#667b90]">{answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <MarketingCta
        eyebrow="Your business. Your priorities."
        title="Start with the goal. Build the right plan from there."
        text="You do not need a technical specification or a perfect budget number to begin the conversation."
      />
      <Footer />
    </main>
  );
}
