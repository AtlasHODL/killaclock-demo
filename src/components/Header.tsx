"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { brand, whatsappUrl } from "@/data/brand";
import { WhatsAppIcon } from "./Icons";

const nav = [
  { href: "/catalogo", label: "Catálogo" },
  { href: "/#marcas", label: "Marcas" },
  { href: "/#nosotros", label: "Nosotros" },
  { href: "/#confianza", label: "Garantía y envíos" },
  { href: "/#contacto", label: "Contacto" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 12);
    f(); addEventListener("scroll", f, { passive: true }); return () => removeEventListener("scroll", f);
  }, []);
  useEffect(() => { document.body.style.overflow = open ? "hidden" : ""; }, [open]);

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? "bg-ink/80 backdrop-blur-xl border-b border-line" : "bg-transparent"}`}>
      <div className="mx-auto flex h-16 md:h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" aria-label={`${brand.name} inicio`} className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <Image src="/brand/logo-white.png" alt={brand.legalName} width={620} height={196} priority className="h-8 md:h-10 w-auto" />
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-sm tracking-wide text-muted">
          {nav.map((n) => (
            <Link key={n.href} href={n.href} className="relative py-1 transition-colors hover:text-text after:absolute after:left-0 after:-bottom-0.5 after:h-px after:w-0 after:bg-gold after:transition-all hover:after:w-full">
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <a href={whatsappUrl("Hola Killaclock, quiero asesoría para elegir un reloj.")} target="_blank" rel="noopener" className="hidden sm:inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-4 py-2 text-sm font-medium text-gold-2 transition hover:bg-gold hover:text-ink">
            <WhatsAppIcon className="h-4 w-4" /> Escríbenos
          </a>
          <button onClick={() => setOpen(!open)} aria-label={open ? "Cerrar menú" : "Abrir menú"} aria-expanded={open} className="md:hidden rounded-full border border-line p-2 text-text">
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }} className="md:hidden fixed inset-x-0 top-16 bottom-0 z-40 border-t border-line bg-ink/95 backdrop-blur-xl">
            <nav className="flex flex-col px-6 py-6 text-lg">
              {nav.map((n, i) => (
                <motion.div key={n.href} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.04 * i }}>
                  <Link href={n.href} onClick={() => setOpen(false)} className="block border-b border-line py-4 text-text">{n.label}</Link>
                </motion.div>
              ))}
              <a href={whatsappUrl("Hola Killaclock, quiero asesoría para elegir un reloj.")} target="_blank" rel="noopener" className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-gold px-5 py-3 font-medium text-ink">
                <WhatsAppIcon /> Escríbenos por WhatsApp
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
