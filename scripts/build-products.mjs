// Normaliza los JSON de colecciones de Shopify (killaclock.com.co) a src/data/products.json
// y descarga las imágenes a public/products/. Uso:
//   node scripts/build-products.mjs <dir-con-*.json>
// Los JSON se obtienen de https://www.killaclock.com.co/collections/<handle>/products.json?limit=24
import { readdirSync, readFileSync, writeFileSync, existsSync, mkdirSync } from "node:fs";
import { join, extname } from "node:path";

const srcDir = process.argv[2];
if (!srcDir) { console.error("uso: node scripts/build-products.mjs <dir>"); process.exit(1); }
const outDir = new URL("../public/products/", import.meta.url).pathname;
mkdirSync(outDir, { recursive: true });

const strip = (h = "") => h.replace(/\u00a0|&nbsp;/g, " ").replace(/<li>/g, "\n• ").replace(/<\/p>|<br\s*\/?>/g, "\n").replace(/<[^>]+>/g, "")
  .replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").replace(/\s*\n\s*/g, "\n").trim();
const titleCase = (t) => t.toLowerCase().replace(/(^|\s|-)([a-záéíóúñ])/g, (m) => m.toUpperCase())
  .replace(/\b([A-Z]{1,3}-?\d[\w-]*)\b/gi, (m) => m.toUpperCase()).replace(/\b(Prx|Pr|Nst|Tm|Gw)\b/g, (m) => m.toUpperCase()).replace(/\s+/g, " ").trim();

const byHandle = new Map();
for (const f of readdirSync(srcDir).filter((f) => f.endsWith(".json") && f !== "collections.json")) {
  let data; try { data = JSON.parse(readFileSync(join(srcDir, f), "utf8")); } catch { continue; }
  for (const p of data.products ?? []) {
    if (!p.images?.length || p.product_type !== "Relojes") continue;
    if (byHandle.has(p.handle)) continue;
    const v = p.variants[0];
    const tags = p.tags.map((t) => t.toLowerCase());
    const title = p.title.replace(/\s+/g, " ").trim();
    const gender = tags.some((t) => /para ella|mujer|dama/.test(t)) || /DAMA|MUJER|WILDFLOWER|LADY|MINI WONDERLUST|ALLARA|ICONIC DAMA/.test(title) ? "mujer"
      : tags.some((t) => /para el\b|hombre|men\b/.test(t)) || /HOMBRE/.test(title) ? "hombre" : "unisex";
    const text = strip(p.body_html);
    const specs = [...text.matchAll(/•\s*([^\n•]+)/g)].map((m) => m[1].trim().replace(/[:\s]+$/, ""))
      .filter((s) => s.length > 3 && s.length < 70 && !/año|mes|gener|no cubre|no aplica|uso inadecuado|garant/i.test(s));
    const wm = text.match(/garant[ií]a[\s\S]{0,40}?(\d+\s*(?:años?|meses)[^.:\n]*)/i);
    let warranty = wm ? wm[1].replace(/\s+(unicamente|únicamente)\b.*$/i, "").replace(/(\d+\s*(?:años?|meses))\s+y\s.*$/i, "$1").replace(/[,\s]+$/, "").trim() : null;
    if (warranty && warranty === warranty.toUpperCase()) warranty = warranty.toLowerCase();
    if (warranty) warranty = warranty.charAt(0).toUpperCase() + warranty.slice(1);
    const description = text.split("\n").find((l) => l.length > 60) ?? "";
    const images = [];
    p.images.slice(0, 3).forEach((img, i) => {
      const ext = extname(img.src.split("?")[0]).toLowerCase() || ".jpg";
      const file = `${p.handle}-${i + 1}${ext}`;
      if (existsSync(join(outDir, file))) images.push({ src: `/products/${file}`, width: img.width, height: img.height, remote: img.src });
    });
    if (!images.length) continue;
    byHandle.set(p.handle, {
      id: p.id, handle: p.handle, title: titleCase(title), rawTitle: title, vendor: p.vendor.toUpperCase().trim(),
      sku: v.sku || null, price: Math.round(parseFloat(v.price)),
      compareAtPrice: v.compare_at_price ? Math.round(parseFloat(v.compare_at_price)) : null,
      available: v.available, gender, description, specs, warranty, tags: p.tags, images,
      sourceUrl: `https://www.killaclock.com.co/products/${p.handle}`,
    });
  }
}
const products = [...byHandle.values()].filter((p) => !p.compareAtPrice || p.compareAtPrice > p.price || (p.compareAtPrice = null, true));
writeFileSync(new URL("../src/data/products.json", import.meta.url), JSON.stringify(products, null, 2));
console.log(`products: ${products.length}; brands: ${[...new Set(products.map((p) => p.vendor))].join(", ")}`);
