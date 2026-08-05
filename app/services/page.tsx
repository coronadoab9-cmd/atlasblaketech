import type { Metadata } from "next";
import Link from "next/link";
import Footer from "../components/Footer";
import { Icon } from "../components/Icons";
import MarketingCta from "../components/MarketingCta";
import Navbar from "../components/Navbar";
import PageHero from "../components/PageHero";
import SectionHeading from "../components/SectionHeading";
import { services } from "../lib/marketing";

export const metadata: Metadata = {
  title: "Website & Technology Services",
  description: "Professional website design, local SEO foundations, website care, custom technology, automation, and integrations from AtlasBlake Technologies.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return <main><Navbar /><PageHero eyebrow="Services" title="Start with what your business needs now." text="AtlasBlake can build the professional public presence first, then add better growth tools, support, automation, portals, or software as the company grows." primaryLabel="Start Your Project" primaryHref="/start-a-project" secondaryLabel="View Pricing" secondaryHref="/pricing" />
    <section className="bg-white px-6 py-24 md:py-32"><div className="mx-auto max-w-7xl"><SectionHeading eyebrow="What we do" title="Professional websites with room to grow." text="Every recommendation begins with the business goal, the customer or employee using the solution, and the clearest path to a useful result." /><div className="mt-16 grid gap-6 md:grid-cols-2">{services.map((service, index)=><Link key={service.slug} href={`/services/${service.slug}`} className={`marketing-card group p-8 md:p-10 ${index===0 ? "md:col-span-2 md:grid md:grid-cols-[auto_1fr] md:gap-10" : ""}`}><span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-[#eaf3ff] text-[#2563eb] transition group-hover:bg-[#2563eb] group-hover:text-white"><Icon name={service.icon} className="h-7 w-7" /></span><div><p className={`${index===0 ? "mt-6 md:mt-0" : "mt-7"} text-xs font-black uppercase tracking-[.18em] text-[#2563eb]`}>{service.eyebrow}</p><h2 className="mt-3 text-3xl font-black tracking-[-.035em]">{service.title}</h2><p className="mt-4 max-w-2xl text-lg leading-8 text-[#607991]">{service.summary}</p><span className="mt-7 inline-flex items-center gap-2 text-sm font-black text-[#1d5fd0]">Explore service<Icon name="arrow" className="h-4 w-4 transition group-hover:translate-x-1" /></span></div></Link>)}</div></div></section>
    <section className="border-y border-[#dce7f2] bg-[#f6f9fd] px-6 py-24"><div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[.9fr_1.1fr] lg:items-center"><SectionHeading eyebrow="A practical starting point" title="A website can be the beginning—not the limit." text="Many clients begin with a professional website and later add stronger local content, review tools, a customer portal, automated follow-up, reporting, or a custom system." /><div className="grid gap-4 sm:grid-cols-2">{["Professional public website","Search and analytics foundation","Ongoing website support","Customer and employee portals","Workflow automation","Custom business software"].map((item)=><div key={item} className="flex items-center gap-3 rounded-xl border border-[#dce7f2] bg-white px-5 py-4 font-black text-[#29455f]"><Icon name="check" className="h-5 w-5 text-[#2563eb]" />{item}</div>)}</div></div></section>
    <MarketingCta /><Footer /></main>;
}
