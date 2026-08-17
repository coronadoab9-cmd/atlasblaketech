import Link from "next/link";
import Brand from "./Brand";
import { site } from "../lib/marketing";

const serviceLinks = [
  ["Website Design", "/services/website-design"],
  ["Local SEO & Growth", "/services/local-seo-growth"],
  ["Website Care", "/services/website-care"],
  ["Custom Technology", "/services/custom-technology"],
  ["Automation & Integrations", "/services/automation-integrations"],
];

const companyLinks = [
  ["Our Work", "/work"],
  ["Approach", "/approach"],
  ["About", "/about"],
  ["Start a Project", "/start-a-project"],
];

export default function Footer() {
  return (
    <footer className="bg-[#06172d] text-white">
      <div className="mx-auto max-w-7xl px-6 py-20 md:py-24">
        <div className="grid gap-14 lg:grid-cols-[1.35fr_.9fr_.75fr_1fr]">
          <div>
            <Brand inverse />
            <p className="mt-7 max-w-md text-base leading-7 text-slate-300">
              Professional websites and practical technology shaped around real business goals, clear scope, and budget-aware planning.
            </p>
            <p className="mt-5 text-sm font-bold text-blue-300">{site.location}</p>
          </div>
          <FooterColumn title="Services" links={serviceLinks} />
          <FooterColumn title="Company" links={companyLinks} />
          <div>
            <p className="text-xs font-black uppercase tracking-[.2em] text-blue-300">Start a conversation</p>
            <a href={`mailto:${site.email}`} className="mt-5 block text-lg font-extrabold text-white transition hover:text-blue-300">{site.email}</a>
            <p className="mt-4 text-sm leading-6 text-slate-400">No technical specification required. Start with your company, your goals, and what you want to improve.</p>
          </div>
        </div>
        <div className="mt-16 flex flex-col gap-4 border-t border-white/10 pt-8 text-sm text-slate-400 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} AtlasBlake Technologies LLC. All rights reserved.</p>
          <div className="flex gap-5"><Link href="/privacy" className="hover:text-white">Privacy</Link><Link href="/terms" className="hover:text-white">Terms</Link><Link href="/support" className="hover:text-white">Support</Link></div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, links }: { title: string; links: string[][] }) {
  return <div><p className="text-xs font-black uppercase tracking-[.2em] text-blue-300">{title}</p><div className="mt-5 flex flex-col gap-3">{links.map(([label, href]) => <Link key={href} href={href} className="text-sm font-bold text-slate-300 transition hover:text-white">{label}</Link>)}</div></div>;
}
