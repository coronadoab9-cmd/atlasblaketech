import Link from "next/link";
import { Icon } from "./Icons";

export default function MarketingCta({
  eyebrow = "Your next step",
  title = "Build something your business can be proud to send people to.",
  text = "Start with the goal, the problem, or the idea. AtlasBlake will help turn it into a clear plan and a professional result.",
}: {
  eyebrow?: string;
  title?: string;
  text?: string;
}) {
  return (
    <section className="bg-[#0b1f33] px-5 py-16 text-white sm:px-6 md:py-20">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-3xl">
          <p className="text-xs font-black uppercase tracking-[.2em] text-blue-300 sm:text-sm">{eyebrow}</p>
          <h2 className="mt-4 text-balance text-3xl font-black leading-tight tracking-[-.04em] sm:text-4xl md:text-5xl">{title}</h2>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">{text}</p>
        </div>
        <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
          <Link href="/start-a-project" className="button-primary button-primary-light">
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
