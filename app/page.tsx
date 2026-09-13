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
    <main className="overflow-hidden bg-white text-[#0b1f33]">
      <Navbar />

      <section className="relative border-b border-[#e1e9f1] bg-white px-5 py-16 sm:px-6 md:py-24 lg:py-28">
        <div className="hero-grid absolute inset-0 opacity-70" />
        <div className="absolute -right-36 -top-20 h-[420px] w-[420px] rounded-full bg-blue-100/70 blur-[120px]" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[.9fr_1.1fr] lg:gap-16">
          <div>
            <p className="text-xs font-black uppercase tracking-[.2em] text-[#176bff] sm:text-sm">
              Websites first. Technology when you need more.
            </p>
            <h1 className="mt-5 max-w-3xl text-balance text-[44px] font-black leading-[.98] tracking-[-.055em] text-[#07182c] sm:text-6xl md:text-7xl lg:text-[76px]">
              Professional websites built around your business.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[#60758a] md:text-xl md:leading-9">
              AtlasBlake helps businesses look more professional, earn customer trust, and build a stronger digital foundation without unnecessary complexity.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/start-a-project" className="button-primary">
                Start a Project
                <Icon name="arrow" className="h-4 w-4" />
              </Link>
              <Link href="/work" className="button-secondary">
                View Our Work
              </Link>
            </div>
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm font-bold text-[#667b90]">
              <span>Dallas-Fort Worth</span>
              <span className="text-[#b1bfcc]">•</span>
              <span>Custom design</span>
              <span className="text-[#b1bfcc]">•</span>
              <span>Managed after launch</span>
            </div>
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
      </section>

      <section className="bg-[#f7f9fc] px-5 py-16 sm:px-6 md:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[.72fr_1.28fr] lg:items-end">
            <div>
              <p className="text-xs font-black uppercase tracking-[.2em] text-[#176bff] sm:text-sm">What we do</p>
              <h2 className="mt-4 text-balance text-3xl font-black tracking-[-.04em] text-[#07182c] sm:text-4xl md:text-5xl">
                A stronger digital presence, without the clutter.
              </h2>
            </div>
            <p className="max-w-2xl text-lg leading-8 text-[#667b90] lg:justify-self-end">
              Start with the public-facing website. Add search support, ongoing care, automation, or custom systems only when they make sense for the business.
            </p>
          </div>

          <div className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-[#e1e9f1] bg-[#e1e9f1] md:grid-cols-2 lg:grid-cols-4">
            {services.map((service) => (
              <Link key={service.title} href={service.href} className="group bg-white p-6 transition hover:bg-[#fbfdff] md:p-7">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#edf4ff] text-[#176bff]">
                  <Icon name={service.icon} className="h-5 w-5" />
                </span>
                <h3 className="mt-5 text-xl font-black tracking-[-.02em]">{service.title}</h3>
                <p className="mt-3 text-sm leading-6 text-[#667b90]">{service.text}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-black text-[#176bff]">
                  Learn more
                  <Icon name="arrow" className="h-4 w-4 transition group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-16 sm:px-6 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[.8fr_1.2fr] lg:items-center">
          <div>
            <p className="text-xs font-black uppercase tracking-[.2em] text-[#176bff] sm:text-sm">Why AtlasBlake</p>
            <h2 className="mt-4 text-balance text-3xl font-black tracking-[-.04em] text-[#07182c] sm:text-4xl md:text-5xl">
              A technology partner that starts with the business.
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-8 text-[#667b90]">
              The goal is not to make every project bigger. It is to identify what will genuinely help, build it well, and leave room to grow.
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
              <article key={number} className="border-t-2 border-[#176bff] pt-5">
                <p className="text-xs font-black tracking-[.18em] text-[#176bff]">{number}</p>
                <h3 className="mt-4 text-xl font-black">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-[#667b90]">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-[#07182c] px-5 py-16 text-white sm:px-6 md:py-20">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-3xl">
            <p className="text-xs font-black uppercase tracking-[.2em] text-blue-300 sm:text-sm">More than websites</p>
            <h2 className="mt-4 text-balance text-3xl font-black tracking-[-.04em] sm:text-4xl md:text-5xl">
              When the business needs more, AtlasBlake can build beyond the website.
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
              Customer portals, dashboards, automation, integrations, mobile workflows, and custom software can be added under a clear, separate scope.
            </p>
          </div>
          <Link href="/services/custom-technology" className="button-dark-outline shrink-0">
            Explore Custom Technology
            <Icon name="arrow" className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <MarketingCta
        eyebrow="Ready when you are"
        title="Let’s build what your business actually needs."
        text="Start with the goal, the problem, or the idea. AtlasBlake will help turn it into a clear plan and a professional result."
      />
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
    <Link href={href} className="project-frame group block overflow-hidden">
      <div className={`relative aspect-[4/3] ${dark ? "bg-black" : "bg-[#eef3f8]"}`}>
        <Image src={image} alt={alt} fill sizes="(max-width: 640px) 100vw, 480px" className={`object-cover transition duration-500 group-hover:scale-[1.025] ${dark ? "object-top" : ""}`} />
        <div className="absolute inset-0 bg-gradient-to-t from-[#07182c]/85 via-transparent to-transparent" />
        {logo ? (
          <div className="absolute inset-x-0 bottom-0 p-5">
            <Image src={logo} alt="" width={190} height={60} className="h-auto w-[150px]" />
          </div>
        ) : null}
      </div>
      <div className="flex items-center justify-between gap-4 p-5">
        <div>
          <p className="font-black text-[#0b1f33]">{label}</p>
          <p className="mt-1 text-xs font-bold text-[#75889a]">{detail}</p>
        </div>
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-[#d7e2ec] text-[#176bff] transition group-hover:border-[#176bff] group-hover:bg-[#176bff] group-hover:text-white">
          <Icon name="arrow" className="h-4 w-4" />
        </span>
      </div>
    </Link>
  );
}
