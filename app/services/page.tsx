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
  title: "Technology Services",
  description: "Custom website development, software, mobile apps, business automation, API integrations, cloud deployment, and continued support.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return <main><Navbar /><PageHero eyebrow="Technology services" title="Built around your goals—not a generic package." text="From a professional business website to a complete custom operating platform, AtlasBlake develops practical technology that makes companies easier to run." primaryLabel="Start a Project" secondaryLabel="View Our Work" secondaryHref="/work" />
    <section className="bg-white px-6 py-24 md:py-32"><div className="mx-auto max-w-7xl"><SectionHeading eyebrow="Capabilities" title="One partner for the full digital system." text="Design, development, integrations, deployment, and ongoing support can be planned together instead of split across disconnected vendors." />
      <div className="mt-16 space-y-6">{services.map((service,index)=><Link key={service.slug} href={`/services/${service.slug}`} className="group grid gap-7 rounded-[28px] border border-[#dce7f2] bg-[#fbfdff] p-7 transition hover:-translate-y-1 hover:border-[#a8c8eb] hover:shadow-[0_24px_70px_rgba(23,62,103,.12)] md:grid-cols-[80px_1fr_auto] md:items-center md:p-9"><span className="grid h-16 w-16 place-items-center rounded-2xl bg-[#eaf3ff] text-[#1265df]"><Icon name={service.icon} className="h-8 w-8" /></span><div><div className="flex flex-wrap items-center gap-3"><p className="text-xs font-black tracking-[.2em] text-[#1265df]">0{index+1}</p><p className="text-xs font-extrabold uppercase tracking-[.18em] text-[#6b8299]">{service.eyebrow}</p></div><h2 className="mt-3 text-3xl font-extrabold tracking-[-.035em] text-[#071a33]">{service.title}</h2><p className="mt-3 max-w-3xl leading-7 text-[#5e7891]">{service.description}</p></div><span className="grid h-12 w-12 place-items-center rounded-full border border-[#cbdbe9] text-[#1265df] transition group-hover:translate-x-1 group-hover:bg-[#1265df] group-hover:text-white"><Icon name="arrow" className="h-5 w-5" /></span></Link>)}</div>
    </div></section>
    <section className="border-y border-[#dce7f2] bg-[#f6f9fd] px-6 py-24"><div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2"><div><SectionHeading eyebrow="Flexible engagement" title="Start where the value is highest." text="A project can begin with a focused website or workflow and expand over time. The important part is building on a clear, dependable foundation." /></div><div className="grid gap-5 sm:grid-cols-2">{[["Focused project","A defined website, portal, app, integration, or internal tool."],["Phased platform","A larger system divided into practical launch stages."],["System improvement","Modernize, connect, or replace an existing process."],["Ongoing partnership","Continued support, maintenance, and feature expansion."]].map(([title,text])=><div key={title} className="rounded-2xl border border-[#dce7f2] bg-white p-6"><h3 className="text-xl font-extrabold">{title}</h3><p className="mt-3 leading-7 text-[#637b93]">{text}</p></div>)}</div></div></section>
    <MarketingCta /><Footer /></main>;
}
