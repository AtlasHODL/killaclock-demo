import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { featured } from "@/lib/products";
import ProductCard from "./ProductCard";
import Reveal from "./Reveal";
import SectionHead from "./SectionHead";

export default function Featured() {
  return (
    <section id="destacados" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 md:py-28">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <SectionHead kicker="Selección" title="Piezas destacadas" text="Referencias con precio especial, listas para envío inmediato. Cada reloj es original y cuenta con garantía." />
        <Reveal delay={0.1}><Link href="/catalogo" className="inline-flex items-center gap-2 text-sm text-gold-2 hover:text-gold">Ver todo el catálogo <ArrowRight className="h-4 w-4" /></Link></Reveal>
      </div>
      <ul className="mt-12 grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-3 lg:grid-cols-4">
        {featured.map((p, i) => (
          <Reveal as="li" key={p.handle} delay={(i % 4) * 0.06}><ProductCard p={p} priority={i < 2} /></Reveal>
        ))}
      </ul>
    </section>
  );
}
