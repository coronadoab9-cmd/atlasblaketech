import type { Metadata } from "next";
import Link from "next/link";
import Footer from "../components/Footer";
import { Icon } from "../components/Icons";
import MarketingCta from "../components/MarketingCta";
import Navbar from "../components/Navbar";
import PageHero from "../components/PageHero";

export const metadata: Metadata = {
  title: "About AtlasBlake Technologies",
  description:
    "AtlasBlake Technologies helps businesses turn ideas into professional websites and practical technology through clear guidance, thoughtful design, and flexible project planning.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <main>
      <Navbar />
      <PageHero
        eyebrow="About AtlasBlake"
        title="Technology should make the business easier to run, not harder to understand."
        text="AtlasBlake helps business owners turn ideas into professional websites and practical systems with clear communication, useful scope, and support after launch."
        primaryLabel="Start a Project"
        primaryHref="/start-a-project"
        secondaryLabel="See Our Work"
        secondaryHref="/work"
      />

      <section className="bg-white px-5 py-16 sm:px-6 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[.85fr_1.15fr] lg:items-start">
          <div>
            <p className="text-xs font-bold uppercase tracking-[.2em] text-[#2563EB] sm:text-sm">Why AtlasBlake exists</p>
            <h2 className="mt-4 text-balance text-3xl font-black tracking-[-.04em] text-[#0A0F1E] sm:text-4xl md:text-5xl">
              Bridge the gap between a business idea and a professional result.
            </h2>
          </div>
          <div className="space-y-5 text-lg leading-8 text-[#64748B]">
            <p>
              Many business owners know what they want their company to become but do not have the time or technical background to turn that vision into a polished website or dependable digital system.
            </p>
            <p>
              AtlasBlake listens first, explains the options clearly, and builds around the result the company actually needs. The client should understand what is being built, why it matters, and what happens after launch.
            </p>
            <p className="font-extrabold text-[#1F2937]">
              The goal is not to sell the largest project. The goal is to help the business move forward with the right project.
            </p>
          </div>
        </div>
      </section>

      <section className="border-y border-[#E5E7EB] bg-[#F8FAFC] px-5 py-16 sm:px-6 md:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-5 md:grid-cols-3">
            {[
              ["users", "Direct communication", "Work directly with someone who understands the goals and the decisions behind the project."],
              ["layers", "Business-first thinking", "The company, its customers, and its future plans guide the design instead of a recycled template."],
              ["chart", "Room to grow", "Start with a professional website and expand into automation, portals, or custom software when it makes sense."],
            ].map(([icon, title, text]) => (
              <article key={title} className="marketing-card p-6 md:p-7">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#EFF6FF] text-[#2563EB]">
                  <Icon name={icon as "users"} className="h-5 w-5" />
                </span>
                <h2 className="mt-5 text-xl font-black text-[#1F2937]">{title}</h2>
                <p className="mt-3 leading-7 text-[#64748B]">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-16 sm:px-6 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.05fr_.95fr] lg:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[.2em] text-[#2563EB] sm:text-sm">What makes the relationship different</p>
            <h2 className="mt-4 text-balance text-3xl font-black tracking-[-.04em] text-[#0A0F1E] sm:text-4xl md:text-5xl">
              A website partner who understands the business behind the screen.
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-[#64748B]">
              AtlasBlake combines business and operational thinking with design, development, automation, and software capability. That means the relationship can grow beyond a public website when the business needs more.
            </p>
            <Link href="/services" className="button-secondary mt-7">
              Explore Services
              <Icon name="arrow" className="h-4 w-4" />
            </Link>
          </div>
          <div className="divide-y divide-[#E5E7EB] border-y border-[#E5E7EB]">
            {[
              "Custom solutions instead of recycled industry templates",
              "Clear scope before development begins",
              "Client control of business accounts and content",
              "Support after launch",
              "Ability to grow into portals, automation, and custom systems",
            ].map((item) => (
              <div key={item} className="flex items-center gap-3 py-4 font-extrabold text-[#475569]">
                <Icon name="check" className="h-4 w-4 shrink-0 text-[#2563EB]" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <MarketingCta />
      <Footer />
    </main>
  );
}
