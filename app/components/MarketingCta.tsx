import Link from "next/link";
import { Icon } from "./Icons";

export default function MarketingCta({
  eyebrow = "Start a project",
  title = "Have a process that should work better?",
  text = "Tell us what your business is trying to accomplish. We’ll help turn the problem into a practical website, application, automation, or custom software plan.",
}: {
  eyebrow?: string;
  title?: string;
  text?: string;
}) {
  return (
    <section className="bg-white px-6 py-24 md:py-32">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[36px] bg-[#071a33] px-7 py-16 text-center shadow-[0_32px_90px_rgba(7,26,51,0.22)] md:px-16 md:py-24">
        <div className="hero-grid-dark absolute inset-0 opacity-60" />
        <div className="absolute left-1/2 top-0 h-80 w-80 -translate-x-1/2 rounded-full bg-blue-500/30 blur-[100px]" />
        <div className="relative mx-auto max-w-4xl">
          <p className="mb-5 text-sm font-extrabold uppercase tracking-[0.24em] text-blue-300">{eyebrow}</p>
          <h2 className="text-balance text-4xl font-extrabold leading-[1.05] tracking-[-0.045em] text-white md:text-6xl">{title}</h2>
          <p className="mx-auto mt-7 max-w-3xl text-lg leading-8 text-slate-300 md:text-xl">{text}</p>
          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <Link href="/contact" className="button-primary button-primary-light">
              Start a Project<Icon name="arrow" className="h-5 w-5" />
            </Link>
            <a href="mailto:contact@atlasblaketech.com" className="button-dark-outline">
              contact@atlasblaketech.com
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
