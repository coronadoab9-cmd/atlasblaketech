import Link from "next/link";
import { Icon } from "./Icons";
import MarketingCta from "./MarketingCta";
import Navbar from "./Navbar";
import Footer from "./Footer";
import PageHero from "./PageHero";
import { services } from "../lib/marketing";

export default function ServiceDetailPage({ slug }: { slug: string }) {
  const service = services.find((item) => item.slug === slug);
  if (!service) return null;

  const related = services.filter((item) => item.slug !== slug).slice(0, 3);

  return (
    <main>
      <Navbar />
      <PageHero
        eyebrow={service.eyebrow}
        title={service.title}
        text={service.description}
        primaryLabel="Discuss Your Project"
        primaryHref="/start-a-project"
        secondaryLabel="View Our Work"
        secondaryHref="/work"
      />

      <section className="bg-white px-5 py-16 sm:px-6 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[.72fr_1.28fr] lg:items-start">
          <div>
            <p className="text-xs font-black uppercase tracking-[.2em] text-[#176bff] sm:text-sm">What the work can include</p>
            <h2 className="mt-4 text-balance text-3xl font-black tracking-[-.04em] sm:text-4xl md:text-5xl">
              Built around the result, not a generic feature list.
            </h2>
            <p className="mt-5 max-w-xl leading-7 text-[#667b90]">
              The final scope depends on the business, the people using it, the existing tools, and what needs to happen first.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {service.outcomes.map((outcome) => (
              <div key={outcome} className="flex gap-3 rounded-xl border border-[#e1e9f1] bg-[#fbfcfe] p-4 text-sm font-extrabold leading-6 text-[#29445f]">
                <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-[#176bff]" />
                {outcome}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-[#e1e9f1] bg-[#f7f9fc] px-5 py-16 sm:px-6 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-3">
          {[
            ["01", "Understand", "Start with the business goal, the users, and what currently gets in the way."],
            ["02", "Design", "Shape the pages, features, content, and workflows around the useful result."],
            ["03", "Launch", "Test carefully, launch professionally, and keep the solution dependable after release."],
          ].map(([number, title, text]) => (
            <article key={number} className="border-t-2 border-[#176bff] pt-5">
              <p className="text-xs font-black tracking-[.18em] text-[#176bff]">{number}</p>
              <h3 className="mt-4 text-xl font-black">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-[#667b90]">{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-white px-5 py-16 sm:px-6 md:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-[.2em] text-[#176bff] sm:text-sm">Related services</p>
              <h2 className="mt-4 text-3xl font-black tracking-[-.04em] sm:text-4xl">Build only what the business needs next.</h2>
            </div>
            <Link href="/services" className="text-sm font-black text-[#176bff]">View all services</Link>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {related.map((item) => (
              <Link key={item.slug} href={`/services/${item.slug}`} className="marketing-card group p-6">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#edf4ff] text-[#176bff]">
                  <Icon name={item.icon} className="h-5 w-5" />
                </span>
                <h3 className="mt-5 text-xl font-black">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-[#667b90]">{item.summary}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-black text-[#176bff]">
                  Explore
                  <Icon name="arrow" className="h-4 w-4 transition group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <MarketingCta />
      <Footer />
    </main>
  );
}
