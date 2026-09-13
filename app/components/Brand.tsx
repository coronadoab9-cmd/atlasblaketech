import Image from "next/image";
import Link from "next/link";

export default function Brand({ inverse = false }: { inverse?: boolean }) {
  return (
    <Link href="/" className="group flex items-center gap-3" aria-label="AtlasBlake Technologies home">
      <span className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg bg-[#07182c] ring-1 ring-black/5">
        <Image src="/brand-icon.png" alt="" fill sizes="40px" className="object-cover" priority />
      </span>
      <span className="leading-none">
        <span className={`block text-[15px] font-black tracking-[0.06em] ${inverse ? "text-white" : "text-[#07182c]"}`}>
          AtlasBlake
        </span>
        <span className={`mt-1.5 block text-[8px] font-extrabold tracking-[0.28em] ${inverse ? "text-blue-300" : "text-[#176bff]"}`}>
          TECHNOLOGIES
        </span>
      </span>
    </Link>
  );
}
