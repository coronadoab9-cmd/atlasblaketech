import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Footer from "../components/Footer";
import { Icon } from "../components/Icons";
import MarketingCta from "../components/MarketingCta";
import Navbar from "../components/Navbar";
import PageHero from "../components/PageHero";

export const metadata: Metadata = {
  title: "Our Work | Website Portfolio",
  description:
    "Explore website projects built by AtlasBlake Technologies for NexDrain Plumbing and Hoover's Rooters.",
  alternates: { canonical: "/work" },
};

const projects = [
  {
    name: "NexDrain Plumbing",
    location: "DFW plumbing website",
    description:
      "A professional service-business website built to strengthen trust, explain services clearly, show real project experience, and support local growth.",
    image: "/portfolio/nexdrain/trucks.jpg",
    logo: "/portfolio/nexdrain/logo.png",
    href: "/work/nexdrain-plumbing",
    live: "https://nexdrainplumbing.net",
    tags: ["Custom website", "Local SEO", "Service pages", "Analytics"],
    dark: false,
  },
  {
    name: "Hoover's Rooters",
    location: "Crowley + DFW plumbing website",
    description:
      "A bold, high-contrast website built around the company's real brand, service area, request-service workflow, and direct mobile customer paths.",
    image: "/portfolio/hoovers-rooters/homepage.png",
    href: "/work/hoovers-rooters",
    live: "https://hooversrooters.com",
    tags: ["Custom website", "10 city pages", "Request service", "Managed care"],
    dark: true,
  },
];

export default function WorkPage() {
  return (
    <main>
      <Navbar />
      <PageHero
        eyebrow="Our work"
        title="Real websites for real businesses."
        text="The two companies may work in the same industry, but their brands, customers, service areas, and priorities are different. Their websites should feel different too."
        primaryLabel="Start Your Project"
        primaryHref="/start-a-project"
        secondaryLabel="Our Approach"
        secondaryHref="/approach"
      />

      <section className="bg-white px-5 py-16 sm:px-6 md:py-20">
        <div className="mx-auto max-w-7xl space-y-6">
          {projects.map((project, index) => (
            <article
              key={project.name}
              className={`grid overflow-hidden rounded-[24px] border ${project.dark ? "border-white/10 bg-[#080808] text-white" : "border-[#e1e9f1] bg-[#f8fafc] text-[#0b1f33]"} lg:grid-cols-2`}
            >
              <div className={`relative min-h-[310px] sm:min-h-[390px] ${index % 2 === 1 ? "lg:order-2" : ""}`}>
                <Image
                  src={project.image}
                  alt={`${project.name} website project`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 640px"
                  className={`object-cover ${project.dark ? "object-top" : ""}`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
                {project.logo ? (
                  <Image
                    src={project.logo}
                    alt=""
                    width={230}
                    height={70}
                    className="absolute bottom-6 left-6 h-auto w-[180px] sm:w-[210px]"
                  />
                ) : null}
              </div>

              <div className="flex flex-col justify-center p-6 sm:p-8 md:p-10 lg:p-12">
                <p className={`text-xs font-black uppercase tracking-[.18em] ${project.dark ? "text-slate-400" : "text-[#176bff]"}`}>
                  {project.location}
                </p>
                <h2 className="mt-4 text-3xl font-black tracking-[-.04em] sm:text-4xl md:text-5xl">{project.name}</h2>
                <p className={`mt-5 text-lg leading-8 ${project.dark ? "text-slate-300" : "text-[#667b90]"}`}>
                  {project.description}
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span key={tag} className={`rounded-full px-3 py-1.5 text-xs font-extrabold ${project.dark ? "bg-white/8 text-slate-200" : "bg-white text-[#526b83] ring-1 ring-[#e1e9f1]"}`}>
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Link href={project.href} className="button-primary">
                    View Case Study
                    <Icon name="arrow" className="h-4 w-4" />
                  </Link>
                  <a href={project.live} target="_blank" rel="noreferrer" className={project.dark ? "button-dark-outline" : "button-secondary"}>
                    Visit Live Website
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-[#e1e9f1] bg-[#f7f9fc] px-5 py-16 sm:px-6 md:py-20">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-3xl">
            <p className="text-xs font-black uppercase tracking-[.2em] text-[#176bff] sm:text-sm">Beyond the public website</p>
            <h2 className="mt-4 text-balance text-3xl font-black tracking-[-.04em] sm:text-4xl md:text-5xl">
              AtlasBlake can also build the systems behind the business.
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-[#667b90]">
              Portals, dashboards, automation, integrations, and custom workflows are available when a business needs more than its customer-facing site.
            </p>
          </div>
          <Link href="/services/custom-technology" className="button-secondary shrink-0">
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
