import Hero from "@/components/Hero";
import BrandMarquee from "@/components/BrandMarquee";
import Featured from "@/components/Featured";
import About from "@/components/About";
import Trust from "@/components/Trust";
import Testimonials from "@/components/Testimonials";
import WhatsAppCta from "@/components/WhatsAppCta";
import Catalog from "@/components/Catalog";
import SectionHead from "@/components/SectionHead";
import Reveal from "@/components/Reveal";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { brands, featured, products } from "@/lib/products";

export default function Home() {
  const hero = featured.find((p) => p.vendor === "TECHNOMARINE") ?? featured[0];
  const picks = [...featured.filter((p) => p.handle !== hero.handle)].filter((p, i, a) => a.findIndex((x) => x.vendor === p.vendor) === i).slice(0, 3);
  return (
    <>
      <Hero product={hero} />
      <BrandMarquee />
      <Featured />
      <section id="catalogo" className="border-t border-line bg-ink-2/40">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 md:py-28">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHead kicker="Catálogo" title="Encuentra tu próximo reloj" text="Filtra por marca, por quién lo va a usar o por descuento. Todas las referencias son originales." />
            <Reveal delay={0.1}><Link href="/catalogo" className="inline-flex items-center gap-2 text-sm text-gold-2 hover:text-gold">Catálogo completo <ArrowRight className="h-4 w-4" /></Link></Reveal>
          </div>
          <div className="mt-12"><Catalog products={products} brands={brands} compact /></div>
        </div>
      </section>
      <About picks={picks.length >= 3 ? picks : featured.slice(1, 4)} />
      <Trust />
      <Testimonials />
      <WhatsAppCta />
    </>
  );
}
