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
    <section className="relative overflow-hidden border-b border-[#e1e9f1] bg-[#f8fafc] px-5 py-16 sm:px-6 md:py-20">
      <div className="hero-grid absolute inset-0 opacity-55" />
      <div className="absolute -right-36 -top-16 h-80 w-80 rounded-full bg-blue-100/70 blur-[100px]" />
      <div className="relative mx-auto max-w-7xl">
        <p className="text-xs font-black uppercase tracking-[.2em] text-[#176bff] sm:text-sm">{eyebrow}</p>
        <h1 className="mt-5 max-w-5xl text-balance text-[42px] font-black leading-[1] tracking-[-.05em] text-[#07182c] sm:text-5xl md:text-6xl lg:text-[68px]">
          {title}
        </h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-[#61768a] md:text-xl md:leading-9">{text}</p>
        {primaryLabel ? (
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href={primaryHref} className="button-primary">
              {primaryLabel}
              <Icon name="arrow" className="h-4 w-4" />
            </Link>
            {secondaryLabel && secondaryHref ? (
              <Link href={secondaryHref} className="button-secondary">
                {secondaryLabel}
              </Link>
            ) : null}
          </div>
        ) : null}
      </div>
    </section>
  );
}
