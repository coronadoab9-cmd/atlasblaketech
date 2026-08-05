import Link from "next/link";
import { Icon } from "./Icons";

export default function PageHero({
  eyebrow,
  title,
  text,
  primaryLabel,
  primaryHref = "/start-a-project",
  secondaryLabel,
  secondaryHref,
}: {
  eyebrow: string;
  title: string;
  text: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}) {
  return (
    <section className="relative overflow-hidden border-b border-[#dce7f2] bg-[#f7faff] px-6 py-24 md:py-32">
      <div className="hero-grid absolute inset-0 opacity-60" />
      <div className="absolute -left-32 top-12 h-96 w-96 rounded-full bg-blue-200/50 blur-[110px]" />
      <div className="absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-cyan-100/70 blur-[110px]" />
      <div className="relative mx-auto max-w-7xl">
        <p className="mb-5 text-sm font-extrabold uppercase tracking-[0.25em] text-[#2563eb]">{eyebrow}</p>
        <h1 className="max-w-5xl text-balance text-5xl font-extrabold leading-[1.02] tracking-[-0.055em] text-[#071a33] md:text-7xl lg:text-[84px]">
          {title}
        </h1>
        <p className="mt-8 max-w-3xl text-lg leading-8 text-[#526f8e] md:text-xl md:leading-9">{text}</p>
        {primaryLabel ? (
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link href={primaryHref} className="button-primary">
              {primaryLabel}<Icon name="arrow" className="h-5 w-5" />
            </Link>
            {secondaryLabel && secondaryHref ? (
              <Link href={secondaryHref} className="button-secondary">
                {secondaryLabel}<Icon name="arrow" className="h-5 w-5" />
              </Link>
            ) : null}
          </div>
        ) : null}
      </div>
    </section>
  );
}
