import Link from "next/link";
import { Icon } from "./Icons";

export default function MarketingCta({
  eyebrow = "Your next step",
  title = "Your business deserves a website that reflects where you want it to go.",
  text = "Tell us what you are building, improving, or dreaming about. We will help turn it into a clear plan and a professional digital experience.",
}: {
  eyebrow?: string;
  title?: string;
  text?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-[linear-gradient(135deg,#0b132d,#0b3b83)] px-6 py-20 text-white md:py-24">
      <div className="hero-grid-dark absolute inset-0" />
      <div className="relative mx-auto flex max-w-7xl flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-3xl">
          <p className="text-sm font-black uppercase tracking-[.24em] text-blue-300">{eyebrow}</p>
          <h2 className="mt-5 text-balance text-4xl font-black leading-tight tracking-[-.04em] md:text-6xl">{title}</h2>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">{text}</p>
        </div>
        <div className="flex shrink-0 flex-col gap-3 sm:flex-row lg:flex-col">
          <Link href="/start-a-project" className="button-primary button-primary-light justify-center">
            Start Your Project
            <Icon name="arrow" className="h-5 w-5" />
          </Link>
          <Link href="/approach" className="button-dark-outline justify-center">
            How We Work
          </Link>
        </div>
      </div>
    </section>
  );
}