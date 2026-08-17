import type { Metadata } from "next";
import Link from "next/link";
import Footer from "../components/Footer";
import { Icon } from "../components/Icons";
import MarketingCta from "../components/MarketingCta";
import Navbar from "../components/Navbar";
import PageHero from "../components/PageHero";
import SectionHeading from "../components/SectionHeading";

export const metadata: Metadata = {
  title: "Our Approach | Flexible Website Project Planning",
  description:
    "AtlasBlake shapes website and technology projects around the business goal, priorities, and realistic budget instead of forcing every client into a preset package.",
  alternates: { canonical: "/approach" },
};

const waysToBuild = [
  {
    eyebrow: "Focused foundation",
    title: "Start with what matters most",
    text:
      "Build the essential pages, customer paths, mobile experience, and technical foundation first. This is often the right choice when a business wants a professional result without taking on everything at once.",
    items: [
      "Professional custom design direction",
      "Highest-priority pages and calls to action",
      "Mobile-ready customer experience",
      "Lead capture and technical launch foundation",
    ],
  },
  {
    eyebrow: "Growth-focused build",
    title: "Expand where it creates value",
    text:
      "Add deeper service content, location strategy, proof, analytics, reviews, and conversion improvements when those pieces support the business goal and budget.",
    items: [
      "Expanded service and location content",
      "Reviews, FAQs, proof, and trust sections",
      "Analytics and Search Console foundation",
      "Stronger customer-conversion pathways",
    ],
  },
  {
    eyebrow: "Custom roadmap",
    title: "Build the larger vision in practical stages",
    text:
      "For larger websites, migrations, portals, integrations, automation, or custom software, AtlasBlake can create a roadmap and phase the work instead of requiring every feature on day one.",
    items: [
      "Larger website architecture and migrations",
      "Customer or employee portals",
      "Automation and system integrations",
      "Custom software and workflow tools",
    ],
  },
];

const faqs = [
  [
    "Why does AtlasBlake not publish fixed project prices?",
    "Because two businesses can ask for a website and need completely different amounts of strategy, content, pages, integrations, migration work, and support. AtlasBlake would rather understand the real need and provide a clear written quote than force every client into a preset number.",
  ],
  [
    "Can AtlasBlake work with a smaller budget?",
    "Sometimes the best answer is a smaller first phase. If the full vision does not fit the current budget, we can look for a useful way to prioritize the must-haves, simplify the scope, or build in stages without pretending that every budget can support every project.",
  ],
  [
    "What if I do not know what my budget should be?",
    "That is completely fine. Start with the business goal. AtlasBlake can help identify the most important pieces, explain the tradeoffs, and prepare a written recommendation before you commit to the work.",
  ],
  [
    "Will I know the investment before work begins?",
    "Yes. The project scope, deliverables, responsibilities, timeline, project investment, recurring services if any, and major exclusions are documented before development begins.",
  ],
  [
    "What happens if I ask for something outside the original scope?",
    "Nothing is silently added to the bill. New pages, features, integrations, or other meaningful changes are discussed and approved before additional work begins.",
  ],
  [
    "Does flexible pricing mean lower quality?",
    "No. Flexibility means changing the scope or the order of the work when needed, not lowering the standard of the finished work. AtlasBlake will be clear when a requested budget and scope do not realistically match.",
  ],
];

export default function ApproachPage() {
  return (
    <main>
      <Navbar />

      <PageHero
        eyebrow="How we work"
        title="Professional work should fit the business - not force the business into a package."
        text="AtlasBlake does not publish one-size-fits-all project prices. We start with the goal, the priorities, and what feels realistic for the business. Then we shape a clear plan around the work that matters most."
        primaryLabel="Start a Conversation"
        primaryHref="/start-a-project"
        secondaryLabel="See Our Work"
        secondaryHref="/work"
      />

      <section className="bg-white px-6 py-24 md:py-32">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Budget-aware by design"
            title="Tell us what you want to accomplish. We will help find the smartest path there."
            text="The goal is not to make every project as large as possible. The goal is to recommend work that genuinely helps the business and makes sense for where the company is today."
          />

          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              [
                "users",
                "Listen first",
                "Understand the company, customers, goals, current problems, and priorities before recommending a solution.",
              ],
              [
                "layers",
                "Shape the scope",
                "Prioritize what creates the most value now instead of filling a proposal with features the business does not need.",
              ],
              [
                "chart",
                "Build in phases",
                "When the full vision is too much for one project, create a useful first phase and leave room to grow later.",
              ],
              [
                "shield",
                "Keep it clear",
                "Put the agreed scope and investment in writing before development begins, with no surprise additions.",
              ],
            ].map(([icon, title, text]) => (
              <article key={title} className="marketing-card p-7">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-[#eaf3ff] text-[#2563eb]">
                  <Icon name={icon as "users"} className="h-5 w-5" />
                </span>
                <h2 className="mt-5 text-xl font-black">{title}</h2>
                <p className="mt-3 leading-7 text-[#607991]">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-[#dce7f2] bg-[#f6f9fd] px-6 py-24 md:py-32">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Ways the work can take shape"
            title="Start at the level that makes sense now."
            text="These are examples of how a project can be organized - not fixed packages. The final scope is built around the business."
          />

          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {waysToBuild.map((item, index) => (
              <article
                key={item.title}
                className={`overflow-hidden rounded-[28px] border ${
                  index === 1
                    ? "border-[#2563eb] shadow-[0_24px_70px_rgba(23,62,103,.12)]"
                    : "border-[#dce7f2]"
                } bg-white`}
              >
                <div className={`${index === 1 ? "bg-[#1466f2]" : "bg-[#0b264b]"} px-7 py-6 text-white`}>
                  <p className="text-xs font-black uppercase tracking-[.18em] text-blue-200">
                    {item.eyebrow}
                  </p>
                  <h2 className="mt-3 text-2xl font-black">{item.title}</h2>
                </div>

                <div className="p-7">
                  <p className="leading-7 text-[#607991]">{item.text}</p>
                  <div className="mt-7 space-y-4 border-t border-[#dce7f2] pt-7">
                    {item.items.map((feature) => (
                      <div key={feature} className="flex gap-3 font-bold leading-6 text-[#405c77]">
                        <Icon name="check" className="mt-0.5 h-5 w-5 shrink-0 text-[#2563eb]" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                  <Link href="/start-a-project" className="button-secondary mt-8 w-full justify-center">
                    Talk About Your Goals
                    <Icon name="arrow" className="h-4 w-4" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-24 md:py-32">
        <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[.9fr_1.1fr] lg:items-start">
          <SectionHeading
            eyebrow="Ongoing care"
            title="Support should fit the website too."
            text="Some businesses need dependable hosting, backups, updates, and occasional help. Others need more active SEO, content, performance, or strategy support. Ongoing care is scoped to the site and the level of partnership that is actually useful."
          />

          <div className="grid gap-4 sm:grid-cols-2">
            {[
              "Managed hosting, SSL, monitoring, and backups",
              "Security, spam monitoring, and routine updates",
              "Minor website changes and content support",
              "Performance and broken-link reviews",
              "Technical SEO and Search Console support",
              "Priority support or strategy reviews when needed",
            ].map((item) => (
              <div
                key={item}
                className="flex min-h-24 items-center gap-4 rounded-2xl border border-[#dce7f2] bg-[#f9fbfd] p-5 font-black text-[#29455f]"
              >
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[#e8f2ff] text-[#2563eb]">
                  <Icon name="check" className="h-5 w-5" />
                </span>
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#06172d] px-6 py-24 text-white">
        <div className="hero-grid-dark absolute inset-0" />
        <div className="relative mx-auto grid max-w-7xl gap-14 lg:grid-cols-[1.05fr_.95fr] lg:items-center">
          <div>
            <p className="text-sm font-black uppercase tracking-[.24em] text-blue-300">
              The AtlasBlake promise
            </p>
            <h2 className="mt-5 text-balance text-4xl font-black tracking-[-.045em] md:text-6xl">
              Helping the business comes before making the project bigger.
            </h2>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
              AtlasBlake is building a business for the long term. That means doing work we can stand behind,
              treating people fairly, and earning trust through useful results - not pressure.
            </p>
          </div>

          <div className="rounded-[28px] border border-white/10 bg-white/[.05] p-8">
            <div className="space-y-5">
              {[
                "We will not recommend features just because they make the invoice larger.",
                "If a smaller first phase is the smarter decision, we will say so.",
                "We can separate must-haves from nice-to-haves and build a roadmap.",
                "You will know the agreed scope and investment before work begins.",
                "If AtlasBlake is not the right fit, we would rather be straightforward than oversell the project.",
              ].map((item) => (
                <div key={item} className="flex gap-3 text-slate-200">
                  <Icon name="check" className="mt-0.5 h-5 w-5 shrink-0 text-blue-300" />
                  <span className="font-bold leading-7">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#f6f9fd] px-6 py-24 md:py-32">
        <div className="mx-auto max-w-5xl">
          <SectionHeading
            eyebrow="Project questions"
            title="Clear expectations before anyone commits."
            text="A flexible approach should still be professional, documented, and easy to understand."
          />

          <div className="mt-12 space-y-4">
            {faqs.map(([question, answer]) => (
              <details key={question} className="group rounded-2xl border border-[#dce7f2] bg-white p-6">
                <summary className="cursor-pointer list-none pr-8 text-lg font-black text-[#173957]">
                  {question}
                </summary>
                <p className="mt-4 max-w-3xl leading-7 text-[#607991]">{answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <MarketingCta
        eyebrow="Your business. Your priorities."
        title="Start with the vision - then build the right plan."
        text="Tell us what you want to improve and what matters most to the business. If you have a budget in mind, share it. If you do not, we can start with the goal and work from there."
      />

      <Footer />
    </main>
  );
}