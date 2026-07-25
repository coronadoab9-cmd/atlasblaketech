import type { Metadata } from "next";
import Link from "next/link";
import Footer from "../components/Footer";
import { Icon } from "../components/Icons";
import Navbar from "../components/Navbar";

export const metadata: Metadata = {
  title: "Client Portal",
  description: "Secure AtlasBlake client and product workspace information.",
  robots: { index: false, follow: false },
};

export default function PortalPage() {
  return (
    <main className="min-h-screen bg-[#f6f9fd]">
      <Navbar />
      <section className="px-6 py-24 md:py-32">
        <div className="mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-[1fr_.85fr]">
          <div>
            <p className="text-sm font-extrabold uppercase tracking-[.22em] text-[#1265df]">Client portal</p>
            <h1 className="mt-5 text-5xl font-extrabold leading-[1.03] tracking-[-.05em] text-[#071a33] md:text-7xl">Company-specific access to AtlasBlake systems.</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-[#5e7891]">Each deployed product or custom platform can provide a focused workspace for the company, its employees, customers, operational records, and purchased modules.</p>
            <div className="mt-9 grid gap-4 sm:grid-cols-2">
              {[
                ["shield", "Secure workspaces", "Separate access and information for each company."],
                ["users", "Role-based access", "The right tools and records for each user."],
                ["layers", "Purchased modules", "Only the systems included in the company deployment."],
                ["chart", "Operational visibility", "Dashboards, records, reports, and activity in one place."],
              ].map(([icon,title,text]) => (
                <div key={title} className="rounded-2xl border border-[#dce7f2] bg-white p-5">
                  <Icon name={icon as "shield"} className="h-6 w-6 text-[#1265df]" />
                  <h2 className="mt-4 text-lg font-extrabold">{title}</h2>
                  <p className="mt-2 text-sm leading-6 text-[#607991]">{text}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-[30px] bg-[#06172d] p-8 text-white shadow-[0_30px_80px_rgba(7,26,51,.24)] md:p-10">
            <span className="grid h-14 w-14 place-items-center rounded-2xl bg-blue-500/20 text-blue-300"><Icon name="portal" className="h-7 w-7" /></span>
            <h2 className="mt-7 text-3xl font-extrabold">Looking for your workspace?</h2>
            <p className="mt-4 leading-7 text-slate-300">Use the product or company-specific link supplied by AtlasBlake. Access links vary by deployment.</p>
            <Link href="/login" className="button-primary mt-8">Access Help<Icon name="arrow" className="h-5 w-5" /></Link>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
