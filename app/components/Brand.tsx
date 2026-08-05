import Image from "next/image";
import Link from "next/link";

export default function Brand({ inverse = false }: { inverse?: boolean }) {
  return (
    <Link href="/" className="group flex items-center gap-3" aria-label="AtlasBlake Technologies home">
      <span className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl bg-[#06172d] shadow-[0_10px_28px_rgba(8,24,48,.22)] ring-1 ring-white/10">
        <Image src="/brand-icon.png" alt="" fill sizes="48px" className="object-cover" priority />
      </span>
      <span className="leading-none">
        <span className={`block text-[15px] font-black tracking-[0.12em] ${inverse ? "text-white" : "text-[#081a33]"}`}>
          ATLASBLAKE
        </span>
        <span className={`mt-1.5 block text-[9px] font-extrabold tracking-[0.29em] ${inverse ? "text-blue-300" : "text-[#2563eb]"}`}>
          TECHNOLOGIES
        </span>
      </span>
    </Link>
  );
}
