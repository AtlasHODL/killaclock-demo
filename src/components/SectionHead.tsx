import Reveal from "./Reveal";

export default function SectionHead({ kicker, title, text, align = "left" }: { kicker: string; title: string; text?: string; align?: "left" | "center" }) {
  return (
    <Reveal className={`max-w-2xl ${align === "center" ? "mx-auto text-center" : ""}`}>
      <p className="text-xs uppercase tracking-[0.25em] text-gold">{kicker}</p>
      <h2 className="font-display mt-3 text-4xl leading-tight sm:text-5xl">{title}</h2>
      {text && <p className="mt-4 text-muted leading-relaxed">{text}</p>}
    </Reveal>
  );
}
