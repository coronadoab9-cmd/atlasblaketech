import Image from "next/image";
import Link from "next/link";

export default function Brand({ inverse = false }: { inverse?: boolean }) {
  if (inverse) {
    return (
      <Link href="/" className="group block" aria-label="AtlasBlake Technologies home">
        <Image
          src="/logo.png"
          alt="AtlasBlake Technologies"
          width={1400}
          height={420}
          priority
          className="h-auto w-[170px] object-contain sm:w-[188px]"
        />
      </Link>
    );
  }

  return (
    <Link href="/" className="group flex items-center gap-3" aria-label="AtlasBlake Technologies home">
      <span className="relative h-10 w-10 shrink-0">
        <Image src="/brand-icon.png" alt="" fill sizes="40px" className="object-contain" priority />
      </span>
      <span className="leading-none">
        <span className="block text-[15px] font-black tracking-[0.035em]">
          <span className="text-[#0A0F1E]">ATLAS</span>
          <span className="text-[#2563EB]">BLAKE</span>
        </span>
        <span className="mt-1.5 block text-[8px] font-semibold tracking-[0.31em] text-[#475569]">
          TECHNOLOGIES
        </span>
      </span>
    </Link>
  );
}
