import type { Metadata } from "next";
import Link from "next/link";
import Footer from "../components/Footer";
import { Icon } from "../components/Icons";
import MarketingCta from "../components/MarketingCta";
import Navbar from "../components/Navbar";
import PageHero from "../components/PageHero";

export const metadata: Metadata = {
  title: "Website & Technology Services",
  description:
    "Professional website design, local growth support, managed website care, and custom business technology from AtlasBlake Technologies.",
  alternates: { canonical: "/services" },
};

const coreServices = [
  {
    icon: "browser" as const,
    title: "Websites",
    text: "Custom, mobile-first websites built around the business, its customers, and the actions that matter most.",
    href: "/services/website-design",
    points: ["Custom design", "Service and city pages", "Lead capture", "Technical SEO foundation"],
  },
  {
    icon: "chart" as const,
    title: "Local Growth",
    text: "Search-friendly content, analytics, reviews, and local structure designed to make the business easier to discover and trust.",
    href: "/services/local-seo-growth",
    points: ["Local content", "Search Console", "Analytics", "Review and trust support"],
  },
  {
    icon: "shield" as const,
    title: "Website Care",
    text: "Managed hosting, backups, updates, monitoring, minor changes, and dependable help after launch.",
    href: "/services/website-care",
    points: ["Hosting and SSL", "Backups", "Routine updates", "Ongoing support"],
  },
  {
    icon: "code" as const,
    title: "Custom Technology",
    text: "Portals, dashboards, automation, integrations, and software built around a company-specific workflow.",
    href: "/services/custom-technology",
    points: ["Portals", "Automation", "Integrations", "Custom systems"],
  },
];

export default function ServicesPage() {
  return (
    <main>
      <Navbar />
      <PageHero
        eyebrow="Services"
        title="Start with what helps the business most."
        text="Most AtlasBlake relationships begin with a professional website. Growth support, ongoing care, automation, and custom systems can be added when they create real value."
        primaryLabel="Start a Project"
        primaryHref="/start-a-project"
        secondaryLabel="See Our Work"
        secondaryHref="/work"
      />

      <section className="bg-white px-5 py-16 sm:px-6 md:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-5 md:grid-cols-2">
            {coreServices.map((service) => (
              <Link key={service.title} href={service.href} className="marketing-card group p-6 md:p-8">
                <div className="flex items-start justify-between gap-6">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[#EFF6FF] text-[#2563EB]">
                    <Icon name={service.icon} className="h-5 w-5" />
                  </span>
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-[#CBD5E1] text-[#2563EB] transition group-hover:border-[#2563EB] group-hover:bg-[#2563EB] group-hover:text-white">
                    <Icon name="arrow" className="h-4 w-4" />
                  </span>
                </div>
                <h2 className="mt-6 text-2xl font-black tracking-[-.03em] text-[#1F2937]">{service.title}</h2>
                <p className="mt-3 max-w-xl leading-7 text-[#64748B]">{service.text}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {service.points.map((point) => (
                    <span key={point} className="rounded-full bg-[#F8FAFC] px-3 py-1.5 text-xs font-extrabold text-[#475569] ring-1 ring-[#E5E7EB]">
                      {point}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-[#E5E7EB] bg-[#F8FAFC] px-5 py-16 sm:px-6 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[.8fr_1.2fr] lg:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[.2em] text-[#2563EB] sm:text-sm">A practical path</p>
            <h2 className="mt-4 text-balance text-3xl font-black tracking-[-.04em] text-[#0A0F1E] sm:text-4xl md:text-5xl">
              The website can be the beginning, not the limit.
            </h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              "Professional public website",
              "Local search and analytics",
              "Ongoing website management",
              "Customer or employee portals",
              "Workflow automation",
              "Custom business systems",
            ].map((item) => (
              <div key={item} className="flex items-center gap-3 rounded-xl border border-[#E5E7EB] bg-white px-4 py-3.5 text-sm font-extrabold text-[#1F2937]">
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
