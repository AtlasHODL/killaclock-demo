"use client";
import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Product } from "@/lib/products";

export default function ProductGallery({ p }: { p: Product }) {
  const [i, setI] = useState(0);
  const img = p.images[i];
  return (
    <div className="space-y-3">
      <div className="card-paper relative aspect-square overflow-hidden rounded-3xl ring-1 ring-white/5 sm:aspect-[4/5]">
        <AnimatePresence mode="wait">
          <motion.div key={img.src} initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }} className="absolute inset-0">
            <Image src={img.src} alt={`${p.title} · foto ${i + 1}`} fill priority sizes="(min-width:1024px) 45vw, 95vw" className="object-contain p-8" />
          </motion.div>
        </AnimatePresence>
      </div>
      {p.images.length > 1 && (
        <div className="flex gap-3">
          {p.images.map((im, j) => (
            <button key={im.src} onClick={() => setI(j)} aria-label={`Ver foto ${j + 1}`} className={`card-paper relative h-20 w-20 overflow-hidden rounded-xl ring-1 transition ${i === j ? "ring-gold" : "ring-white/10 opacity-70 hover:opacity-100"}`}>
              <Image src={im.src} alt="" fill sizes="80px" className="object-contain p-2" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
