import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Footer from "./components/Footer";
import { Icon } from "./components/Icons";
import MarketingCta from "./components/MarketingCta";
import Navbar from "./components/Navbar";
import SectionHeading from "./components/SectionHeading";
import WebsiteShowcase from "./components/WebsiteShowcase";
import { processSteps, services, websitePackages } from "./lib/marketing";

export const metadata: Metadata = {
  title: "Professional Websites, Local SEO & Business Technology",
  description:
    "AtlasBlake Technologies helps businesses bring their ideas to life through professional websites, local SEO foundations, website care, automation, and custom technology.",
  alternates: { canonical: "/" },
};

const trustItems = [
  "AtlasBlake Technologies LLC",
  "Dallas–Fort Worth based",
  "Custom design and development",
  "Clear project scope",
  "Client-controlled domain and business accounts",
  "Continued support after launch",
];

export default function HomePage() {
  return (
    <main className="overflow-hidden bg-white text-[#071a33]">
      <Navbar />

      <section className="relative overflow-hidden border-b border-[#dce7f2] bg-[linear-gradient(180deg,#ffffff_0%,#f4f8fd_100%)] px-6 pb-20 pt-16 md:pb-28 md:pt-24">
        <div className="hero-grid absolute inset-0" />
        <div className="absolute -left-32 top-24 h-[420px] w-[420px] rounded-full bg-blue-100/70 blur-[110px]" />
        <div className="absolute -right-36 top-0 h-[520px] w-[520px] rounded-full bg-cyan-100/60 blur-[120px]" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[.95fr_1.05fr]">
          <div>
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#cfe0f3] bg-white/85 px-4 py-2 text-xs font-black uppercase tracking-[0.17em] text-[#1d5fd0] shadow-sm backdrop-blur">
              Professional websites • Practical technology
            </div>
            <h1 className="max-w-4xl text-balance text-5xl font-black leading-[.98] tracking-[-0.06em] text-[#06172d] md:text-7xl lg:text-[78px]">
              Bring your business vision to life.
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-8 text-[#526f8e] md:text-xl md:leading-9">
              AtlasBlake Technologies designs professional websites and practical business technology that help companies look established, earn customer trust, and grow with confidence.
            </p>
            <p className="mt-5 text-base font-extrabold text-[#183b65]">Clear planning. Thoughtful design. Fair, transparent pricing.</p>
            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <Link href="/start-a-project" className="button-primary">
                Start Your Project<Icon name="arrow" className="h-5 w-5" />
              </Link>
              <Link href="/work/nexdrain-plumbing" className="button-secondary">
                See the NexDrain Project<Icon name="arrow" className="h-5 w-5" />
              </Link>
            </div>
            <div className="mt-9 flex flex-wrap gap-x-7 gap-y-3 text-sm font-bold text-[#617b95]">
              {["Websites", "Local SEO", "Website Care", "Custom Technology"].map((item) => (
                <span key={item} className="flex items-center gap-2"><Icon name="check" className="h-4 w-4 text-[#2563eb]" />{item}</span>
              ))}
            </div>
          </div>

          <WebsiteShowcase />
        </div>
      </section>

      <section className="border-b border-[#e2ebf4] bg-white px-6 py-7">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-8 gap-y-3 text-center text-sm font-extrabold text-[#48647e]">
          {trustItems.map((item, index) => <span key={item} className="flex items-center gap-3"><span className="text-[#2563eb]">{index === 0 ? "◆" : "•"}</span>{item}</span>)}
        </div>
      </section>

      <section className="bg-white px-6 py-24 md:py-32">
        <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[.9fr_1.1fr] lg:items-start">
          <SectionHeading
            eyebrow="Built around your business"
            title="Your company deserves more than a generic website."
            text="A website should reflect the quality of the business, explain what makes it different, and make it easy for customers to take the next step."
          />
          <div className="rounded-[30px] border border-[#dce7f2] bg-[#f7fafd] p-7 shadow-[0_20px_60px_rgba(23,62,103,.08)] md:p-10">
            <p className="text-lg leading-8 text-[#58728c]">AtlasBlake works directly with business owners to turn their goals, ideas, and experience into a professional digital presence. We take time to understand the company before recommending pages, features, or technology.</p>
            <p className="mt-6 text-lg font-extrabold leading-8 text-[#173957]">You will know what is being built, why it matters, what it costs, and what happens after launch.</p>
          </div>
        </div>
      </section>

      <section className="border-y border-[#dce7f2] bg-[#f6f9fd] px-6 py-24 md:py-32">
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow="What we do" title="Everything needed for a stronger digital presence." text="Start with a professional website. Add better growth tools, support, automation, or custom systems when the business is ready." />
          <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
              <Link key={service.slug} href={`/services/${service.slug}`} className={`marketing-card group p-7 md:p-8 ${index === 0 ? "lg:col-span-2 lg:grid lg:grid-cols-[auto_1fr] lg:gap-8" : ""}`}>
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-[#eaf3ff] text-[#2563eb] transition group-hover:bg-[#2563eb] group-hover:text-white"><Icon name={service.icon} className="h-6 w-6" /></span>
                <div className={index === 0 ? "lg:-mt-1" : ""}>
                  <p className="mt-7 text-xs font-black uppercase tracking-[.18em] text-[#2563eb] lg:mt-0">{service.eyebrow}</p>
                  <h3 className="mt-3 text-2xl font-black tracking-[-.025em] text-[#071a33]">{service.title}</h3>
                  <p className="mt-4 leading-7 text-[#5c7690]">{service.summary}</p>
                  <span className="mt-7 inline-flex items-center gap-2 text-sm font-black text-[#1d5fd0]">Explore service<Icon name="arrow" className="h-4 w-4 transition group-hover:translate-x-1" /></span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#06172d] px-6 py-24 text-white md:py-32">
        <div className="hero-grid-dark absolute inset-0" />
        <div className="absolute -right-32 top-0 h-[560px] w-[560px] rounded-full bg-blue-500/20 blur-[120px]" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-[.88fr_1.12fr]">
          <div>
            <p className="text-sm font-black uppercase tracking-[.24em] text-blue-300">Featured website</p>
            <h2 className="mt-5 text-balance text-4xl font-black leading-[1.05] tracking-[-.045em] md:text-6xl">A professional digital home for NexDrain Plumbing.</h2>
            <p className="mt-7 text-lg leading-8 text-slate-300">NexDrain needed a website that matched the professionalism of its work and made it easier for DFW homeowners to understand services, see real project experience, and request help.</p>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {["Complete website redesign", "Mobile-first customer experience", "Service and location pages", "Project and review proof", "Analytics and Search Console", "Continued website management"].map((capability) => <div key={capability} className="flex items-center gap-3 text-sm font-bold text-slate-200"><span className="grid h-7 w-7 place-items-center rounded-lg bg-white/10 text-blue-300"><Icon name="check" className="h-4 w-4" /></span>{capability}</div>)}
            </div>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link href="/work/nexdrain-plumbing" className="button-primary">View Case Study<Icon name="arrow" className="h-5 w-5" /></Link>
              <a href="https://nexdrainplumbing.net" target="_blank" rel="noreferrer" className="button-dark-outline">Visit Live Website</a>
            </div>
          </div>
          <div className="overflow-hidden rounded-[30px] border border-white/10 bg-white/[.05] p-3 shadow-[0_30px_90px_rgba(0,0,0,.3)]">
            <div className="relative aspect-[16/10] overflow-hidden rounded-[22px]">
              <Image src="/portfolio/nexdrain/trucks.jpg" alt="NexDrain Plumbing website project" fill sizes="(max-width: 1024px) 100vw, 620px" className="object-cover" />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_45%,rgba(4,18,35,.9))]" />
              <div className="absolute inset-x-0 bottom-0 p-6 md:p-8"><Image src="/portfolio/nexdrain/logo.png" alt="NexDrain Plumbing" width={240} height={61} className="h-auto w-[190px] md:w-[240px]" /><p className="mt-3 max-w-lg text-sm leading-6 text-slate-200">A complete service-business website built for trust, clarity, local visibility, and customer action.</p></div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-24 md:py-32">
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow="Our process" title="Your idea. A clear plan. A professional result." text="A typical website project is estimated at 5–7 weeks from kickoff, with clear review points at every major stage." />
          <div className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-5">
            {processSteps.map((step) => <div key={step.number} className="rounded-2xl border border-[#dce7f2] bg-[#fbfdff] p-6"><p className="text-xs font-black tracking-[.2em] text-[#2563eb]">{step.number}</p><h3 className="mt-5 text-xl font-black">{step.title}</h3><p className="mt-4 text-sm leading-6 text-[#607991]">{step.text}</p></div>)}
          </div>
        </div>
      </section>

      <section className="border-y border-[#dce7f2] bg-[#f6f9fd] px-6 py-24 md:py-32">
        <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
          <SectionHeading eyebrow="Why AtlasBlake" title="Technology should support your dream—not complicate it." text="Professional results should not require confusing language, unnecessary features, or surprise costs." />
          <div className="grid gap-5 sm:grid-cols-2">
            {[
              ["users", "Direct communication", "Work with someone who listens to the goals and understands the decisions behind the project."],
              ["layers", "Built around the business", "The company’s identity, customers, services, and future plans guide the design."],
              ["shield", "Fair, explained pricing", "Recommendations are based on what the business actually needs, with scope explained first."],
              ["chart", "Room to grow", "Start with a professional website and add portals, automation, or software when the company is ready."],
            ].map(([icon, title, text]) => <div key={title} className="rounded-2xl border border-[#dce7f2] bg-white p-6 shadow-[0_12px_35px_rgba(23,62,103,.06)]"><span className="grid h-11 w-11 place-items-center rounded-xl bg-[#eaf3ff] text-[#2563eb]"><Icon name={icon as "layers"} className="h-5 w-5" /></span><h3 className="mt-5 text-xl font-black">{title}</h3><p className="mt-3 leading-7 text-[#607991]">{text}</p></div>)}
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-24 md:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-7 md:flex-row md:items-end md:justify-between">
            <SectionHeading eyebrow="Website pricing" title="Clear options for different stages of growth." text="Every package includes a defined scope, professional design, mobile usability, launch support, and ongoing care." />
            <Link href="/pricing" className="button-secondary shrink-0">Compare All Packages<Icon name="arrow" className="h-5 w-5" /></Link>
          </div>
          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {websitePackages.map((pkg) => <article key={pkg.name} className={`relative rounded-[26px] border p-7 ${pkg.featured ? "border-[#2563eb] bg-[#071a33] text-white shadow-[0_24px_70px_rgba(7,26,51,.2)]" : "border-[#dce7f2] bg-[#f9fbfd]"}`}>{pkg.featured ? <span className="absolute right-5 top-5 rounded-full bg-[#2563eb] px-3 py-1.5 text-[10px] font-black uppercase tracking-wider text-white">Recommended</span> : null}<p className={`text-xs font-black uppercase tracking-[.18em] ${pkg.featured ? "text-blue-300" : "text-[#2563eb]"}`}>{pkg.pages}</p><h3 className="mt-4 text-3xl font-black">{pkg.name}</h3><p className={`mt-3 min-h-12 text-sm leading-6 ${pkg.featured ? "text-slate-300" : "text-[#607991]"}`}>{pkg.bestFor}</p><div className="mt-7 flex items-end gap-2"><span className="text-3xl font-black">{pkg.setup}</span><span className={`pb-1 text-sm ${pkg.featured ? "text-slate-400" : "text-[#7890a7]"}`}>setup</span></div><p className={`mt-2 text-sm font-extrabold ${pkg.featured ? "text-blue-300" : "text-[#1d5fd0]"}`}>+ {pkg.monthly} ongoing care</p><Link href="/pricing" className={`mt-7 w-full justify-center ${pkg.featured ? "button-primary" : "button-secondary"}`}>View Details<Icon name="arrow" className="h-4 w-4" /></Link></article>)}
          </div>
          <p className="mt-7 text-center text-sm font-bold text-[#607991]">No surprise overages. Changes outside the agreed scope are explained and approved before additional work begins.</p>
        </div>
      </section>

      <section className="border-t border-[#dce7f2] bg-[#f6f9fd] px-6 py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.05fr_.95fr]">
          <div><p className="text-sm font-black uppercase tracking-[.22em] text-[#2563eb]">Beyond the website</p><h2 className="mt-5 text-balance text-4xl font-black tracking-[-.04em] md:text-6xl">Need something built around your workflow?</h2><p className="mt-6 max-w-2xl text-lg leading-8 text-[#607991]">AtlasBlake can create customer portals, automated documents, dashboards, mobile workflows, integrations, and custom software in practical stages.</p><Link href="/services/custom-technology" className="button-primary mt-9">Discuss a Custom Solution<Icon name="arrow" className="h-5 w-5" /></Link></div>
          <div className="grid gap-4 sm:grid-cols-2">{["Customer and employee portals", "Business dashboards", "Mobile and tablet tools", "Automated forms and documents", "System integrations", "Custom business software"].map((item)=><div key={item} className="flex items-center gap-3 rounded-xl border border-[#dce7f2] bg-white px-5 py-4 font-extrabold text-[#29455f]"><Icon name="check" className="h-5 w-5 text-[#2563eb]" />{item}</div>)}</div>
        </div>
      </section>

      <MarketingCta />
      <Footer />
    </main>
  );
}
