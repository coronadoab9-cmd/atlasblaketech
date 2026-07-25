import type { Metadata } from "next";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import PageHero from "../components/PageHero";

export const metadata: Metadata = { title: "Privacy Policy", description: "Privacy information for the AtlasBlake Technologies website and project inquiry process.", alternates: { canonical: "/privacy" } };
export default function PrivacyPage(){return <main><Navbar/><PageHero eyebrow="Legal" title="Privacy Policy" text="This page explains the general information AtlasBlake Technologies may receive through its public website and project communications."/><LegalBody sections={[
["Information you provide","AtlasBlake may receive information you voluntarily provide through email or project inquiries, including your name, company, email address, phone number, project needs, and related communications."],
["Website and technical information","Hosting, security, and analytics providers may process limited technical information such as browser type, device information, approximate location, referring pages, requested pages, timestamps, and IP address."],
["How information may be used","Information may be used to respond to inquiries, plan and deliver services, support client systems, maintain website security, understand site performance, comply with legal obligations, and improve AtlasBlake products and services."],
["Service providers","AtlasBlake may use cloud hosting, email, analytics, security, and development service providers. These providers may process information only as necessary to deliver their services."],
["Client systems","Custom software and client platforms may have additional privacy, access, retention, and data-processing terms defined by the applicable agreement and the client’s own policies."],
["Data security","Reasonable administrative and technical safeguards are used, but no online service or method of electronic storage can be guaranteed completely secure."],
["Your choices","You may request correction or deletion of information you previously supplied, subject to contractual, security, recordkeeping, and legal requirements."],
["Contact","Privacy questions can be sent to contact@atlasblaketech.com."],
]} updated="July 25, 2026"/><Footer/></main>}
function LegalBody({sections,updated}:{sections:string[][];updated:string}){return <section className="bg-white px-6 py-20"><div className="mx-auto max-w-4xl"><p className="mb-10 text-sm font-bold text-[#71879d]">Last updated: {updated}</p><div className="space-y-10">{sections.map(([title,text])=><div key={title}><h2 className="text-2xl font-extrabold text-[#071a33]">{title}</h2><p className="mt-4 leading-8 text-[#5d7790]">{text}</p></div>)}</div></div></section>}
