import { ShieldCheck, Truck, CreditCard, Store } from "lucide-react";
import { brand } from "@/data/brand";
import Reveal from "./Reveal";
import SectionHead from "./SectionHead";

const items = [
  { Icon: ShieldCheck, t: "Garantía de fábrica", d: "Relojes 100% originales con garantía por defectos de fabricación, según la marca (hasta 3 años en maquinaria en algunas referencias)." },
  { Icon: Truck, t: "Envíos a toda Colombia", d: "Despachamos a cualquier ciudad del país. Pago contra entrega disponible para que pagues cuando recibas tu reloj." },
  { Icon: CreditCard, t: "Paga a tu manera", d: `Cuotas con ${brand.payments[0]} y ${brand.payments[1]}, tarjetas débito y crédito, o pago contra entrega.` },
  { Icon: Store, t: "Tiendas físicas", d: `${brand.stores.map((s) => `${s.name} (${s.detail})`).join(" y ")}, en Barranquilla. Ven, pruébatelo y llévatelo.` },
];

export default function Trust() {
  return (
    <section id="confianza" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 md:py-28">
      <SectionHead align="center" kicker="Compra con confianza" title="Respaldo real, en cada compra" />
      <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((it, i) => (
          <Reveal as="li" key={it.t} delay={i * 0.08} className="group relative overflow-hidden rounded-3xl border border-line bg-ink-2 p-7 transition hover:border-gold/40">
            <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gold/10 blur-2xl transition group-hover:bg-gold/20" />
            <it.Icon className="h-7 w-7 text-gold" strokeWidth={1.5} />
            <h3 className="font-display mt-5 text-2xl">{it.t}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">{it.d}</p>
          </Reveal>
        ))}
      </ul>
      <Reveal delay={0.2} className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs uppercase tracking-[0.2em] text-muted">
        {brand.payments.map((p) => <span key={p} className="flex items-center gap-2"><span className="h-1 w-1 rounded-full bg-gold" />{p}</span>)}
      </Reveal>
    </section>
  );
}
