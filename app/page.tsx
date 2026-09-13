import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Footer from "./components/Footer";
import { Icon } from "./components/Icons";
import MarketingCta from "./components/MarketingCta";
import Navbar from "./components/Navbar";

export const metadata: Metadata = {
  title: "Professional Websites & Business Technology",
  description:
    "AtlasBlake Technologies builds professional websites and practical business technology for companies that want to look established, work smarter, and keep growing.",
  alternates: { canonical: "/" },
};

const services = [
  {
    icon: "browser" as const,
    title: "Websites",
    text: "Custom, mobile-first websites built around the business, its customers, and the next action that matters.",
    href: "/services/website-design",
  },
  {
    icon: "chart" as const,
    title: "Local Growth",
    text: "Search-friendly service and location content, analytics, reviews, and a foundation for steady local visibility.",
    href: "/services/local-seo-growth",
  },
  {
    icon: "shield" as const,
    title: "Website Care",
    text: "Managed hosting, updates, monitoring, backups, minor changes, and dependable support after launch.",
    href: "/services/website-care",
  },
  {
    icon: "code" as const,
    title: "Custom Technology",
    text: "Portals, automation, integrations, dashboards, and software when the business needs more than a public website.",
    href: "/services/custom-technology",
  },
];

export default function HomePage() {
  return (
    <main className="overflow-x-clip bg-white text-[#1F2937]">
      <Navbar />

      <section className="relative overflow-hidden border-b border-white/10 bg-[#0A0F1E] px-5 py-14 text-white sm:px-6 md:py-20 lg:py-24">
        <div className="hero-grid-dark absolute inset-0 opacity-70" />
        <div className="absolute -left-40 top-8 h-[420px] w-[420px] rounded-full bg-[#2563EB]/16 blur-[130px]" />
        <div className="absolute -right-24 -top-20 h-[360px] w-[360px] rounded-full bg-[#06B6EF]/10 blur-[120px]" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[.88fr_1.12fr] lg:gap-16">
          <div>
            <p className="text-xs font-bold uppercase tracking-[.22em] text-[#06B6EF] sm:text-sm">
              Build Smarter. Go Further.
            </p>
            <h1 className="mt-5 max-w-3xl text-balance text-[44px] font-black leading-[.98] tracking-[-.055em] text-white sm:text-6xl md:text-7xl lg:text-[74px]">
              Professional websites built around your business.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[#CBD5E1] md:text-xl md:leading-9">
              AtlasBlake helps businesses look more professional, earn customer trust, and build a stronger digital foundation without unnecessary complexity.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/start-a-project" className="button-primary">
                Start a Project
                <Icon name="arrow" className="h-4 w-4" />
              </Link>
              <Link href="/work" className="button-dark-outline">
                View Our Work
              </Link>
            </div>
            <div className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-sm font-medium text-[#94A3B8]">
              <span>Dallas-Fort Worth</span>
              <span className="text-white/25">•</span>
              <span>Custom design</span>
              <span className="text-white/25">•</span>
              <span>Managed after launch</span>
            </div>
          </div>

          <div>
            <div className="mb-4 flex items-center justify-between gap-4">
              <p className="text-xs font-bold uppercase tracking-[.18em] text-[#94A3B8]">Selected work</p>
              <Link href="/work" className="text-sm font-bold text-[#06B6EF] transition hover:text-white">
                See all work
              </Link>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:gap-5">
              <ProjectPreview
                href="/work/nexdrain-plumbing"
                image="/portfolio/nexdrain/trucks.jpg"
                logo="/portfolio/nexdrain/logo.png"
                alt="NexDrain Plumbing website project"
                label="NexDrain Plumbing"
                detail="Website • Local SEO • Service pages"
              />
              <ProjectPreview
                href="/work/hoovers-rooters"
                image="/portfolio/hoovers-rooters/homepage.png"
                alt="Hoover's Rooters website project"
                label="Hoover's Rooters"
                detail="Website • Local pages • Managed care"
                dark
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#F8FAFC] px-5 py-14 sm:px-6 md:py-18">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[.72fr_1.28fr] lg:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[.2em] text-[#2563EB] sm:text-sm">What we do</p>
              <h2 className="mt-4 text-balance text-3xl font-black tracking-[-.04em] text-[#0A0F1E] sm:text-4xl md:text-5xl">
                A stronger digital presence, without the clutter.
              </h2>
            </div>
            <p className="max-w-2xl text-lg leading-8 text-[#64748B] lg:justify-self-end">
              Start with the public-facing website. Add search support, ongoing care, automation, or custom systems only when they make sense for the business.
            </p>
          </div>

          <div className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-[#E5E7EB] bg-[#E5E7EB] md:grid-cols-2 lg:grid-cols-4">
            {services.map((service) => (
              <Link key={service.title} href={service.href} className="group bg-white p-6 transition hover:bg-[#F8FAFC] md:p-7">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#EFF6FF] text-[#2563EB]">
                  <Icon name={service.icon} className="h-5 w-5" />
                </span>
                <h3 className="mt-5 text-xl font-black tracking-[-.02em] text-[#1F2937]">{service.title}</h3>
                <p className="mt-3 text-sm leading-6 text-[#64748B]">{service.text}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-black text-[#2563EB]">
                  Learn more
                  <Icon name="arrow" className="h-4 w-4 transition group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-14 sm:px-6 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[.8fr_1.2fr] lg:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[.2em] text-[#2563EB] sm:text-sm">Why AtlasBlake</p>
            <h2 className="mt-4 text-balance text-3xl font-black tracking-[-.04em] text-[#0A0F1E] sm:text-4xl md:text-5xl">
              Technology that moves businesses forward.
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-8 text-[#64748B]">
              Simple. Secure. Scalable. The goal is not to make every project bigger. It is to identify what will genuinely help, build it well, and leave room to grow.
            </p>
            <Link href="/approach" className="button-secondary mt-7">
              See How We Work
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {[
              ["01", "Listen first", "Understand the business, its customers, and the real goal before deciding what to build."],
              ["02", "Build what is useful", "Prioritize the pages, features, and tools that create the most value now."],
              ["03", "Stay after launch", "Keep the website dependable and help it evolve as the business grows."],
            ].map(([number, title, text]) => (
              <article key={number} className="border-t-2 border-[#2563EB] pt-5">
                <p className="text-xs font-black tracking-[.18em] text-[#2563EB]">{number}</p>
                <h3 className="mt-4 text-xl font-black text-[#1F2937]">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-[#64748B]">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-[#0A0F1E] px-5 py-14 text-white sm:px-6 md:py-18">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[.2em] text-[#06B6EF] sm:text-sm">Built for what&apos;s next</p>
            <h2 className="mt-4 text-balance text-3xl font-black tracking-[-.04em] sm:text-4xl md:text-5xl">
              When the business needs more, AtlasBlake can build beyond the website.
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-[#CBD5E1]">
              Customer portals, dashboards, automation, integrations, mobile workflows, and custom software can be added under a clear, separate scope.
            </p>
          </div>
          <Link href="/services/custom-technology" className="button-dark-outline shrink-0">
            Explore Custom Technology
            <Icon name="arrow" className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <MarketingCta />
      <Footer />
    </main>
  );
}

function ProjectPreview({
  href,
  image,
  logo,
  alt,
  label,
  detail,
  dark = false,
}: {
  href: string;
  image: string;
  logo?: string;
  alt: string;
  label: string;
  detail: string;
  dark?: boolean;
}) {
  return (
    <Link href={href} className="group block overflow-hidden rounded-[18px] border border-white/10 bg-white shadow-[0_22px_60px_rgba(0,0,0,.22)]">
      <div className={`relative aspect-[4/3] ${dark ? "bg-black" : "bg-[#F1F5F9]"}`}>
        <Image src={image} alt={alt} fill sizes="(max-width: 640px) 100vw, 480px" className={`object-cover transition duration-500 group-hover:scale-[1.025] ${dark ? "object-top" : ""}`} />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F1E]/85 via-transparent to-transparent" />
        {logo ? (
          <div className="absolute inset-x-0 bottom-0 p-5">
            <Image src={logo} alt="" width={190} height={60} className="h-auto w-[150px]" />
          </div>
        ) : null}
      </div>
      <div className="flex items-center justify-between gap-4 p-5">
        <div>
          <p className="font-black text-[#1F2937]">{label}</p>
          <p className="mt-1 text-xs font-bold text-[#64748B]">{detail}</p>
        </div>
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-[#CBD5E1] text-[#2563EB] transition group-hover:border-[#2563EB] group-hover:bg-[#2563EB] group-hover:text-white">
          <Icon name="arrow" className="h-4 w-4" />
        </span>
      </div>
    </Link>
  );
}
