import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Footer from "../components/Footer";
import { Icon } from "../components/Icons";
import MarketingCta from "../components/MarketingCta";
import Navbar from "../components/Navbar";
import PageHero from "../components/PageHero";
import SectionHeading from "../components/SectionHeading";
import WebsiteShowcase from "../components/WebsiteShowcase";

export const metadata: Metadata = {
  title: "Our Work | Website Portfolio",
  description:
    "Explore website projects built by AtlasBlake Technologies for NexDrain Plumbing and Hoover's Rooters, including branded design, local service content, mobile experiences, and customer conversion paths.",
  alternates: { canonical: "/work" },
};

const nexDrainFeatures = [
  "Custom brand experience",
  "Mobile-first design",
  "Service and city pages",
  "Project galleries",
  "Review integration",
  "Analytics and search setup",
];

const hooversFeatures = [
  "Custom black-and-white brand experience",
  "Mobile-first customer experience",
  "Request-service workflow",
  "10 local service-area pages",
  "Service and FAQ content",
  "Technical SEO foundation",
];

export default function WorkPage() {
  return (
    <main>
      <Navbar />

      <PageHero
        eyebrow="Our work"
        title="Professional websites built around real businesses."
        text="NexDrain Plumbing and Hoover's Rooters show how AtlasBlake adapts design, content, local structure, and customer pathways to the business instead of forcing every client into the same template."
        primaryLabel="View Hoover's Rooters Case Study"
        primaryHref="/work/hoovers-rooters"
        secondaryLabel="Start Your Project"
        secondaryHref="/start-a-project"
      />

      <section className="bg-white px-6 py-24 md:py-32">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Website portfolio"
            title="Different businesses. Different brands. Built around the same goal."
            text="Each project starts with the company, the customers it serves, and the action the website needs to make easier. The result should feel specific to that business - not like a reused industry template."
          />

          <div className="mt-14 space-y-8">
            <article className="grid items-center gap-12 rounded-[32px] border border-[#dce7f2] bg-[#f9fbfd] p-7 shadow-[0_22px_65px_rgba(23,62,103,.08)] md:p-10 lg:grid-cols-[.88fr_1.12fr]">
              <div>
                <p className="text-sm font-black uppercase tracking-[.22em] text-[#2563eb]">
                  DFW plumbing website
                </p>
                <h2 className="mt-5 text-4xl font-black tracking-[-.045em] md:text-5xl">
                  NexDrain Plumbing
                </h2>
                <p className="mt-6 text-lg leading-8 text-[#607991]">
                  A complete professional website designed to establish trust,
                  explain services clearly, show real project experience, and
                  give DFW homeowners fast ways to request help.
                </p>

                <div className="mt-8 grid gap-3 sm:grid-cols-2">
                  {nexDrainFeatures.map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-3 font-extrabold text-[#405c77]"
                    >
                      <Icon
                        name="check"
                        className="h-5 w-5 shrink-0 text-[#2563eb]"
                      />
                      {item}
                    </div>
                  ))}
                </div>

                <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href="/work/nexdrain-plumbing"
                    className="button-primary"
                  >
                    View Case Study
                    <Icon name="arrow" className="h-5 w-5" />
                  </Link>
                  <a
                    href="https://nexdrainplumbing.net"
                    target="_blank"
                    rel="noreferrer"
                    className="button-secondary"
                  >
                    Visit Live Website
                  </a>
                </div>
              </div>

              <WebsiteShowcase compact />
            </article>

            <article className="grid items-center gap-12 overflow-hidden rounded-[32px] border border-white/10 bg-[#070707] p-7 text-white shadow-[0_26px_80px_rgba(0,0,0,.18)] md:p-10 lg:grid-cols-[1.12fr_.88fr]">
              <HooversShowcase />

              <div>
                <p className="text-sm font-black uppercase tracking-[.22em] text-slate-400">
                  Crowley + DFW plumbing website
                </p>
                <h2 className="mt-5 text-4xl font-black tracking-[-.045em] md:text-5xl">
                  Hoover&apos;s Rooters
                </h2>
                <p className="mt-6 text-lg leading-8 text-slate-300">
                  A bold, high-contrast plumbing website built around the
                  company&apos;s real branding, service vehicle, local service
                  area, and direct paths to call or request service.
                </p>

                <div className="mt-8 grid gap-3 sm:grid-cols-2">
                  {hooversFeatures.map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-3 font-extrabold text-slate-200"
                    >
                      <Icon
                        name="check"
                        className="h-5 w-5 shrink-0 text-white"
                      />
                      {item}
                    </div>
                  ))}
                </div>

                <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href="/work/hoovers-rooters"
                    className="button-primary"
                  >
                    View Case Study
                    <Icon name="arrow" className="h-5 w-5" />
                  </Link>
                  <a
                    href="https://hooversrooters.com"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/20 px-5 font-black text-white transition hover:bg-white/10"
                  >
                    Visit Live Website
                  </a>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="border-y border-[#dce7f2] bg-[#06172d] px-6 py-24 text-white">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="What the portfolio shows"
            title="The website should fit the business behind it."
            text="The plumbing industry may be the same, but the companies are not. Branding, content, proof, customer paths, service areas, and growth priorities change from project to project."
            inverse
          />

          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {[
              [
                "Business-specific design",
                "NexDrain and Hoover's Rooters use different visual systems, messaging, and layouts built around their individual brands.",
              ],
              [
                "Local search structure",
                "Service and location content is organized around the areas and services each company actually wants to grow.",
              ],
              [
                "Clear customer action",
                "Calls, request-service forms, mobile navigation, FAQs, and trust content make the next step easy to understand.",
              ],
            ].map(([title, text]) => (
              <div
                key={title}
                className="rounded-2xl border border-white/10 bg-white/[.04] p-7"
              >
                <span className="grid h-11 w-11 place-items-center rounded-full border border-blue-400/30 bg-blue-500/10 text-sm font-black text-blue-300">
                  AB
                </span>
                <h3 className="mt-6 text-2xl font-black">{title}</h3>
                <p className="mt-4 leading-7 text-slate-300">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f6f9fd] px-6 py-24">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.08fr_.92fr] lg:items-center">
          <div className="grid gap-5 sm:grid-cols-2">
            <figure className="overflow-hidden rounded-[26px] border border-[#dce7f2] bg-white shadow-[0_18px_55px_rgba(23,62,103,.09)]">
              <div className="relative aspect-[16/10]">
                <Image
                  src="/portfolio/nexdrain/camera-inspection.jpg"
                  alt="NexDrain plumbing camera inspection project"
                  fill
                  sizes="(max-width: 640px) 100vw, 480px"
                  className="object-cover"
                />
              </div>
              <figcaption className="px-5 py-4 text-xs font-black uppercase tracking-[.14em] text-[#1d5fd0]">
                Real project proof
              </figcaption>
            </figure>

            <figure className="overflow-hidden rounded-[26px] border border-[#dce7f2] bg-white shadow-[0_18px_55px_rgba(23,62,103,.09)]">
              <div className="relative aspect-[16/10] bg-black">
                <Image
                  src="/portfolio/hoovers-rooters/homepage.png"
                  alt="Hoover's Rooters website homepage"
                  fill
                  sizes="(max-width: 640px) 100vw, 480px"
                  className="object-cover object-top"
                />
              </div>
              <figcaption className="px-5 py-4 text-xs font-black uppercase tracking-[.14em] text-[#1d5fd0]">
                Branded digital experience
              </figcaption>
            </figure>
          </div>

          <div>
            <SectionHeading
              eyebrow="Real client work"
              title="A growing portfolio with real businesses behind it."
              text="Each completed project gives future clients a clearer picture of how AtlasBlake listens, designs, builds, launches, and supports a professional website."
            />
            <Link href="/start-a-project" className="button-primary mt-9">
              Discuss Your Website
              <Icon name="arrow" className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      <MarketingCta />
      <Footer />
    </main>
  );
}

function HooversShowcase() {
  return (
    <div className="overflow-hidden rounded-[24px] border border-white/10 bg-[#111] shadow-[0_24px_70px_rgba(0,0,0,.35)]">
      <div className="flex h-10 items-center gap-2 border-b border-white/10 bg-[#181818] px-4">
        <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
        <span className="ml-3 truncate text-[10px] font-bold tracking-wide text-white/45">
          hooversrooters.com
        </span>
      </div>
      <div className="relative aspect-[16/10] bg-black">
        <Image
          src="/portfolio/hoovers-rooters/homepage.png"
          alt="Hoover's Rooters live website"
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 640px"
          className="object-cover object-top"
        />
      </div>
    </div>
  );
}
