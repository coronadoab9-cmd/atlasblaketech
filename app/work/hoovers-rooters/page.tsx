import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Footer from "../../components/Footer";
import { Icon } from "../../components/Icons";
import MarketingCta from "../../components/MarketingCta";
import Navbar from "../../components/Navbar";

export const metadata: Metadata = {
  title: "Hoover's Rooters Website Case Study",
  description:
    "See how AtlasBlake Technologies built Hoover's Rooters a branded, mobile-first plumbing website with request-service pathways, local service-area pages, and a technical SEO foundation.",
  alternates: { canonical: "/work/hoovers-rooters" },
};

const built = [
  "Custom black-and-white visual direction",
  "Responsive, mobile-first website experience",
  "Homepage built around services, trust, and customer action",
  "Dedicated About page with the company's story",
  "Dedicated Request Service page and inquiry form",
  "Plumbing service content and customer FAQs",
  "Service-area hub for local discovery",
  "10 individual DFW city pages",
  "Emergency call and request-service pathways",
  "Sitemap, robots file, metadata, and technical SEO foundation",
  "Production domain and SSL launch",
  "Continued website management and support",
];

const cities = [
  "Fort Worth",
  "Arlington",
  "Mansfield",
  "North Richland Hills",
  "Burleson",
  "Bedford",
  "Saginaw",
  "Benbrook",
  "Euless",
  "Watauga",
];

export default function HooversRootersCaseStudy() {
  return (
    <main>
      <Navbar />

      <section className="relative overflow-hidden bg-[#050505] px-6 py-20 text-white md:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,255,255,.08),transparent_32%)]" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-[.88fr_1.12fr]">
          <div>
            <p className="text-sm font-black uppercase tracking-[.24em] text-slate-400">
              Website case study
            </p>
            <h1 className="mt-6 text-balance text-5xl font-black leading-[.98] tracking-[-.055em] md:text-7xl">
              Hoover&apos;s Rooters
            </h1>
            <p className="mt-7 text-xl leading-9 text-slate-300">
              A bold, professional plumbing website built around the
              company&apos;s real brand, local service area, and the fastest
              paths for homeowners to call or request service.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <a
                href="https://hooversrooters.com"
                target="_blank"
                rel="noreferrer"
                className="button-primary"
              >
                Visit the Live Website
                <Icon name="arrow" className="h-5 w-5" />
              </a>
              <Link
                href="/start-a-project"
                className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/20 px-5 font-black text-white transition hover:bg-white/10"
              >
                Start a Similar Project
              </Link>
            </div>
          </div>

          <SitePreview />
        </div>
      </section>

      <section className="bg-white px-6 py-24 md:py-32">
        <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-sm font-black uppercase tracking-[.22em] text-[#2563eb]">
              The challenge
            </p>
            <h2 className="mt-5 text-4xl font-black tracking-[-.04em] md:text-5xl">
              Give a growing local plumbing company a digital presence that
              looked established and easy to trust.
            </h2>
            <p className="mt-6 text-lg leading-8 text-[#607991]">
              Hoover&apos;s Rooters needed a professional online home that
              reflected the company&apos;s real identity instead of looking
              like a generic plumbing template. Homeowners needed to understand
              the services, know where the company works, and quickly reach the
              business from a phone.
            </p>
            <p className="mt-5 text-lg leading-8 text-[#607991]">
              The site also needed room to grow locally, with a clear structure
              for service-area content, customer questions, request-service
              pathways, and future search visibility.
            </p>
          </div>

          <ProjectImage
            src="/portfolio/hoovers-rooters/homepage.png"
            alt="Hoover's Rooters homepage"
            label="Branded homepage experience"
            objectPosition="top"
          />
        </div>
      </section>

      <section className="border-y border-[#dce7f2] bg-[#f6f9fd] px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-[.75fr_1.25fr]">
            <div>
              <p className="text-sm font-black uppercase tracking-[.22em] text-[#2563eb]">
                What AtlasBlake built
              </p>
              <h2 className="mt-5 text-4xl font-black tracking-[-.04em] md:text-5xl">
                A complete customer-facing foundation.
              </h2>
              <p className="mt-6 leading-7 text-[#607991]">
                The experience was organized around the questions a homeowner
                needs answered quickly: What services do you handle? Do you
                serve my area? Can I trust the company? How do I get help now?
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {built.map((item) => (
                <div
                  key={item}
                  className="flex gap-3 rounded-xl border border-[#dce7f2] bg-white p-5 font-extrabold text-[#405c77]"
                >
                  <Icon
                    name="check"
                    className="mt-0.5 h-5 w-5 shrink-0 text-[#2563eb]"
                  />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 md:grid-cols-2">
            <ProjectImage
              src="/portfolio/hoovers-rooters/mobile.png"
              alt="Hoover's Rooters mobile website"
              label="Mobile-first customer experience"
              objectPosition="top"
            />
            <ProjectImage
              src="/portfolio/hoovers-rooters/service-area.png"
              alt="Hoover's Rooters service area website page"
              label="Local service-area structure"
              objectPosition="top"
            />
          </div>
        </div>
      </section>

      <section className="bg-[#070707] px-6 py-24 text-white">
        <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[.88fr_1.12fr]">
          <div>
            <p className="text-sm font-black uppercase tracking-[.22em] text-slate-400">
              Local growth foundation
            </p>
            <h2 className="mt-5 text-4xl font-black tracking-[-.04em] md:text-6xl">
              Built beyond a single homepage.
            </h2>
            <p className="mt-6 text-lg leading-8 text-slate-300">
              Hoover&apos;s Rooters now has a local page structure that can be
              expanded and improved as the company grows across DFW.
            </p>
          </div>

          <div>
            <p className="text-lg leading-8 text-slate-300">
              Ten dedicated city pages give the website a stronger local
              foundation while keeping the customer experience consistent with
              the main brand.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {cities.map((city) => (
                <span
                  key={city}
                  className="rounded-full border border-white/15 bg-white/[.05] px-4 py-2 text-sm font-extrabold text-slate-200"
                >
                  {city}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#f6f9fd] px-6 py-24">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
          <div className="rounded-[30px] bg-[#0a0a0a] p-8 md:p-12">
            <div className="relative mx-auto aspect-[16/7] max-w-xl">
              <Image
                src="/portfolio/hoovers-rooters/logo.png"
                alt="Hoover's Rooters logo"
                fill
                sizes="560px"
                className="object-contain"
              />
            </div>
          </div>

          <div>
            <p className="text-sm font-black uppercase tracking-[.22em] text-[#2563eb]">
              Brand-specific design
            </p>
            <h2 className="mt-5 text-4xl font-black tracking-[-.04em] md:text-5xl">
              Built to look like Hoover&apos;s Rooters - not every other
              plumber.
            </h2>
            <p className="mt-6 text-lg leading-8 text-[#607991]">
              The finished experience uses the company&apos;s high-contrast
              black-and-white identity, logo, service vehicle, and direct
              messaging to create a distinct visual presence while keeping the
              website simple to navigate.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[#06172d] px-6 py-24 text-white">
        <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[.9fr_1.1fr]">
          <div>
            <p className="text-sm font-black uppercase tracking-[.22em] text-blue-300">
              The result
            </p>
            <h2 className="mt-5 text-4xl font-black tracking-[-.04em] md:text-6xl">
              A professional online home ready to grow with the business.
            </h2>
          </div>

          <div className="space-y-5 text-lg leading-8 text-slate-300">
            <p>
              The finished website gives Hoover&apos;s Rooters a branded
              production presence on its own domain, clear service discovery,
              local service-area coverage, a dedicated request-service flow,
              and a strong mobile experience for homeowners who need help
              quickly.
            </p>
            <p>
              AtlasBlake does not claim unverified ranking, traffic, lead, or
              revenue increases. Those results can be measured over time as the
              website builds history and the business continues its local
              growth work.
            </p>
            <p className="font-extrabold text-white">
              The immediate result is a website the company can confidently
              send customers to, advertise, expand, and continue improving.
            </p>
          </div>
        </div>
      </section>

      <MarketingCta />
      <Footer />
    </main>
  );
}

function SitePreview() {
  return (
    <div className="overflow-hidden rounded-[24px] border border-white/10 bg-[#111] shadow-[0_28px_80px_rgba(0,0,0,.4)]">
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
          alt="Hoover's Rooters website homepage"
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 640px"
          className="object-cover object-top"
        />
      </div>
    </div>
  );
}

function ProjectImage({
  src,
  alt,
  label,
  objectPosition = "center",
}: {
  src: string;
  alt: string;
  label: string;
  objectPosition?: "top" | "center";
}) {
  return (
    <figure className="overflow-hidden rounded-[26px] border border-[#dce7f2] bg-white shadow-[0_18px_55px_rgba(23,62,103,.09)]">
      <div className="relative aspect-[16/10] bg-[#f3f5f7]">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, 560px"
          className={`object-cover ${objectPosition === "top" ? "object-top" : "object-center"}`}
        />
      </div>
      <figcaption className="px-6 py-4 text-sm font-black uppercase tracking-[.14em] text-[#1d5fd0]">
        {label}
      </figcaption>
    </figure>
  );
}
