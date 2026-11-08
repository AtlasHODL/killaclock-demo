# Killaclock · Demo de rediseño web

Demo comercial de una nueva web para **Killaclock** (relojería en Barranquilla, sitio actual: [killaclock.com.co](https://www.killaclock.com.co/)). Sirve para mostrarle al cliente cómo se vería su tienda con un diseño premium, rápido y pensado para vender por WhatsApp.

**Demo en vivo:** https://killaclock-demo.vercel.app · Repo: https://github.com/AtlasHODL/killaclock-demo

## Qué incluye
- **Home**: hero con producto real, marcas, destacados, catálogo con filtros, nosotros, garantía/envíos/pagos, testimonios (ilustrativos), CTA de WhatsApp y footer con datos reales.
- **/catalogo**: todos los relojes con filtros por marca, género, descuento y disponibilidad, y ordenamiento por precio.
- **/producto/[handle]**: ficha con galería, precio y precio tachado, especificaciones, garantía y botón "Comprar por WhatsApp" con mensaje prellenado.
- Datos reales: productos, precios, fotos, logo, dirección, teléfono, correo y redes se tomaron del sitio actual (ver `scripts/build-products.mjs` y `src/data/brand.ts`). No se inventaron productos ni precios.

## Stack
Next.js 16 (App Router, Cache Components) · React 19 · Tailwind CSS 4 · framer-motion · lucide-react. Todo es estático: no hay base de datos ni variables de entorno.

## Cómo correrlo
```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

## Actualizar el catálogo
1. Descargar `https://www.killaclock.com.co/collections/<coleccion>/products.json?limit=24` a una carpeta (el sitio limita peticiones: espaciarlas ~60 s).
2. Descargar las imágenes a `public/products/<handle>-<n>.<ext>` (el script solo referencia las que existen).
3. `node scripts/build-products.mjs <carpeta>` regenera `src/data/products.json`.

## Supuestos del demo
- Los testimonios son texto de ejemplo, marcados como ilustrativos en la página.
- El WhatsApp usa el teléfono publicado en el sitio (300 243 0050).
- `robots.txt` bloquea indexación: es un demo, no el sitio del cliente.
