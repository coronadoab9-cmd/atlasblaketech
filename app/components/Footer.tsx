import Link from "next/link";
import Brand from "./Brand";
import { site } from "../lib/marketing";

const primaryLinks = [
  ["Services", "/services"],
  ["Work", "/work"],
  ["Approach", "/approach"],
  ["About", "/about"],
];

const serviceLinks = [
  ["Websites", "/services/website-design"],
  ["Local Growth", "/services/local-seo-growth"],
  ["Website Care", "/services/website-care"],
  ["Custom Technology", "/services/custom-technology"],
];

export default function Footer() {
  return (
    <footer className="bg-[#07182c] text-white">
      <div className="mx-auto max-w-7xl px-5 py-12 sm:px-6 md:py-14">
        <div className="grid gap-10 border-b border-white/10 pb-10 md:grid-cols-[1.3fr_.7fr_.8fr]">
          <div>
            <Brand inverse />
            <p className="mt-5 max-w-md text-sm leading-7 text-slate-300">
              Professional websites and practical technology built around real businesses, clear priorities, and useful results.
            </p>
            <a href={`mailto:${site.email}`} className="mt-5 inline-block text-sm font-extrabold text-blue-300 transition hover:text-white">
              {site.email}
            </a>
          </div>

          <FooterColumn title="Company" links={primaryLinks} />
          <FooterColumn title="Services" links={serviceLinks} />
        </div>

        <div className="flex flex-col gap-4 pt-7 text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} AtlasBlake Technologies LLC. {site.location}</p>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            <Link href="/privacy" className="hover:text-white">Privacy</Link>
            <Link href="/terms" className="hover:text-white">Terms</Link>
            <Link href="/support" className="hover:text-white">Support</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, links }: { title: string; links: string[][] }) {
  return (
    <div>
      <p className="text-xs font-black uppercase tracking-[.18em] text-blue-300">{title}</p>
      <div className="mt-4 flex flex-col gap-3">
        {links.map(([label, href]) => (
          <Link key={href} href={href} className="text-sm font-bold text-slate-300 transition hover:text-white">
            {label}
          </Link>
        ))}
      </div>
    </div>
  );
}
