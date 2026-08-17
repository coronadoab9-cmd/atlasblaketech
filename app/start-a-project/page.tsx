import type { Metadata } from "next";
import ContactForm from "../components/ContactForm";
import Footer from "../components/Footer";
import { Icon } from "../components/Icons";
import Navbar from "../components/Navbar";
import PageHero from "../components/PageHero";

export const metadata: Metadata = {
  title: "Start a Project",
  description: "Tell AtlasBlake Technologies about your business, website goals, local growth needs, automation idea, portal, or custom technology project.",
  alternates: { canonical: "/start-a-project" },
};

export default function StartProjectPage(){
  return <main><Navbar/><PageHero eyebrow="Start a project" title="Tell us what you want your business to become." text="You do not need a technical specification. Share your company, your goals, what is not working today, and what a successful result would look like."/>
    <section className="bg-[#f6f9fd] px-6 py-24 md:py-32"><div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[.72fr_1.28fr]"><div><p className="text-sm font-black uppercase tracking-[.22em] text-[#2563eb]">Start the conversation</p><h2 className="mt-5 text-4xl font-black tracking-[-.04em]">Bring the vision. We will help shape the plan.</h2><p className="mt-5 leading-7 text-[#607991]">AtlasBlake reviews the business goal first, then helps shape the right pages, features, content, project stages, and support level around the priorities and budget that make sense for the company.</p><div className="mt-9 space-y-4"><ContactCard icon="mail" title="Project inquiries" value="contact@atlasblaketech.com" href="mailto:contact@atlasblaketech.com"/><ContactCard icon="map" title="Location" value="Dallas–Fort Worth, Texas"/><ContactCard icon="clock" title="First step" value="A focused conversation about the business and the desired result."/></div><div className="mt-8 rounded-2xl border border-[#bfd5ef] bg-[#edf5ff] p-6"><p className="font-black text-[#173957]">What happens next?</p><p className="mt-3 text-sm leading-6 text-[#516f8c]">Your inquiry is reviewed, the most important goals and constraints are identified, and a discovery conversation can be scheduled before a written scope and quote are prepared. If the full vision should be phased, we can talk through that too.</p></div></div><ContactForm/></div></section><Footer/></main>;
}

function ContactCard({icon,title,value,href}:{icon:"mail"|"map"|"clock";title:string;value:string;href?:string}){const content=<><span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[#eaf3ff] text-[#2563eb]"><Icon name={icon} className="h-5 w-5"/></span><div><p className="text-xs font-black uppercase tracking-[.16em] text-[#7890a7]">{title}</p><p className="mt-1 font-extrabold text-[#29455f]">{value}</p></div></>;return href?<a href={href} className="flex gap-4 rounded-2xl border border-[#dce7f2] bg-white p-5 transition hover:border-[#a8c8eb]">{content}</a>:<div className="flex gap-4 rounded-2xl border border-[#dce7f2] bg-white p-5">{content}</div>}
