import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, ShieldCheck, Truck, CreditCard, Check } from "lucide-react";
import { getProduct, products, related } from "@/lib/products";
import { discountPct, formatCOP } from "@/lib/format";
import { brand, whatsappUrl } from "@/data/brand";
import ProductGallery from "@/components/ProductGallery";
import ProductCard from "@/components/ProductCard";
import Reveal from "@/components/Reveal";
import { WhatsAppIcon } from "@/components/Icons";

export function generateStaticParams() { return products.map((p) => ({ handle: p.handle })); }

export async function generateMetadata({ params }: { params: Promise<{ handle: string }> }): Promise<Metadata> {
  const p = getProduct((await params).handle);
  if (!p) return {};
  return { title: p.title, description: p.description || `${p.title} · ${formatCOP(p.price)} · ${brand.name}`, openGraph: { images: [p.images[0].src] } };
}

export default async function ProductPage({ params }: { params: Promise<{ handle: string }> }) {
  const p = getProduct((await params).handle);
  if (!p) notFound();
  const pct = discountPct(p.price, p.compareAtPrice);
  const wa = whatsappUrl(`Hola Killaclock, me interesa el ${p.rawTitle}${p.sku ? ` (ref. ${p.sku})` : ""} que vi en ${formatCOP(p.price)}. ¿Está disponible?`);

  return (
    <article className="mx-auto max-w-7xl px-4 pb-24 pt-6 sm:px-6 lg:px-8 md:pt-10">
      <nav aria-label="Ruta" className="flex items-center gap-1.5 text-xs text-muted">
        <Link href="/" className="hover:text-text">Inicio</Link><ChevronRight className="h-3 w-3" />
        <Link href="/catalogo" className="hover:text-text">Catálogo</Link><ChevronRight className="h-3 w-3" />
        <span className="text-text">{p.vendor}</span>
      </nav>

      <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-6"><ProductGallery p={p} /></div>
        <div className="lg:col-span-6">
          <p className="text-xs uppercase tracking-[0.25em] text-gold">{p.vendor}{p.sku && <span className="text-muted"> · Ref. {p.sku}</span>}</p>
          <h1 className="font-display mt-3 text-4xl leading-tight sm:text-5xl">{p.title}</h1>
          <div className="mt-6 flex flex-wrap items-end gap-3">
            <p className="text-3xl font-semibold">{formatCOP(p.price)}</p>
            {p.compareAtPrice && <p className="pb-1 text-lg text-muted line-through">{formatCOP(p.compareAtPrice)}</p>}
            {pct > 0 && <span className="mb-1.5 rounded-full bg-gold/15 px-2.5 py-1 text-xs font-semibold text-gold-2">Ahorras {pct}%</span>}
          </div>
          <p className={`mt-3 inline-flex items-center gap-2 text-sm ${p.available ? "text-emerald-400" : "text-zinc-400"}`}>
            <span className={`h-2 w-2 rounded-full ${p.available ? "bg-emerald-400" : "bg-zinc-500"}`} />{p.available ? "Disponible para envío inmediato" : "Agotado por ahora · consulta disponibilidad"}
          </p>
          {p.description && <p className="mt-6 leading-relaxed text-muted">{p.description}</p>}

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href={wa} target="_blank" rel="noopener" className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3.5 text-sm font-semibold text-ink transition hover:brightness-110">
              <WhatsAppIcon /> {p.available ? "Comprar por WhatsApp" : "Consultar disponibilidad"}
            </a>
            <a href={`tel:${brand.phone}`} className="inline-flex items-center justify-center rounded-full border border-line-strong px-6 py-3.5 text-sm text-text transition hover:border-gold hover:text-gold-2">Llamar</a>
          </div>
          <p className="mt-3 text-xs text-muted">Paga a cuotas con {brand.payments[0]} o {brand.payments[1]}, o contra entrega.</p>

          {p.specs.length > 0 && (
            <div className="mt-10 border-t border-line pt-8">
              <h2 className="text-xs uppercase tracking-[0.2em] text-gold">Especificaciones</h2>
              <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
                {p.specs.map((s) => <li key={s} className="flex items-start gap-2.5 text-sm text-muted"><Check className="mt-0.5 h-4 w-4 shrink-0 text-gold" />{s}</li>)}
              </ul>
            </div>
          )}

          <ul className="mt-10 grid gap-3 border-t border-line pt-8 text-sm sm:grid-cols-3">
            <li className="flex items-center gap-2.5 text-muted"><ShieldCheck className="h-5 w-5 text-gold" strokeWidth={1.5} />{p.warranty ? `Garantía: ${p.warranty}` : "Garantía de fábrica"}</li>
            <li className="flex items-center gap-2.5 text-muted"><Truck className="h-5 w-5 text-gold" strokeWidth={1.5} />Envío a toda Colombia</li>
            <li className="flex items-center gap-2.5 text-muted"><CreditCard className="h-5 w-5 text-gold" strokeWidth={1.5} />Pago contra entrega</li>
          </ul>
        </div>
      </div>

      <section className="mt-24">
        <Reveal><p className="text-xs uppercase tracking-[0.25em] text-gold">También te puede gustar</p><h2 className="font-display mt-3 text-3xl sm:text-4xl">Más relojes {p.vendor.charAt(0) + p.vendor.slice(1).toLowerCase()} y otros</h2></Reveal>
        <ul className="mt-10 grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-4">
          {related(p).map((r, i) => <Reveal as="li" key={r.handle} delay={i * 0.06}><ProductCard p={r} /></Reveal>)}
        </ul>
      </section>
    </article>
  );
}
