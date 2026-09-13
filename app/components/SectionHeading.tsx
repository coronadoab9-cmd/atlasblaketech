export default function SectionHeading({
  eyebrow,
  title,
  text,
  align = "left",
  inverse = false,
}: {
  eyebrow: string;
  title: string;
  text?: string;
  align?: "left" | "center";
  inverse?: boolean;
}) {
  return (
    <div className={`${align === "center" ? "mx-auto text-center" : ""} max-w-3xl`}>
      <p className={`text-xs font-black uppercase tracking-[.2em] sm:text-sm ${inverse ? "text-blue-300" : "text-[#176bff]"}`}>
        {eyebrow}
      </p>
      <h2 className={`mt-4 text-balance text-3xl font-black leading-[1.08] tracking-[-.04em] sm:text-4xl md:text-5xl ${inverse ? "text-white" : "text-[#07182c]"}`}>
        {title}
      </h2>
      {text ? (
        <p className={`mt-5 text-lg leading-8 ${inverse ? "text-slate-300" : "text-[#667b90]"}`}>
          {text}
        </p>
      ) : null}
    </div>
  );
}
