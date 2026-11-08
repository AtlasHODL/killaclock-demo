import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Mail } from "lucide-react";
import { brand } from "@/data/brand";
import { FacebookIcon, InstagramIcon, TikTokIcon, YouTubeIcon } from "./Icons";

export default function Footer() {
  return (
    <footer id="contacto" className="border-t border-line bg-ink-2">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 grid gap-10 md:grid-cols-12">
        <div className="md:col-span-5">
          <Image src="/brand/logo-white.png" alt={brand.legalName} width={620} height={196} className="h-10 w-auto" />
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted">{brand.description}</p>
          <div className="mt-6 flex gap-3">
            {[
              { href: brand.social.instagram, Icon: InstagramIcon, label: "Instagram" },
              { href: brand.social.facebook, Icon: FacebookIcon, label: "Facebook" },
              { href: brand.social.tiktok, Icon: TikTokIcon, label: "TikTok" },
              { href: brand.social.youtube, Icon: YouTubeIcon, label: "YouTube" },
            ].map(({ href, Icon, label }) => (
              <a key={label} href={href} target="_blank" rel="noopener" aria-label={label} className="rounded-full border border-line p-2.5 text-muted transition hover:border-gold hover:text-gold">
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
        <div className="md:col-span-3">
          <h3 className="text-xs uppercase tracking-[0.2em] text-gold">Tiendas</h3>
          <ul className="mt-4 space-y-4 text-sm">
            {brand.stores.map((s) => (
              <li key={s.name} className="flex gap-3 text-muted"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" /><span><span className="text-text">{s.name}</span><br />{s.detail}, {s.city}</span></li>
            ))}
          </ul>
        </div>
        <div className="md:col-span-4">
          <h3 className="text-xs uppercase tracking-[0.2em] text-gold">Contacto</h3>
          <ul className="mt-4 space-y-4 text-sm">
            <li className="flex gap-3 text-muted"><Phone className="mt-0.5 h-4 w-4 shrink-0 text-gold" /><a href={`tel:${brand.phone}`} className="hover:text-text">{brand.phone}</a></li>
            <li className="flex gap-3 text-muted"><Mail className="mt-0.5 h-4 w-4 shrink-0 text-gold" /><a href={`mailto:${brand.email}`} className="hover:text-text">{brand.email}</a></li>
          </ul>
          <nav className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted">
            <Link href="/catalogo" className="hover:text-text">Catálogo</Link>
            <Link href="/#confianza" className="hover:text-text">Garantía y envíos</Link>
            <Link href="/#nosotros" className="hover:text-text">Nosotros</Link>
          </nav>
        </div>
      </div>
      <div className="border-t border-line">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row gap-2 items-start sm:items-center justify-between text-xs text-muted">
          <p>© 2026 {brand.legalName} · {brand.city}</p>
          <p>Demo de rediseño · Productos, precios y datos de contacto tomados de <a href={brand.website} className="underline decoration-line underline-offset-4 hover:text-text" target="_blank" rel="noopener">killaclock.com.co</a></p>
        </div>
      </div>
    </footer>
  );
}
