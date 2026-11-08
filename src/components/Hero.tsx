"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Truck, Store } from "lucide-react";
import { brand, whatsappUrl } from "@/data/brand";
import type { Product } from "@/lib/products";
import { formatCOP } from "@/lib/format";
import { WhatsAppIcon } from "./Icons";

const ease = [0.22, 1, 0.36, 1] as const;

export default function Hero({ product }: { product: Product }) {
  return (
    <section className="relative isolate overflow-hidden grain">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-40 left-1/2 h-[700px] w-[900px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(212,175,55,0.22),transparent_70%)] blur-2xl" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent,var(--ink))]" />
        <div className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(var(--line-strong)_1px,transparent_1px),linear-gradient(90deg,var(--line-strong)_1px,transparent_1px)] [background-size:64px_64px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
      </div>

      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 pb-20 pt-10 sm:px-6 md:grid-cols-12 md:pb-28 md:pt-16 lg:px-8">
        <div className="md:col-span-7">
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease }} className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/5 px-3 py-1 text-xs tracking-[0.2em] uppercase text-gold-2">
            <span className="h-1.5 w-1.5 rounded-full bg-crown animate-tick" /> Relojería &amp; Outfit Store · Barranquilla
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1, ease }} className="font-display mt-6 text-5xl leading-[0.98] sm:text-6xl lg:text-7xl xl:text-[5.5rem]">
            El tiempo se lleva <br className="hidden sm:block" />
            <em className="text-gold-gradient not-italic">con carácter.</em>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2, ease }} className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            Relojes originales de Invicta, Technomarine, Tissot, Guess, Casio y más de diez marcas, con garantía, envíos a toda Colombia y pago contra entrega. Tienda física en Barranquilla.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3, ease }} className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link href="/catalogo" className="group inline-flex items-center justify-center gap-2 rounded-full bg-gold px-6 py-3.5 text-sm font-semibold text-ink transition hover:bg-gold-2">
              Ver catálogo <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
            </Link>
            <a href={whatsappUrl("Hola Killaclock, quiero asesoría para elegir un reloj.")} target="_blank" rel="noopener" className="inline-flex items-center justify-center gap-2 rounded-full border border-line-strong px-6 py-3.5 text-sm font-medium text-text transition hover:border-gold hover:text-gold-2">
              <WhatsAppIcon className="h-4 w-4" /> Asesoría por WhatsApp
            </a>
          </motion.div>
          <motion.ul initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.5 }} className="mt-12 grid grid-cols-3 gap-4 border-t border-line pt-6 text-xs text-muted sm:text-sm">
            <li className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-gold" /> Marcas originales</li>
            <li className="flex items-center gap-2"><Truck className="h-4 w-4 text-gold" /> Envíos a toda Colombia</li>
            <li className="flex items-center gap-2"><Store className="h-4 w-4 text-gold" /> {brand.stores.length} tiendas en Barranquilla</li>
          </motion.ul>
        </div>

        <motion.div initial={{ opacity: 0, scale: 0.94, y: 30 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 1, delay: 0.25, ease }} className="relative md:col-span-5">
          <Link href={`/producto/${product.handle}`} className="group relative block">
            <div className="card-paper ring-gold relative aspect-[4/5] overflow-hidden rounded-[2rem]">
              <Image src={product.images[0].src} alt={product.title} fill priority sizes="(min-width:768px) 40vw, 90vw" className="object-contain p-8 transition duration-700 group-hover:scale-105" />
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-6 text-white">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.2em] text-gold-2">{product.vendor}</p>
                  <p className="font-display text-xl leading-tight">{product.title}</p>
                </div>
                <p className="text-right text-sm">
                  <span className="block font-semibold">{formatCOP(product.price)}</span>
                  {product.compareAtPrice && <span className="text-white/60 line-through">{formatCOP(product.compareAtPrice)}</span>}
                </p>
              </div>
            </div>
            <motion.div animate={{ y: [0, -8, 0] }} transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }} className="absolute -left-4 top-8 hidden rounded-2xl border border-line bg-ink-2/90 px-4 py-3 text-xs shadow-2xl backdrop-blur md:block">
              <p className="text-muted">Garantía</p>
              <p className="mt-0.5 font-medium text-text">{product.warranty ?? "Según marca"}</p>
            </motion.div>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
