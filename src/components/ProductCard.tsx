import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/lib/products";
import { discountPct, formatCOP } from "@/lib/format";

export default function ProductCard({ p, priority = false }: { p: Product; priority?: boolean }) {
  const pct = discountPct(p.price, p.compareAtPrice);
  const img = p.images[0];
  return (
    <Link href={`/producto/${p.handle}`} className="group block">
      <div className="card-paper relative aspect-[4/5] overflow-hidden rounded-2xl ring-1 ring-white/5 transition duration-500 group-hover:ring-gold/50 group-hover:shadow-[0_30px_60px_-30px_rgba(212,175,55,0.35)]">
        <Image src={img.src} alt={p.title} fill priority={priority} sizes="(min-width:1280px) 300px, (min-width:768px) 33vw, 50vw"
          className="object-contain p-6 transition duration-700 ease-out group-hover:scale-[1.06]" />
        <div className="absolute left-3 top-3 flex flex-col gap-1.5">
          {pct > 0 && <span className="rounded-full bg-ink px-2.5 py-1 text-[11px] font-semibold tracking-wide text-gold-2">-{pct}%</span>}
          {!p.available && <span className="rounded-full bg-zinc-700 px-2.5 py-1 text-[11px] font-medium text-white">Agotado</span>}
        </div>
        <span className="absolute bottom-3 right-3 translate-y-2 rounded-full bg-ink px-3 py-1.5 text-xs text-text opacity-0 transition group-hover:translate-y-0 group-hover:opacity-100">Ver detalle</span>
      </div>
      <div className="mt-4 space-y-1">
        <p className="text-[11px] uppercase tracking-[0.2em] text-gold">{p.vendor}</p>
        <h3 className="font-display text-lg leading-snug text-text line-clamp-2">{p.title}</h3>
        <p className="flex items-baseline gap-2 text-sm">
          <span className="font-semibold text-text">{formatCOP(p.price)}</span>
          {p.compareAtPrice && <span className="text-muted line-through">{formatCOP(p.compareAtPrice)}</span>}
        </p>
      </div>
    </Link>
  );
}
