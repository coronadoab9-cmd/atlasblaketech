import type { Metadata } from "next";
import Link from "next/link";
import Footer from "../components/Footer";
import { Icon } from "../components/Icons";
import MarketingCta from "../components/MarketingCta";
import Navbar from "../components/Navbar";
import PageHero from "../components/PageHero";
import { MaterioryVisual, OperationsVisual, WebsiteVisual } from "../components/ProjectVisuals";
import { projects } from "../lib/marketing";

export const metadata: Metadata = { title: "Our Work", description: "Explore custom software, operational systems, inventory applications, customer portals, and websites built by AtlasBlake Technologies.", alternates: { canonical: "/work" } };

export default function WorkPage() {
  return <main><Navbar /><PageHero eyebrow="Selected work" title="Real systems built around real business needs." text="Our work ranges from public-facing websites to private operational platforms. Each project is shaped around the people using it and the process it needs to improve." primaryLabel="Start a Project" secondaryLabel="Explore Services" secondaryHref="/services" />
    <section className="bg-white px-6 py-24 md:py-32"><div className="mx-auto max-w-7xl space-y-24">
      <ProjectRow project={projects[0]} href="/work/big-town-concrete" visual={<OperationsVisual />} dark />
      <ProjectRow project={projects[1]} href="/work/materiory" visual={<MaterioryVisual />} reverse />
      <ProjectRow project={projects[2]} href="/work/websites" visual={<WebsiteVisual />} />
    </div></section><MarketingCta /><Footer /></main>;
}

function ProjectRow({ project, href, visual, reverse = false, dark = false }: { project: (typeof projects)[number]; href: string; visual: React.ReactNode; reverse?: boolean; dark?: boolean }) {
  return <article className={`grid items-center gap-12 rounded-[34px] p-7 md:p-12 lg:grid-cols-2 ${dark ? "bg-[#06172d] text-white" : "border border-[#dce7f2] bg-[#f9fbfd]"}`}><div className={reverse ? "lg:order-2" : ""}><p className={`text-xs font-extrabold uppercase tracking-[.2em] ${dark ? "text-blue-300" : "text-[#1265df]"}`}>{project.category}</p><h2 className="mt-4 text-4xl font-extrabold tracking-[-.04em] md:text-5xl">{project.title}</h2><p className={`mt-5 text-lg leading-8 ${dark ? "text-slate-300" : "text-[#5e7891]"}`}>{project.description}</p><span className={`mt-6 inline-flex rounded-full px-3 py-1.5 text-xs font-extrabold ${dark ? "bg-white/10 text-blue-200" : "bg-[#eaf3ff] text-[#0b5cc8]"}`}>{project.status}</span><div className="mt-7 grid gap-3 sm:grid-cols-2">{project.capabilities.map((item)=><div key={item} className={`flex items-center gap-2 text-sm font-bold ${dark ? "text-slate-200" : "text-[#405c77]"}`}><Icon name="check" className="h-4 w-4 text-[#2f82f5]" />{item}</div>)}</div><Link href={href} className={`mt-9 ${dark ? "button-primary" : "button-secondary"}`}>View Project<Icon name="arrow" className="h-5 w-5" /></Link></div><div className={reverse ? "lg:order-1" : ""}>{visual}</div></article>;
}
