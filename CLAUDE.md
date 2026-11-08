# CLAUDE.md

Demo de rediseño para Killaclock (relojería, Barranquilla). Es un sitio de muestra para venderle al cliente una web nueva; no es producción.

## Reglas
- **No inventar productos, precios ni datos de contacto.** Todo sale de killaclock.com.co. Si un dato no existe, se omite.
- Copy en español de Colombia, sin modismos. Tono premium y directo.
- Estética oscura (`--ink`) con acento dorado (`--gold`) y tarjetas de producto claras (`card-paper`) porque las fotos tienen fondo blanco. Tokens en `src/app/globals.css`.
- Todo estático: `cacheComponents` está activo; no usar `Date.now()`/`Math.random()` en server components ni `searchParams` (los filtros del catálogo son de cliente).
- Imágenes con `next/image` desde `public/`. Logo blanco: `public/brand/logo-white.png`.

## Estructura
- `src/app/` rutas: `/`, `/catalogo`, `/producto/[handle]`, `not-found`, `robots`.
- `src/components/` secciones y UI. `Reveal` envuelve animaciones de entrada (framer-motion).
- `src/data/products.json` catálogo generado; `src/data/brand.ts` datos del negocio.
- `scripts/build-products.mjs` normaliza los JSON de Shopify (ver README).

## Comandos
`npm run dev` · `npm run build` · `npm run lint` · `npx tsc --noEmit`

## Deploy
Vercel, proyecto `killaclock-demo`, rama `main` → producción.
