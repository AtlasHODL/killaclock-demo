import type { Metadata } from "next";
import Catalog from "@/components/Catalog";
import SectionHead from "@/components/SectionHead";
import { brands, products } from "@/lib/products";

export const metadata: Metadata = { title: "Catálogo de relojes", description: "Relojes originales Invicta, Technomarine, Guess, Nautica y más, con envío a toda Colombia." };

export default function CatalogoPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 pb-24 pt-10 sm:px-6 lg:px-8 md:pt-16">
      <SectionHead kicker="Catálogo" title="Todos los relojes" text={`${products.length} referencias originales de ${brands.length} marcas, con precios tal como aparecen en la tienda.`} />
      <div className="mt-12"><Catalog products={products} brands={brands} /></div>
    </div>
  );
}
