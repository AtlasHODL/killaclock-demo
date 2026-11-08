import Link from "next/link";
export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-7xl flex-col items-center px-4 py-32 text-center">
      <p className="text-xs uppercase tracking-[0.25em] text-gold">404</p>
      <h1 className="font-display mt-3 text-5xl">Esta página no existe</h1>
      <p className="mt-4 text-muted">Pero el catálogo sí. Vuelve al inicio o explora los relojes.</p>
      <Link href="/catalogo" className="mt-8 rounded-full bg-gold px-6 py-3 text-sm font-semibold text-ink">Ver catálogo</Link>
    </div>
  );
}
