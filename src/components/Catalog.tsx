"use client";
import { useMemo, useState } from "react";
import { AnimatePresence, motion, LayoutGroup } from "framer-motion";
import { SlidersHorizontal, X } from "lucide-react";
import type { Product } from "@/lib/products";
import { formatCOP } from "@/lib/format";
import ProductCard from "./ProductCard";

type Gender = "todos" | "hombre" | "mujer";
type Sort = "relevancia" | "precio-asc" | "precio-desc" | "descuento";

const label = (s: string) => s.charAt(0) + s.slice(1).toLowerCase();

export default function Catalog({ products, brands, compact = false }: { products: Product[]; brands: string[]; compact?: boolean }) {
  const [brand, setBrand] = useState<string>("todas");
  const [gender, setGender] = useState<Gender>("todos");
  const [sort, setSort] = useState<Sort>("relevancia");
  const [onlyOffer, setOnlyOffer] = useState(false);
  const [onlyStock, setOnlyStock] = useState(false);
  const [open, setOpen] = useState(false);

  const list = useMemo(() => {
    let l = products.filter((p) => (brand === "todas" || p.vendor === brand) && (gender === "todos" || p.gender === gender || p.gender === "unisex"));
    if (onlyOffer) l = l.filter((p) => p.compareAtPrice);
    if (onlyStock) l = l.filter((p) => p.available);
    if (sort === "precio-asc") l = [...l].sort((a, b) => a.price - b.price);
    if (sort === "precio-desc") l = [...l].sort((a, b) => b.price - a.price);
    if (sort === "descuento") l = [...l].sort((a, b) => ((b.compareAtPrice ?? b.price) - b.price) - ((a.compareAtPrice ?? a.price) - a.price));
    return compact ? l.slice(0, 8) : l;
  }, [products, brand, gender, sort, onlyOffer, onlyStock, compact]);

  const active = (brand !== "todas" ? 1 : 0) + (gender !== "todos" ? 1 : 0) + (onlyOffer ? 1 : 0) + (onlyStock ? 1 : 0);
  const reset = () => { setBrand("todas"); setGender("todos"); setOnlyOffer(false); setOnlyStock(false); setSort("relevancia"); };

  const Filters = (
    <div className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-gold">Marca</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {["todas", ...brands].map((b) => (
            <button key={b} onClick={() => setBrand(b)} className={`rounded-full border px-3.5 py-1.5 text-xs transition ${brand === b ? "border-gold bg-gold text-ink font-semibold" : "border-line text-muted hover:border-line-strong hover:text-text"}`}>
              {b === "todas" ? "Todas" : label(b)}
            </button>
          ))}
        </div>
      </div>
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-gold">Para</p>
        <div className="mt-3 flex gap-2">
          {(["todos", "hombre", "mujer"] as Gender[]).map((g) => (
            <button key={g} onClick={() => setGender(g)} className={`rounded-full border px-3.5 py-1.5 text-xs transition ${gender === g ? "border-gold bg-gold text-ink font-semibold" : "border-line text-muted hover:border-line-strong hover:text-text"}`}>
              {g === "todos" ? "Todos" : g === "hombre" ? "Él" : "Ella"}
            </button>
          ))}
        </div>
      </div>
      <div className="space-y-3 text-sm">
        <label className="flex cursor-pointer items-center gap-3 text-muted hover:text-text"><input type="checkbox" checked={onlyOffer} onChange={(e) => setOnlyOffer(e.target.checked)} className="h-4 w-4 accent-[var(--gold)]" /> Solo con descuento</label>
        <label className="flex cursor-pointer items-center gap-3 text-muted hover:text-text"><input type="checkbox" checked={onlyStock} onChange={(e) => setOnlyStock(e.target.checked)} className="h-4 w-4 accent-[var(--gold)]" /> Solo disponibles</label>
      </div>
      {active > 0 && <button onClick={reset} className="text-xs text-gold-2 underline underline-offset-4">Limpiar filtros</button>}
    </div>
  );

  return (
    <div className="grid gap-10 lg:grid-cols-12">
      <aside className="hidden lg:block lg:col-span-3"><div className="sticky top-28">{Filters}</div></aside>
      <div className="lg:col-span-9">
        <div className="flex items-center justify-between gap-4 border-b border-line pb-4">
          <p className="text-sm text-muted"><span className="text-text font-medium">{list.length}</span> {list.length === 1 ? "reloj" : "relojes"}</p>
          <div className="flex items-center gap-2">
            <button onClick={() => setOpen(true)} className="inline-flex items-center gap-2 rounded-full border border-line px-3.5 py-2 text-xs text-text lg:hidden">
              <SlidersHorizontal className="h-3.5 w-3.5" /> Filtros {active > 0 && <span className="rounded-full bg-gold px-1.5 text-[10px] font-semibold text-ink">{active}</span>}
            </button>
            <select value={sort} onChange={(e) => setSort(e.target.value as Sort)} aria-label="Ordenar" className="rounded-full border border-line bg-ink-2 px-3.5 py-2 text-xs text-text outline-none focus:border-gold">
              <option value="relevancia">Relevancia</option>
              <option value="descuento">Mayor descuento</option>
              <option value="precio-asc">Precio: menor a mayor</option>
              <option value="precio-desc">Precio: mayor a menor</option>
            </select>
          </div>
        </div>
        <LayoutGroup>
          <motion.ul layout className="mt-8 grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {list.map((p) => (
                <motion.li layout key={p.handle} initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.96 }} transition={{ duration: 0.3 }}>
                  <ProductCard p={p} />
                </motion.li>
              ))}
            </AnimatePresence>
          </motion.ul>
        </LayoutGroup>
        {list.length === 0 && (
          <div className="py-24 text-center text-muted">
            <p>No hay relojes con esos filtros.</p>
            <button onClick={reset} className="mt-3 text-gold-2 underline underline-offset-4">Limpiar filtros</button>
          </div>
        )}
        {list.length > 0 && <p className="mt-10 text-xs text-muted">Precios en pesos colombianos (COP), desde {formatCOP(Math.min(...list.map((p) => p.price)))}.</p>}
      </div>

      <AnimatePresence>
        {open && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(false)} className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm lg:hidden" />
            <motion.div initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }} transition={{ type: "spring", damping: 28, stiffness: 260 }} className="fixed inset-x-0 bottom-0 z-50 max-h-[85dvh] overflow-y-auto rounded-t-3xl border-t border-line bg-ink-2 p-6 pb-10 lg:hidden">
              <div className="mb-6 flex items-center justify-between"><p className="font-display text-2xl">Filtros</p><button onClick={() => setOpen(false)} aria-label="Cerrar" className="rounded-full border border-line p-2"><X className="h-4 w-4" /></button></div>
              {Filters}
              <button onClick={() => setOpen(false)} className="mt-8 w-full rounded-full bg-gold py-3 text-sm font-semibold text-ink">Ver {list.length} relojes</button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
