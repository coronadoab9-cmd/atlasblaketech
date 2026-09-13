import Image from "next/image";
import Link from "next/link";

export default function Brand({ inverse = false }: { inverse?: boolean }) {
  return (
    <Link
      href="/"
      className="group inline-flex items-center gap-3.5"
      aria-label="AtlasBlake Technologies home"
    >
      <span className="relative h-11 w-11 shrink-0 sm:h-12 sm:w-12">
        <Image
          src="/brand-icon.png"
          alt=""
          fill
          sizes="48px"
          className="object-contain"
          priority
        />
      </span>

      <span className="leading-none">
        <span className="block text-[17px] font-black tracking-[0.035em] sm:text-[18px]">
          <span className={inverse ? "text-white" : "text-[#0A0F1E]"}>ATLAS</span>
          <span className="text-[#2563EB]">BLAKE</span>
        </span>
        <span
          className={`mt-1.5 block text-[8.5px] font-semibold tracking-[0.31em] sm:text-[9px] ${
            inverse ? "text-[#E5E7EB]" : "text-[#475569]"
          }`}
        >
          TECHNOLOGIES
        </span>
      </span>
    </Link>
  );
}
