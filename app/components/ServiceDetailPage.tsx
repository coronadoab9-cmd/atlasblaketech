import Link from "next/link";
import { Icon } from "./Icons";
import MarketingCta from "./MarketingCta";
import Navbar from "./Navbar";
import Footer from "./Footer";
import PageHero from "./PageHero";
import SectionHeading from "./SectionHeading";
import { services } from "../lib/marketing";

export default function ServiceDetailPage({ slug }: { slug: string }) {
  const service = services.find((item) => item.slug === slug);
  if (!service) return null;
  const related = services.filter((item) => item.slug !== slug).slice(0, 3);
  return <main><Navbar /><PageHero eyebrow={service.eyebrow} title={service.title} text={service.description} primaryLabel="Discuss Your Project" secondaryLabel="View Our Work" secondaryHref="/work" />
    <section className="bg-white px-6 py-24 md:py-32"><div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-[.85fr_1.15fr]"><div><SectionHeading eyebrow="What’s included" title="Built for a useful business result." text="The exact scope is shaped around your company, users, existing tools, and launch priorities." /><Link href="/contact" className="button-primary mt-9">Start a Conversation<Icon name="arrow" className="h-5 w-5" /></Link></div><div className="grid gap-4 sm:grid-cols-2">{service.outcomes.map((outcome)=><div key={outcome} className="flex min-h-24 items-center gap-4 rounded-2xl border border-[#dce7f2] bg-[#f9fbfd] p-5 font-extrabold text-[#29455f]"><span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[#e8f2ff] text-[#1265df]"><Icon name="check" className="h-5 w-5" /></span>{outcome}</div>)}</div></div></section>
    <section className="relative overflow-hidden bg-[#06172d] px-6 py-24 text-white"><div className="hero-grid-dark absolute inset-0"/><div className="relative mx-auto max-w-7xl"><SectionHeading eyebrow="The AtlasBlake approach" title="Clear scope. Practical design. Dependable launch." text="We keep the work connected to the actual business problem, validate the workflow with the people who will use it, and build with future expansion in mind." inverse /><div className="mt-14 grid gap-5 md:grid-cols-3">{[["Understand the workflow","We document who uses the system, what information moves, and where the current process breaks down."],["Design the right solution","We shape the pages, features, permissions, integrations, and experience around the required outcome."],["Launch and improve","We test in the real environment, deploy carefully, and continue improving after launch."]].map(([title,text],index)=><div key={title} className="rounded-2xl border border-white/10 bg-white/[.04] p-7"><p className="text-xs font-black tracking-[.2em] text-blue-300">0{index+1}</p><h3 className="mt-5 text-2xl font-extrabold">{title}</h3><p className="mt-4 leading-7 text-slate-300">{text}</p></div>)}</div></div></section>
    <section className="bg-[#f6f9fd] px-6 py-24"><div className="mx-auto max-w-7xl"><SectionHeading eyebrow="Related services" title="Build the complete solution." /><div className="mt-12 grid gap-6 md:grid-cols-3">{related.map((item)=><Link key={item.slug} href={`/services/${item.slug}`} className="marketing-card group p-7"><span className="grid h-11 w-11 place-items-center rounded-xl bg-[#eaf3ff] text-[#1265df]"><Icon name={item.icon} className="h-5 w-5" /></span><h3 className="mt-5 text-2xl font-extrabold">{item.title}</h3><p className="mt-3 leading-7 text-[#607991]">{item.summary}</p><span className="mt-6 inline-flex items-center gap-2 text-sm font-extrabold text-[#1265df]">Explore<Icon name="arrow" className="h-4 w-4 transition group-hover:translate-x-1" /></span></Link>)}</div></div></section>
    <MarketingCta /><Footer /></main>;
}
