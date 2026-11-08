import data from "@/data/products.json";

export type Product = {
  id: number; handle: string; title: string; rawTitle: string; vendor: string; sku: string | null;
  price: number; compareAtPrice: number | null; available: boolean;
  gender: "hombre" | "mujer" | "unisex"; description: string; specs: string[]; warranty: string | null;
  tags: string[]; images: { src: string; width: number; height: number; remote: string }[]; sourceUrl: string;
};

export const products = data as Product[];
export const brands = [...new Set(products.map((p) => p.vendor))].sort();
export const getProduct = (handle: string) => products.find((p) => p.handle === handle);
export const featured = products.filter((p) => p.available && p.compareAtPrice).slice(0, 8);
export const related = (p: Product, n = 4) =>
  [...products.filter((x) => x.handle !== p.handle && x.vendor === p.vendor), ...products.filter((x) => x.handle !== p.handle && x.vendor !== p.vendor)].slice(0, n);
export const priceRange = () => ({ min: Math.min(...products.map((p) => p.price)), max: Math.max(...products.map((p) => p.price)) });
