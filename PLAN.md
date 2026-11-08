# Plan — Demo web Killa Clock

Demo comercial (no producción) para mostrarle a Killa Clock (killaclock.com.co, Barranquilla) cómo se vería una web renovada.

## Stack
- Next.js 16 (App Router, `cacheComponents`) + TypeScript
- Tailwind CSS v4, framer-motion (animaciones), lucide-react (iconos)
- Datos estáticos en `src/data/` tomados de la tienda Shopify real (`/collections/*/products.json`), sin inventar productos ni precios
- Imágenes de producto y logo descargadas de su CDN a `public/` para que el demo no dependa del sitio actual
- Deploy en Vercel (proyecto `killaclock-demo`), repo público `AtlasHODL/killaclock-demo`

## Estructura
```
src/app/            layout, page (home), catalogo/, producto/[handle]/, not-found
src/components/     Header, Hero, BrandMarquee, FeaturedGrid, Catalog (filtros cliente), ProductCard,
                    About, Trust, Testimonials, WhatsAppCta, Footer, WhatsAppFloat
src/data/           products.json (catálogo real), brand.ts (contacto, redes, sedes)
src/lib/            format (COP), products helpers
scripts/            fetch-products.mjs (regenera products.json desde Shopify)
```

## Secciones (home)
Hero oscuro premium → marcas → destacados → catálogo con filtros (marca, género, precio) → nosotros → confianza (garantía, envíos, pagos Addi/Sistecredito/contraentrega) → testimonios → CTA WhatsApp → footer con datos reales.

## Datos reales usados
- Nombre, descripción, logo, dirección (CC Parque Alegra Local 1-64 y CC Buenavista 2 piso 3, Barranquilla), teléfono 3002430050,
  correo killaclockstore@gmail.com, Instagram/Facebook/TikTok/YouTube: extraídos del HTML de la home el 2026-11-08.
- Productos, precios, precios tachados y fotos: `collections/best-selling-collection/products.json` (y otras colecciones si el rate limit lo permite).

## Supuestos
- Los testimonios son texto ilustrativo marcado como "demo" (no hay reseñas públicas en el sitio actual).
- El WhatsApp CTA usa el teléfono publicado (3002430050); el número del widget actual no se pudo confirmar.
