import Link from "next/link";

export default function Brand({ inverse = false }: { inverse?: boolean }) {
  return (
    <Link href="/" className="group flex items-center gap-3" aria-label="AtlasBlake Technologies home">
      <span className="relative grid h-11 w-11 shrink-0 place-items-center overflow-hidden rounded-xl bg-[linear-gradient(145deg,#0b2b5c,#0d6efd)] shadow-[0_8px_24px_rgba(13,110,253,0.28)]">
        <span className="absolute inset-[1px] rounded-[11px] border border-white/20" />
        <span className="relative text-[13px] font-black tracking-[-0.12em] text-white">AB</span>
      </span>
      <span className="leading-none">
        <span className={`block text-[15px] font-extrabold tracking-[0.16em] ${inverse ? "text-white" : "text-[#081a33]"}`}>
          ATLASBLAKE
        </span>
        <span className={`mt-1 block text-[9px] font-semibold tracking-[0.34em] ${inverse ? "text-blue-200" : "text-[#53708f]"}`}>
          TECHNOLOGIES
        </span>
      </span>
    </Link>
  );
}
