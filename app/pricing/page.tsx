import type { Metadata } from "next";
import Link from "next/link";
import Footer from "../components/Footer";
import { Icon } from "../components/Icons";
import MarketingCta from "../components/MarketingCta";
import Navbar from "../components/Navbar";
import PageHero from "../components/PageHero";
import SectionHeading from "../components/SectionHeading";
import { carePlans, projectTerms, websitePackages } from "../lib/marketing";

export const metadata: Metadata = {
  title: "Website Packages, Managed Care & Pricing",
  description:
    "AtlasBlake website pricing: Core Website at $3,000, Growth Website at $5,000, Premium Website from $7,500, and corresponding managed care plans.",
  alternates: { canonical: "/pricing" },
};

const paymentMilestones = [
  ["Project deposit", "Reserves the project and begins discovery.", projectTerms.deposit],
  ["Launch balance", "Due after final approval and before publication.", projectTerms.launchBalance],
  ["Additional development", "Only for approved work outside the signed scope.", projectTerms.additionalDevelopment],
];

const pricingFaqs = [
  [
    "Are there surprise overages?",
    "No hidden work is added automatically. Any added page, integration, content expansion, redesign, or other work outside the signed scope is priced and approved before development begins.",
  ],
  [
    "How long does a typical website project take?",
    "The standard estimate is 5–7 weeks from kickoff. Timing assumes the client provides requested content, access, consolidated feedback, and approvals on schedule.",
  ],
  [
    "How many revision rounds are included?",
    "Two consolidated revision rounds are included for the agreed pages. Additional revisions, new pages, new features, or major direction changes require an approved change order.",
  ],
  [
    "Is the monthly care plan required?",
    "The corresponding care plan is required while AtlasBlake hosts the website unless a signed addendum states otherwise. Care begins at launch and is billed monthly in advance.",
  ],
  [
    "Can managed care be canceled?",
    "Managed Hosting & Care is month-to-month and may be canceled with 30 days’ written notice. Fees are not prorated for partial billing periods, and cancellation does not automatically transfer the complete website platform.",
  ],
  [
    "Who owns the domain and business assets?",
    "The client retains ownership of its domain, trademarks, logos, client-provided content, customer data, Google Business Profile, analytics, and other business-owned accounts. AtlasBlake retains its reusable code, design systems, methods, internal tools, hosting infrastructure, and nontransferable licenses.",
  ],
  [
    "Can the website be moved to another provider?",
    "A Website Migration & Handoff Package is available for $2,500 during the first 12 months after launch or $750 after 12 consecutive months of Managed Hosting & Care. The signed agreement controls the exact transition scope and exclusions.",
  ],
  [
    "Do you guarantee Google rankings or a certain number of leads?",
    "No. AtlasBlake does not guarantee a specific Google position, traffic, leads, sales, or revenue. The work creates and maintains a professional technical and content foundation that can be measured and improved over time.",
  ],
];

export default function PricingPage() {
  return (
    <main>
      <Navbar />
      <PageHero
        eyebrow="Website pricing"
        title="Three website packages. One client-first approach."
        text="Every package is custom-built, mobile-ready, and paired with managed care after launch. Scope, payment milestones, ownership, and transition terms are explained before work begins."
        primaryLabel="Start Your Project"
        primaryHref="/start-a-project"
        secondaryLabel="View Our Work"
        secondaryHref="/work"
      />

      <section className="bg-white px-6 py-24 md:py-32">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Website investment"
            title="Choose the level that fits your business today."
            text="Growth Website is the recommended option for many local service businesses. Premium Website projects receive a written custom scope."
          />
          <div className="mt-16 grid gap-6 lg:grid-cols-3">
            {websitePackages.map((pkg) => (
              <PackageCard key={pkg.name} pkg={pkg} />
            ))}
          </div>
          <p className="mt-8 rounded-2xl border-l-4 border-[#2563eb] bg-[#eef5ff] px-6 py-5 text-sm font-bold leading-6 text-[#405c77]">
            Premium projects begin at $7,500. Added pages, integrations, content expansion, redesigns, or other work outside the signed scope are quoted and approved before development begins.
          </p>
        </div>
      </section>

      <section className="border-y border-[#dce7f2] bg-[#f6f9fd] px-6 py-24 md:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-14 lg:grid-cols-[.72fr_1.28fr] lg:items-start">
            <SectionHeading
              eyebrow="Payment milestones"
              title="Clear before the project begins."
              text="The project fee is split into two milestones. Additional development applies only to approved work outside the signed scope."
            />
            <div className="overflow-hidden rounded-[26px] border border-[#cbdced] bg-white shadow-[0_18px_55px_rgba(23,62,103,.08)]">
              <div className="hidden grid-cols-[.85fr_1.55fr_.35fr] bg-[#081f3e] px-6 py-4 text-xs font-black uppercase tracking-[.12em] text-white md:grid">
                <span>Payment milestone</span><span>Description</span><span className="text-right">Amount</span>
              </div>
              {paymentMilestones.map(([name, description, amount]) => (
                <div key={name} className="grid gap-2 border-t border-[#dce7f2] px-6 py-5 first:border-t-0 md:grid-cols-[.85fr_1.55fr_.35fr] md:items-center">
                  <p className="font-black text-[#173957]">{name}</p>
                  <p className="text-sm leading-6 text-[#607991]">{description}</p>
                  <p className="font-black text-[#173957] md:text-right">{amount}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-24 md:py-32">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Managed Hosting & Care"
            title="Ongoing care matched to the website you choose."
            text="Care begins at launch, is billed monthly in advance, and may be canceled with 30 days’ written notice under the signed agreement. Unused update time does not roll over."
          />
          <div className="mt-16 grid gap-6 lg:grid-cols-3">
            {carePlans.map((plan) => (
              <CareCard key={plan.name} plan={plan} />
            ))}
          </div>
          <div className="mt-8 grid gap-5 lg:grid-cols-2">
            <InfoBox
              title="The care level follows the build"
              text="Core, Growth, and Premium websites are paired with their corresponding care plans. A client may upgrade at any time. A downgrade requires written approval because larger websites may require more infrastructure, monitoring, and support."
            />
            <InfoBox
              title="Work quoted separately"
              text="Major redesigns, new pages, extensive copywriting, paid advertising, full SEO campaigns, advanced integrations, e-commerce, and custom development are separate services unless expressly included in writing."
              dark
            />
          </div>
          <p className="mt-5 rounded-2xl border-l-4 border-[#2563eb] bg-[#eef5ff] px-6 py-5 text-sm font-bold leading-6 text-[#405c77]">
            Care plans maintain and improve the website’s technical foundation. No provider can honestly guarantee a specific Google position, number of leads, or revenue result.
          </p>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#06172d] px-6 py-24 text-white md:py-32">
        <div className="hero-grid-dark absolute inset-0" />
        <div className="relative mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Ownership & transition"
            title="Your business assets stay yours. The website platform is licensed and managed."
            text="The project fee covers strategy, design, development, configuration, testing, and launch. It does not automatically transfer AtlasBlake’s reusable code or complete website package."
            inverse
          />
          <div className="mt-14 grid gap-6 lg:grid-cols-2">
            <OwnershipCard
              title="The client owns"
              items={[
                "The domain name and registrar account",
                "Logos, trademarks, and client-provided content",
                "Customer data and available form submissions",
                "Google Business Profile, analytics, and business-owned accounts",
              ]}
            />
            <OwnershipCard
              title="AtlasBlake retains"
              items={[
                "Reusable code, design systems, methods, and internal tools",
                "Hosting infrastructure and maintenance systems",
                "Nontransferable third-party licenses",
                "The website platform, with a hosted-use license granted to the client",
              ]}
              dark
            />
          </div>
          <div className="mt-7 rounded-[26px] border border-blue-400/50 bg-white/[.06] p-7 md:p-9">
            <p className="text-xs font-black uppercase tracking-[.18em] text-blue-300">Website Migration & Handoff Package</p>
            <div className="mt-5 grid gap-5 md:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/[.05] p-6">
                <p className="text-sm font-bold text-slate-300">First 12 months after launch</p>
                <p className="mt-2 text-4xl font-black">$2,500</p>
                <p className="mt-4 text-sm leading-6 text-slate-300">Transferable site export, available database and media, credential handoff, and up to two hours of coordination.</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[.05] p-6">
                <p className="text-sm font-bold text-slate-300">After 12 consecutive months of care</p>
                <p className="mt-2 text-4xl font-black">$750</p>
                <p className="mt-4 text-sm leading-6 text-slate-300">The same handoff scope. Third-party subscriptions, internal tools, and nontransferable licenses remain excluded.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#f6f9fd] px-6 py-24">
        <div className="mx-auto max-w-5xl">
          <SectionHeading eyebrow="Pricing questions" title="Know what you are agreeing to before work begins." />
          <div className="mt-12 space-y-4">
            {pricingFaqs.map(([question, answer]) => (
              <details key={question} className="group rounded-2xl border border-[#dce7f2] bg-white p-6">
                <summary className="cursor-pointer list-none pr-8 text-lg font-black text-[#173957]">
                  {question}<span className="float-right text-[#2563eb] transition group-open:rotate-45">+</span>
                </summary>
                <p className="mt-4 max-w-4xl leading-7 text-[#607991]">{answer}</p>
              </details>
            ))}
          </div>
          <p className="mt-8 text-center text-sm leading-6 text-[#6b8299]">
            This page is a public summary. The signed Website Growth Partnership Proposal, Website Design, Hosting & Care Service Agreement, and any approved addendum or change order control the final project.
          </p>
        </div>
      </section>

      <MarketingCta />
      <Footer />
    </main>
  );
}

function PackageCard({ pkg }: { pkg: (typeof websitePackages)[number] }) {
  return (
    <article className={`relative overflow-hidden rounded-[28px] border ${pkg.featured ? "border-[#2563eb] shadow-[0_28px_80px_rgba(7,26,51,.18)]" : "border-[#dce7f2]"}`}>
      <div className={`px-7 py-5 ${pkg.featured ? "bg-[#1466f2] text-white" : "bg-[#0b264b] text-white"}`}>
        <p className="text-[11px] font-black uppercase tracking-[.17em] text-blue-100">{pkg.option}</p>
        <h2 className="mt-2 text-2xl font-black">{pkg.name}</h2>
      </div>
      <div className="bg-white p-7">
        <div className="text-4xl font-black text-[#071a33]">{pkg.setup}</div>
        <p className="mt-2 font-extrabold text-[#1d5fd0]">{pkg.careName} · {pkg.monthly}</p>
        <p className="mt-5 min-h-14 leading-7 text-[#607991]">{pkg.bestFor}</p>
        <div className="mt-6 space-y-4 border-t border-[#dce7f2] pt-6">
          {pkg.features.map((item) => (
            <div key={item} className="flex gap-3 text-sm font-bold leading-6 text-[#405c77]">
              <Icon name="check" className="mt-0.5 h-5 w-5 shrink-0 text-[#1466f2]" />{item}
            </div>
          ))}
        </div>
        <Link href="/start-a-project" className={`mt-8 w-full justify-center ${pkg.featured ? "button-primary" : "button-secondary"}`}>
          Discuss {pkg.name}<Icon name="arrow" className="h-4 w-4" />
        </Link>
      </div>
    </article>
  );
}

function CareCard({ plan }: { plan: (typeof carePlans)[number] }) {
  return (
    <article className={`overflow-hidden rounded-[28px] border ${plan.featured ? "border-[#2563eb] shadow-[0_24px_65px_rgba(23,62,103,.14)]" : "border-[#dce7f2]"}`}>
      <div className={`px-7 py-5 ${plan.featured ? "bg-[#1466f2]" : "bg-[#0b264b]"} text-white`}>
        <p className="text-[11px] font-black uppercase tracking-[.17em] text-blue-100">{plan.name}</p>
        <h3 className="mt-2 text-2xl font-black">{plan.label}</h3>
      </div>
      <div className="bg-white p-7">
        <p className="text-4xl font-black text-[#071a33]">{plan.monthly.replace("/month", "")}</p>
        <p className="mt-1 text-sm font-bold text-[#7890a7]">per month</p>
        <div className="mt-6 space-y-4 border-t border-[#dce7f2] pt-6">
          {plan.features.map((item) => (
            <div key={item} className="flex gap-3 text-sm font-bold leading-6 text-[#405c77]">
              <Icon name="check" className="mt-0.5 h-5 w-5 shrink-0 text-[#1466f2]" />{item}
            </div>
          ))}
        </div>
      </div>
    </article>
  );
}

function InfoBox({ title, text, dark = false }: { title: string; text: string; dark?: boolean }) {
  return (
    <div className={`rounded-[24px] border p-7 ${dark ? "border-[#173f72] bg-[#0b264b] text-white" : "border-[#dce7f2] bg-[#f3f7fd]"}`}>
      <h3 className="text-2xl font-black">{title}</h3>
      <p className={`mt-4 leading-7 ${dark ? "text-slate-300" : "text-[#607991]"}`}>{text}</p>
    </div>
  );
}

function OwnershipCard({ title, items, dark = false }: { title: string; items: string[]; dark?: boolean }) {
  return (
    <div className={`rounded-[26px] border p-7 md:p-9 ${dark ? "border-white/10 bg-white/[.05]" : "border-white/20 bg-white text-[#071a33]"}`}>
      <h3 className="text-3xl font-black">{title}</h3>
      <div className="mt-6 space-y-4">
        {items.map((item) => (
          <div key={item} className={`flex gap-3 font-bold leading-6 ${dark ? "text-slate-200" : "text-[#405c77]"}`}>
            <Icon name="check" className="mt-0.5 h-5 w-5 shrink-0 text-[#3f89ff]" />{item}
          </div>
        ))}
      </div>
    </div>
  );
}
