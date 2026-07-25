import type { Metadata } from "next";
import Link from "next/link";
import Footer from "./components/Footer";
import { Icon } from "./components/Icons";
import MarketingCta from "./components/MarketingCta";
import Navbar from "./components/Navbar";
import { MaterioryVisual, OperationsVisual, WebsiteVisual } from "./components/ProjectVisuals";
import SectionHeading from "./components/SectionHeading";
import { industries, processSteps, projects, services } from "./lib/marketing";

export const metadata: Metadata = {
  title: "Custom Software, Websites & Automation",
  description:
    "AtlasBlake Technologies builds custom software, modern websites, mobile applications, customer portals, API integrations, and business automation.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <main className="overflow-hidden bg-white text-[#071a33]">
      <Navbar />

      <section className="relative overflow-hidden border-b border-[#dce7f2] bg-[linear-gradient(180deg,#ffffff_0%,#f6f9fd_100%)] px-6 pb-24 pt-20 md:pb-32 md:pt-28">
        <div className="hero-grid absolute inset-0" />
        <div className="absolute -left-36 top-24 h-[420px] w-[420px] rounded-full bg-blue-100/70 blur-[110px]" />
        <div className="absolute -right-32 top-0 h-[520px] w-[520px] rounded-full bg-cyan-100/70 blur-[120px]" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-[1.02fr_.98fr]">
          <div>
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#cfe0f3] bg-white/80 px-4 py-2 text-xs font-extrabold uppercase tracking-[0.18em] text-[#1265df] shadow-sm backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              Custom technology for real businesses
            </div>
            <h1 className="max-w-4xl text-balance text-5xl font-extrabold leading-[.98] tracking-[-0.06em] text-[#06172d] md:text-7xl lg:text-[80px]">
              We build software that fits your business.
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-8 text-[#526f8e] md:text-xl md:leading-9">
              AtlasBlake Technologies designs modern websites, custom business software, mobile applications, customer portals, and automated workflows that help companies operate more efficiently.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link href="/contact" className="button-primary">
                Start a Project<Icon name="arrow" className="h-5 w-5" />
              </Link>
              <Link href="/work" className="button-secondary">
                View Our Work<Icon name="arrow" className="h-5 w-5" />
              </Link>
            </div>
            <div className="mt-10 flex flex-wrap gap-x-7 gap-y-3 text-sm font-bold text-[#617b95]">
              {["Website Development", "Custom Software", "Mobile Apps", "Automation"].map((item) => (
                <span key={item} className="flex items-center gap-2"><Icon name="check" className="h-4 w-4 text-[#1265df]" />{item}</span>
              ))}
            </div>
          </div>

          <div className="relative min-h-[520px] lg:min-h-[620px]">
            <div className="absolute inset-x-0 top-12 mx-auto h-[430px] max-w-[540px] rounded-full bg-blue-200/40 blur-[70px]" />
            <div className="float-card absolute left-0 top-20 z-20 w-[86%] max-w-[520px] md:left-4">
              <OperationsVisual compact />
            </div>
            <div className="float-card-alt absolute bottom-6 right-0 z-30 w-[55%] max-w-[310px] rounded-[24px] border border-[#d9e6f2] bg-white p-4 shadow-[0_28px_70px_rgba(18,66,112,.2)] md:right-4">
              <div className="mb-4 flex items-center justify-between">
                <div><p className="text-xs font-extrabold text-[#16324f]">Customer portal</p><p className="mt-1 text-[9px] uppercase tracking-[.16em] text-[#7890a7]">Live job access</p></div>
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-[#eaf3ff] text-[#1265df]"><Icon name="portal" className="h-5 w-5" /></span>
              </div>
              <div className="rounded-xl bg-[#f4f8fc] p-3">
                <div className="flex items-end justify-between"><span className="text-2xl font-extrabold text-[#071a33]">72%</span><span className="text-[9px] font-bold uppercase tracking-wider text-emerald-600">In progress</span></div>
                <div className="mt-3 h-2 rounded-full bg-[#dfe9f3]"><div className="h-full w-[72%] rounded-full bg-[linear-gradient(90deg,#1265df,#43b7f5)]" /></div>
              </div>
              <div className="mt-3 grid grid-cols-2 gap-2">
                <div className="rounded-xl border border-[#e3ebf3] p-3"><div className="text-lg font-extrabold">18</div><div className="text-[8px] uppercase tracking-wider text-[#7890a7]">Tickets</div></div>
                <div className="rounded-xl border border-[#e3ebf3] p-3"><div className="text-lg font-extrabold">2</div><div className="text-[8px] uppercase tracking-wider text-[#7890a7]">Next trucks</div></div>
              </div>
            </div>
            <div className="absolute right-6 top-4 z-30 rounded-2xl border border-[#dce7f2] bg-white/90 px-4 py-3 shadow-xl backdrop-blur md:right-12">
              <div className="flex items-center gap-3"><span className="grid h-9 w-9 place-items-center rounded-xl bg-emerald-50 text-emerald-600"><Icon name="check" className="h-5 w-5" /></span><div><p className="text-xs font-extrabold">Workflow connected</p><p className="text-[9px] uppercase tracking-wider text-[#7890a7]">Data synced</p></div></div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-[#e2ebf4] bg-white px-6 py-9">
        <div className="mx-auto grid max-w-7xl gap-6 text-center sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["Production software", "Built for active operations"],
            ["Mobile & desktop", "Designed for every user"],
            ["Secure cloud systems", "Modern deployment foundations"],
            ["Continued support", "Launch is not the finish line"],
          ].map(([title, text]) => (
            <div key={title} className="border-[#e2ebf4] px-4 lg:border-r lg:last:border-r-0">
              <p className="font-extrabold text-[#16324f]">{title}</p><p className="mt-1 text-sm text-[#6c849c]">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[#f6f9fd] px-6 py-24 md:py-32">
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow="What we build" title="Everything your business needs to operate digitally." text="From a professional public website to a private company platform, we build connected technology around the result your business needs." />
          <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <Link key={service.slug} href={`/services/${service.slug}`} className="marketing-card group p-7 md:p-8">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[#eaf3ff] text-[#1265df] transition group-hover:bg-[#1265df] group-hover:text-white"><Icon name={service.icon} className="h-6 w-6" /></span>
                <p className="mt-7 text-xs font-extrabold uppercase tracking-[.18em] text-[#1265df]">{service.eyebrow}</p>
                <h3 className="mt-3 text-2xl font-extrabold tracking-[-.025em] text-[#071a33]">{service.title}</h3>
                <p className="mt-4 leading-7 text-[#5c7690]">{service.summary}</p>
                <span className="mt-7 inline-flex items-center gap-2 text-sm font-extrabold text-[#0b5cc8]">Explore service<Icon name="arrow" className="h-4 w-4 transition group-hover:translate-x-1" /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#06172d] px-6 py-24 text-white md:py-32">
        <div className="hero-grid-dark absolute inset-0" />
        <div className="absolute -right-32 top-0 h-[560px] w-[560px] rounded-full bg-blue-500/20 blur-[120px]" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-[.88fr_1.12fr]">
          <div>
            <p className="text-sm font-extrabold uppercase tracking-[.24em] text-blue-300">Featured work</p>
            <h2 className="mt-5 text-balance text-4xl font-extrabold leading-[1.05] tracking-[-.045em] md:text-6xl">Built to solve a real operational problem.</h2>
            <p className="mt-7 text-lg leading-8 text-slate-300">Big Town Concrete needed drivers, operations teams, delivery records, customers, and plant data to work together. AtlasBlake built a connected platform around that workflow.</p>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {projects[0].capabilities.map((capability) => <div key={capability} className="flex items-center gap-3 text-sm font-bold text-slate-200"><span className="grid h-7 w-7 place-items-center rounded-lg bg-white/10 text-blue-300"><Icon name="check" className="h-4 w-4" /></span>{capability}</div>)}
            </div>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link href="/work/big-town-concrete" className="button-primary">View Case Study<Icon name="arrow" className="h-5 w-5" /></Link>
              <Link href="/products/btc-fleet" className="button-dark-outline">Explore BTC Fleet</Link>
            </div>
          </div>
          <OperationsVisual />
        </div>
      </section>

      <section className="bg-white px-6 py-24 md:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-7 md:flex-row md:items-end md:justify-between">
            <SectionHeading eyebrow="More work" title="Products and experiences designed with purpose." text="Every project starts with the user, the workflow, and the business result—not a generic template." />
            <Link href="/work" className="button-secondary shrink-0">View all work<Icon name="arrow" className="h-5 w-5" /></Link>
          </div>
          <div className="mt-16 grid gap-8 lg:grid-cols-2">
            <Link href="/work/materiory" className="group"><MaterioryVisual /><div className="mt-7 flex items-start justify-between gap-6"><div><p className="text-xs font-extrabold uppercase tracking-[.18em] text-[#1265df]">Inventory web application</p><h3 className="mt-2 text-3xl font-extrabold tracking-[-.035em]">Materiory</h3><p className="mt-3 max-w-xl leading-7 text-[#607a93]">Private inventory, purchase, receipt, wishlist, and project organization for creative workspaces.</p></div><span className="mt-2 grid h-11 w-11 shrink-0 place-items-center rounded-full border border-[#dce7f2] text-[#1265df] transition group-hover:translate-x-1"><Icon name="arrow" className="h-5 w-5" /></span></div></Link>
            <Link href="/work/websites" className="group"><WebsiteVisual /><div className="mt-7 flex items-start justify-between gap-6"><div><p className="text-xs font-extrabold uppercase tracking-[.18em] text-[#1265df]">Design & development</p><h3 className="mt-2 text-3xl font-extrabold tracking-[-.035em]">Business Websites</h3><p className="mt-3 max-w-xl leading-7 text-[#607a93]">Modern, responsive websites designed to build trust and create a clear path from visitor to customer.</p></div><span className="mt-2 grid h-11 w-11 shrink-0 place-items-center rounded-full border border-[#dce7f2] text-[#1265df] transition group-hover:translate-x-1"><Icon name="arrow" className="h-5 w-5" /></span></div></Link>
          </div>
        </div>
      </section>

      <section className="border-y border-[#dce7f2] bg-[#f6f9fd] px-6 py-24 md:py-32">
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow="How we work" title="From idea to working technology." text="A clear process keeps the work focused, makes decisions easier, and gives every project a practical path to launch." />
          <div className="mt-16 grid gap-5 md:grid-cols-5">
            {processSteps.map((step, index) => (
              <div key={step.number} className="relative rounded-2xl border border-[#dce7f2] bg-white p-6 shadow-sm">
                {index < processSteps.length - 1 ? <div className="absolute -right-3 top-9 z-10 hidden h-px w-6 bg-[#9bbce1] md:block" /> : null}
                <p className="text-xs font-black tracking-[.2em] text-[#1265df]">{step.number}</p>
                <h3 className="mt-5 text-xl font-extrabold">{step.title}</h3>
                <p className="mt-3 text-sm leading-6 text-[#647d95]">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-24 md:py-32">
        <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-[.85fr_1.15fr]">
          <SectionHeading eyebrow="Why AtlasBlake" title="Technology shaped around your operation." text="Generic tools can force a business into someone else’s process. We start with your real users, rules, and goals." />
          <div className="grid gap-5 sm:grid-cols-2">
            {[
              ["layers", "Built around your workflow", "Your business should not have to completely change just to fit generic software."],
              ["link", "One connected partner", "Websites, software, applications, integrations, deployment, and support can work together."],
              ["users", "Designed for real users", "Clear experiences for office teams, field employees, managers, drivers, and customers."],
              ["chart", "Ready to evolve", "Start with the highest-value solution and expand it as the company grows."],
            ].map(([icon, title, text]) => (
              <div key={title} className="rounded-2xl border border-[#dce7f2] bg-[#fbfdff] p-6"><span className="grid h-11 w-11 place-items-center rounded-xl bg-[#eaf3ff] text-[#1265df]"><Icon name={icon as "layers"} className="h-5 w-5" /></span><h3 className="mt-5 text-xl font-extrabold">{title}</h3><p className="mt-3 leading-7 text-[#607991]">{text}</p></div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-[#dce7f2] bg-[#f6f9fd] px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr] lg:items-center">
            <div><p className="text-sm font-extrabold uppercase tracking-[.22em] text-[#1265df]">Industries</p><h2 className="mt-4 text-3xl font-extrabold tracking-[-.035em] md:text-5xl">Built for companies that need more than off-the-shelf tools.</h2><p className="mt-5 leading-7 text-[#607991]">Every engagement begins with the business problem—not an industry template.</p></div>
            <div className="grid gap-3 sm:grid-cols-2">{industries.map((industry)=><div key={industry} className="flex items-center gap-3 rounded-xl border border-[#dce7f2] bg-white px-5 py-4 font-bold text-[#29455f]"><Icon name="check" className="h-5 w-5 text-[#1265df]" />{industry}</div>)}</div>
          </div>
        </div>
      </section>

      <MarketingCta />
      <Footer />
    </main>
  );
}
