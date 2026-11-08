import { brand } from "@/data/brand";

export default function BrandMarquee() {
  const items = [...brand.brands, ...brand.brands];
  return (
    <section id="marcas" aria-label="Marcas" className="border-y border-line bg-ink-2/60 py-6 overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]">
      <div className="flex w-max animate-marquee gap-12 whitespace-nowrap">
        {items.map((b, i) => (
          <span key={i} className="font-display text-2xl tracking-wide text-muted/80 sm:text-3xl">
            {b} <span className="ml-12 text-gold/60">·</span>
          </span>
        ))}
      </div>
    </section>
  );
}
