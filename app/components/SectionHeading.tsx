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
      <p className={`mb-4 text-sm font-extrabold uppercase tracking-[0.24em] ${inverse ? "text-blue-300" : "text-[#2563eb]"}`}>
        {eyebrow}
      </p>
      <h2 className={`text-balance text-4xl font-extrabold leading-[1.08] tracking-[-0.045em] md:text-6xl ${inverse ? "text-white" : "text-[#071a33]"}`}>
        {title}
      </h2>
      {text ? (
        <p className={`mt-6 text-lg leading-8 md:text-xl ${inverse ? "text-slate-300" : "text-[#55708d]"}`}>
          {text}
        </p>
      ) : null}
    </div>
  );
}
