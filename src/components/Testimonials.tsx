import { Star } from "lucide-react";
import Reveal from "./Reveal";
import SectionHead from "./SectionHead";

// Testimonios ilustrativos para el demo (el sitio actual no publica reseñas); se reemplazan por reseñas reales del cliente.
const quotes = [
  { q: "Compré un Invicta Pro Diver por WhatsApp y me llegó a Bogotá en dos días. Original, con su caja y garantía.", n: "Cliente en Bogotá", c: "Ejemplo ilustrativo" },
  { q: "Me asesoraron en la tienda de Parque Alegra hasta encontrar el Technomarine que buscaba. Excelente atención.", n: "Cliente en Barranquilla", c: "Ejemplo ilustrativo" },
  { q: "Pagué a cuotas con Addi sin complicaciones. El reloj es tal cual las fotos.", n: "Cliente en Medellín", c: "Ejemplo ilustrativo" },
];

export default function Testimonials() {
  return (
    <section className="border-y border-line bg-ink-2/50">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 md:py-28">
        <SectionHead kicker="Clientes" title="Lo que dicen de Killaclock" text="Espacio para reseñas reales de Google, Instagram o WhatsApp. Los textos de esta sección son ilustrativos para el demo." />
        <ul className="mt-12 grid gap-5 md:grid-cols-3">
          {quotes.map((t, i) => (
            <Reveal as="li" key={t.n} delay={i * 0.08} className="flex flex-col justify-between rounded-3xl border border-line bg-ink p-7">
              <div>
                <div className="flex gap-1 text-gold">{Array.from({ length: 5 }).map((_, j) => <Star key={j} className="h-4 w-4 fill-current" />)}</div>
                <p className="font-display mt-5 text-xl leading-relaxed text-text">“{t.q}”</p>
              </div>
              <p className="mt-6 text-sm text-muted">{t.n} <span className="text-muted/60">· {t.c}</span></p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
