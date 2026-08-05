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
  title: "Our Work",
  description: "Explore the NexDrain Plumbing website case study and the broader website, portal, automation, and custom technology capabilities of AtlasBlake Technologies.",
  alternates: { canonical: "/work" },
};

export default function WorkPage(){
  return <main><Navbar/><PageHero eyebrow="Our work" title="Professional work built around a real business." text="NexDrain Plumbing is the flagship public website project. It demonstrates how AtlasBlake combines brand presentation, service content, local structure, customer proof, and practical conversion paths." primaryLabel="View the NexDrain Case Study" primaryHref="/work/nexdrain-plumbing" secondaryLabel="Start Your Project" secondaryHref="/start-a-project"/>
    <section className="bg-white px-6 py-24 md:py-32"><div className="mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-[.88fr_1.12fr]"><div><p className="text-sm font-black uppercase tracking-[.24em] text-[#2563eb]">Featured website project</p><h2 className="mt-5 text-5xl font-black tracking-[-.05em] md:text-6xl">NexDrain Plumbing</h2><p className="mt-6 text-lg leading-8 text-[#607991]">A complete professional website for a DFW plumbing company, designed to establish trust, make services easier to understand, present real work, and give homeowners fast ways to request help.</p><div className="mt-8 grid gap-3 sm:grid-cols-2">{["Custom brand experience","Mobile-first design","Service and city pages","Project galleries","Review integration","Analytics and search setup"].map(item=><div key={item} className="flex items-center gap-3 font-extrabold text-[#405c77]"><Icon name="check" className="h-5 w-5 text-[#2563eb]"/>{item}</div>)}</div><div className="mt-9 flex flex-col gap-3 sm:flex-row"><Link href="/work/nexdrain-plumbing" className="button-primary">View Case Study<Icon name="arrow" className="h-5 w-5"/></Link><a href="https://nexdrainplumbing.net" target="_blank" rel="noreferrer" className="button-secondary">Visit Live Website</a></div></div><WebsiteShowcase compact/></div></section>
    <section className="border-y border-[#dce7f2] bg-[#06172d] px-6 py-24 text-white"><div className="mx-auto max-w-7xl"><SectionHeading eyebrow="Technology capability" title="More than a website builder." text="AtlasBlake can continue helping after launch through customer portals, internal dashboards, mobile workflows, integrations, automation, and company-specific software." inverse/><div className="mt-14 grid gap-5 md:grid-cols-3">{[["portal","Customer experiences","Secure portals, document access, job visibility, and customer self-service."],["layers","Internal operations","Dashboards and tools that organize work around the company’s actual process."],["link","Connected workflows","Integrations, notifications, automated documents, and dependable data movement."]].map(([icon,title,text])=><div key={title} className="rounded-2xl border border-white/10 bg-white/[.04] p-7"><span className="grid h-12 w-12 place-items-center rounded-2xl bg-blue-500/15 text-blue-300"><Icon name={icon as "portal"} className="h-6 w-6"/></span><h3 className="mt-6 text-2xl font-black">{title}</h3><p className="mt-4 leading-7 text-slate-300">{text}</p></div>)}</div></div></section>
    <section className="bg-[#f6f9fd] px-6 py-24"><div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[.9fr_1.1fr] lg:items-center"><div className="relative aspect-[4/3] overflow-hidden rounded-[30px] border border-[#dce7f2] bg-white shadow-[0_24px_70px_rgba(23,62,103,.12)]"><Image src="/portfolio/nexdrain/camera-inspection.jpg" alt="NexDrain plumbing camera inspection project photography" fill sizes="(max-width: 1024px) 100vw, 560px" className="object-cover"/></div><div><SectionHeading eyebrow="Real project proof" title="Built from the company’s actual work—not generic stock content." text="NexDrain’s service photography, before-and-after projects, reviews, service descriptions, and customer pathways create a website that feels specific to the business."/><Link href="/work/nexdrain-plumbing" className="button-primary mt-9">See What Was Built<Icon name="arrow" className="h-5 w-5"/></Link></div></div></section>
    <MarketingCta/><Footer/></main>;
}
