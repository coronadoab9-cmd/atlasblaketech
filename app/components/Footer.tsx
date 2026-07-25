import Link from "next/link";
import Brand from "./Brand";
import { site } from "../lib/marketing";

const serviceLinks = [
  ["Website Development", "/services/website-development"],
  ["Custom Software", "/services/custom-software"],
  ["Mobile Apps", "/services/mobile-apps"],
  ["Automation", "/services/business-automation"],
  ["API Integrations", "/services/api-integrations"],
];

const companyLinks = [
  ["Work", "/work"],
  ["Products", "/products"],
  ["About", "/about"],
  ["Contact", "/contact"],
  ["Client Login", "/login"],
];

export default function Footer() {
  return (
    <footer className="bg-[#06172d] text-white">
      <div className="mx-auto max-w-7xl px-6 py-20 md:py-24">
        <div className="grid gap-14 lg:grid-cols-[1.4fr_.8fr_.8fr_.9fr]">
          <div>
            <Brand inverse />
            <p className="mt-7 max-w-md text-base leading-7 text-slate-300">
              Websites, custom software, mobile applications, and automation built around real business needs.
            </p>
            <p className="mt-5 text-sm font-semibold text-blue-200">{site.location}</p>
          </div>
          <FooterColumn title="Services" links={serviceLinks} />
          <FooterColumn title="Company" links={companyLinks} />
          <div>
            <h3 className="text-sm font-extrabold uppercase tracking-[0.2em] text-blue-300">Contact</h3>
            <div className="mt-6 space-y-4 text-sm text-slate-300">
              <a className="block transition hover:text-white" href={`mailto:${site.email}`}>{site.email}</a>
              <a className="block transition hover:text-white" href={`mailto:${site.supportEmail}`}>{site.supportEmail}</a>
              <Link className="block transition hover:text-white" href="/support">Support</Link>
              <Link className="block transition hover:text-white" href="/privacy">Privacy Policy</Link>
              <Link className="block transition hover:text-white" href="/terms">Terms of Use</Link>
            </div>
          </div>
        </div>
        <div className="mt-16 flex flex-col gap-4 border-t border-white/10 pt-8 text-sm text-slate-400 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} AtlasBlake Technologies LLC. All rights reserved.</p>
          <p>Built to solve real business problems.</p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, links }: { title: string; links: string[][] }) {
  return <div><h3 className="text-sm font-extrabold uppercase tracking-[0.2em] text-blue-300">{title}</h3><div className="mt-6 space-y-4">{links.map(([label,href])=><Link key={href} href={href} className="block text-sm text-slate-300 transition hover:text-white">{label}</Link>)}</div></div>;
}
