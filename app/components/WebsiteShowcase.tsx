import Image from "next/image";
import Link from "next/link";
import { Icon } from "./Icons";

export default function WebsiteShowcase({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`relative ${compact ? "min-h-[420px]" : "min-h-[560px]"}`}>
      <div className="absolute inset-x-4 top-10 h-[360px] rounded-full bg-blue-300/25 blur-[80px]" />

      <div className="absolute left-0 top-0 w-[90%] overflow-hidden rounded-[26px] border border-[#d9e6f2] bg-white shadow-[0_34px_90px_rgba(9,42,84,.22)]">
        <div className="flex h-10 items-center gap-2 border-b border-[#e4ebf3] bg-[#f7f9fc] px-4">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff6b6b]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#ffd166]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#4ecb71]" />
          <div className="ml-3 flex-1 rounded-md bg-white px-3 py-1 text-[9px] font-bold text-[#70849a]">nexdrainplumbing.net</div>
        </div>
        <div className="relative h-[335px] overflow-hidden bg-[#081d37]">
          <Image src="/portfolio/nexdrain/trucks.jpg" alt="NexDrain Plumbing trucks featured on the website" fill sizes="(max-width: 768px) 90vw, 620px" className="object-cover opacity-60" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,25,48,.97),rgba(5,25,48,.64),rgba(5,25,48,.28))]" />
          <div className="absolute inset-0 p-6 md:p-8">
            <Image src="/portfolio/nexdrain/logo.png" alt="NexDrain Plumbing" width={190} height={49} className="h-auto w-[160px] md:w-[190px]" />
            <p className="mt-8 max-w-sm text-[10px] font-black uppercase tracking-[.24em] text-[#ff8754]">Professional plumbing across DFW</p>
            <p className="mt-3 max-w-md text-2xl font-black leading-tight text-white md:text-4xl">Trusted plumbing help, built around the customer.</p>
            <p className="mt-4 max-w-sm text-xs leading-5 text-slate-200 md:text-sm">Clear services, real project proof, reviews, local pages, and fast ways to request help.</p>
            <div className="mt-6 inline-flex rounded-lg bg-[#f36f3d] px-4 py-2 text-[10px] font-black text-white">REQUEST SERVICE</div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 right-0 z-20 w-[42%] min-w-[175px] max-w-[230px] overflow-hidden rounded-[28px] border-[7px] border-[#07172b] bg-white shadow-[0_30px_70px_rgba(9,42,84,.28)]">
        <div className="relative h-[360px] bg-white">
          <div className="flex h-12 items-center justify-between bg-[#071d37] px-3">
            <Image src="/portfolio/nexdrain/logo.png" alt="" width={100} height={25} className="h-auto w-[92px]" />
            <span className="text-lg font-black text-white">☰</span>
          </div>
          <div className="relative h-40">
            <Image src="/portfolio/nexdrain/leak-detection.jpg" alt="Water leak detection service" fill sizes="230px" className="object-cover" />
            <div className="absolute inset-0 bg-[#071d37]/55" />
            <p className="absolute inset-x-4 bottom-4 text-lg font-black leading-tight text-white">Professional plumbing, one tap away.</p>
          </div>
          <div className="space-y-3 p-4">
            <div className="rounded-xl border border-[#e3e8ee] p-3"><p className="text-[9px] font-black uppercase tracking-wider text-[#f36f3d]">Fast contact</p><p className="mt-1 text-xs font-extrabold text-[#0b2746]">Call or request service</p></div>
            <div className="grid grid-cols-2 gap-2"><div className="rounded-lg bg-[#0b2746] p-3 text-[9px] font-black text-white">CALL NOW</div><div className="rounded-lg bg-[#f36f3d] p-3 text-[9px] font-black text-white">REQUEST</div></div>
          </div>
        </div>
      </div>

      <Link href="/work/nexdrain-plumbing" className="absolute bottom-5 left-4 z-30 hidden items-center gap-2 rounded-xl border border-white/60 bg-white/95 px-4 py-3 text-xs font-black text-[#0b2c52] shadow-lg backdrop-blur sm:inline-flex">
        View the NexDrain case study <Icon name="arrow" className="h-4 w-4 text-[#2563eb]" />
      </Link>
    </div>
  );
}
