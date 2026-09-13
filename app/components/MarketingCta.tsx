import Link from "next/link";
import { Icon } from "./Icons";

export default function MarketingCta({
  eyebrow = "Build smarter. Go further.",
  title = "Build something your business can be proud to send people to.",
  text = "Start with the goal, the problem, or the idea. AtlasBlake will help turn it into a clear plan and a professional result.",
}: {
  eyebrow?: string;
  title?: string;
  text?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-[#0A0F1E] px-5 py-16 text-white sm:px-6 md:py-20">
      <div className="hero-grid-dark absolute inset-0 opacity-70" />
      <div className="absolute -right-24 top-0 h-72 w-72 rounded-full bg-[#2563EB]/15 blur-[100px]" />
      <div className="relative mx-auto flex max-w-7xl flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[.2em] text-[#06B6EF] sm:text-sm">{eyebrow}</p>
          <h2 className="mt-4 text-balance text-3xl font-black leading-tight tracking-[-.04em] sm:text-4xl md:text-5xl">{title}</h2>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-[#CBD5E1]">{text}</p>
        </div>
        <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
          <Link href="/start-a-project" className="button-primary">
            Start a Project
            <Icon name="arrow" className="h-4 w-4" />
          </Link>
          <Link href="/work" className="button-dark-outline">
            See Our Work
          </Link>
        </div>
      </div>
    </section>
  );
}
