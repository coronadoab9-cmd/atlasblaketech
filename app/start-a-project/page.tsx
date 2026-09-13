import type { Metadata } from "next";
import ContactForm from "../components/ContactForm";
import Footer from "../components/Footer";
import { Icon } from "../components/Icons";
import Navbar from "../components/Navbar";
import PageHero from "../components/PageHero";

export const metadata: Metadata = {
  title: "Start a Project",
  description:
    "Tell AtlasBlake Technologies about your business, website goals, local growth needs, automation idea, portal, or custom technology project.",
  alternates: { canonical: "/start-a-project" },
};

export default function StartProjectPage() {
  return (
    <main>
      <Navbar />
      <PageHero
        eyebrow="Start a project"
        title="Start with the business goal."
        text="You do not need a technical specification. Tell us what your company does, what you want to improve, and what a successful result would look like."
      />

      <section className="bg-[#f7f9fc] px-5 py-16 sm:px-6 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[.68fr_1.32fr] lg:gap-14">
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <p className="text-xs font-black uppercase tracking-[.2em] text-[#176bff] sm:text-sm">What happens next</p>
            <h2 className="mt-4 text-3xl font-black tracking-[-.04em] sm:text-4xl">
              A focused conversation before a proposal.
            </h2>
            <p className="mt-5 leading-7 text-[#667b90]">
              AtlasBlake reviews the goal, identifies the important constraints, and follows up directly. If the project should be simplified or phased, that can be part of the conversation too.
            </p>

            <div className="mt-8 divide-y divide-[#e1e9f1] border-y border-[#e1e9f1]">
              <InfoRow icon="mail" title="Email" value="contact@atlasblaketech.com" />
              <InfoRow icon="map" title="Based in" value="Dallas-Fort Worth, Texas" />
              <InfoRow icon="clock" title="First step" value="Business goals, priorities, and fit" />
            </div>
          </aside>

          <ContactForm />
        </div>
      </section>

      <Footer />
    </main>
  );
}

function InfoRow({ icon, title, value }: { icon: "mail" | "map" | "clock"; title: string; value: string }) {
  return (
    <div className="flex gap-3 py-4">
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-[#edf4ff] text-[#176bff]">
        <Icon name={icon} className="h-4 w-4" />
      </span>
      <div>
        <p className="text-xs font-black uppercase tracking-[.14em] text-[#8393a3]">{title}</p>
        <p className="mt-1 text-sm font-extrabold text-[#29445f]">{value}</p>
      </div>
    </div>
  );
}
