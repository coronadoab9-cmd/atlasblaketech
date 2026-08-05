import type { Metadata } from "next";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import PageHero from "../components/PageHero";

export const metadata: Metadata = { title: "Terms of Use", description: "General terms for using the public AtlasBlake Technologies LLC website.", alternates: { canonical: "/terms" } };
export default function TermsPage(){return <main><Navbar/><PageHero eyebrow="Legal" title="Terms of Use" text="These terms apply to the public AtlasBlake Technologies LLC website. Client projects, products, subscriptions, and support may be governed by separate written agreements."/><section className="bg-white px-6 py-20"><div className="mx-auto max-w-4xl"><p className="mb-10 text-sm font-bold text-[#71879d]">Last updated: August 4, 2026</p><div className="space-y-10">{[
["Website use","You may use this public website for lawful informational and business-inquiry purposes. You may not interfere with the website, attempt unauthorized access, introduce malicious code, or misuse website content or forms."],
["No automatic service agreement","Submitting an inquiry, scheduling a discussion, or receiving preliminary information does not create a client relationship or obligate either party to begin a project. Work begins only under an accepted written agreement or authorization."],
["Published pricing and project information","The pricing page summarizes the current Core Website, Growth Website, Premium Website, and corresponding care plans. Final scope, deliverables, project fee, recurring rate, ownership, licensing, support, and timeline are established in the signed proposal, Service Agreement, and any approved addendum or change order."],
["Intellectual property and client assets","The AtlasBlake name, branding, public website design, text, graphics, demonstrations, reusable code, design systems, methods, and product materials are owned by AtlasBlake Technologies or used with permission. Clients retain ownership of their domain, branding, client-provided content, customer data, and business-owned accounts. Website-platform licensing and migration rights are defined by the signed project agreement."],
["Third-party services","The website and AtlasBlake projects may rely on third-party hosting, APIs, software, platforms, and service providers. Their services are subject to their own terms, availability, and policies."],
["Availability and accuracy","AtlasBlake may update, suspend, remove, or change website content without notice. Reasonable efforts are made to keep public information useful, but the website is provided without a guarantee that every item is complete, current, or error-free."],
["Limitation","To the extent permitted by law, AtlasBlake is not responsible for indirect or consequential losses arising solely from use of, or inability to use, this public informational website."],
["Contact","Questions about these terms can be sent to coronadoab9@gmail.com."],
].map(([title,text])=><div key={title}><h2 className="text-2xl font-extrabold text-[#071a33]">{title}</h2><p className="mt-4 leading-8 text-[#5d7790]">{text}</p></div>)}</div></div></section><Footer/></main>}
