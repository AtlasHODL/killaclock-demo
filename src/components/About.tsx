import Image from "next/image";
import { brand } from "@/data/brand";
import type { Product } from "@/lib/products";
import Reveal from "./Reveal";
import SectionHead from "./SectionHead";

export default function About({ picks }: { picks: Product[] }) {
  return (
    <section id="nosotros" className="relative overflow-hidden border-y border-line bg-ink-2/50">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 py-20 sm:px-6 lg:grid-cols-12 lg:px-8 md:py-28">
        <div className="lg:col-span-5">
          <SectionHead kicker="Nosotros" title="Tu tienda #1 de relojería en Barranquilla" />
          <Reveal delay={0.1} className="mt-6 space-y-4 text-muted leading-relaxed">
            <p>Killaclock nació como tienda física de relojes, perfumes y lentes de sol de marcas originales. Hoy atendemos en dos centros comerciales de Barranquilla y enviamos a todo el país.</p>
            <p>Trabajamos solo con referencias originales y respaldamos cada compra con garantía de fábrica, asesoría personalizada y opciones de pago a cuotas.</p>
          </Reveal>
          <Reveal delay={0.2} className="mt-8 grid grid-cols-3 gap-4 border-t border-line pt-8">
            {[
              { n: `${brand.brands.length}+`, l: "marcas originales" },
              { n: `${brand.stores.length}`, l: "tiendas físicas" },
              { n: "100%", l: "envíos a Colombia" },
            ].map((s) => (
              <div key={s.l}><p className="font-display text-4xl text-gold-2">{s.n}</p><p className="mt-1 text-xs uppercase tracking-wider text-muted">{s.l}</p></div>
            ))}
          </Reveal>
        </div>
        <div className="grid grid-cols-3 gap-3 lg:col-span-7 sm:gap-4">
          {picks.slice(0, 3).map((p, i) => (
            <Reveal key={p.handle} delay={i * 0.1} className={`card-paper relative overflow-hidden rounded-3xl ring-1 ring-white/5 ${i === 1 ? "translate-y-8 aspect-[3/5]" : "aspect-[3/5]"}`}>
              <Image src={p.images[0].src} alt={p.title} fill sizes="(min-width:1024px) 20vw, 33vw" className="object-contain p-4 sm:p-6" />
              <p className="absolute bottom-3 left-3 right-3 truncate text-[10px] uppercase tracking-[0.2em] text-ink/70">{p.vendor}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
