import { brand, whatsappUrl } from "@/data/brand";
import Reveal from "./Reveal";
import { WhatsAppIcon } from "./Icons";

export default function WhatsAppCta() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 md:py-28">
      <Reveal className="relative overflow-hidden rounded-[2.5rem] border border-gold/30 bg-[radial-gradient(120%_120%_at_50%_0%,rgba(212,175,55,0.25),var(--ink-2)_60%)] px-6 py-16 text-center sm:px-12 md:py-24 grain">
        <p className="text-xs uppercase tracking-[0.25em] text-gold">Asesoría personalizada</p>
        <h2 className="font-display mx-auto mt-4 max-w-3xl text-4xl leading-tight sm:text-6xl">¿No sabes cuál elegir? <em className="text-gold-gradient not-italic">Te ayudamos.</em></h2>
        <p className="mx-auto mt-5 max-w-xl text-muted">Escríbenos por WhatsApp, cuéntanos para quién es y tu presupuesto, y te enviamos opciones con fotos reales y disponibilidad al instante.</p>
        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a href={whatsappUrl("Hola Killaclock, quiero asesoría para elegir un reloj.")} target="_blank" rel="noopener" className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-7 py-3.5 text-sm font-semibold text-ink transition hover:brightness-110">
            <WhatsAppIcon /> Chatear por WhatsApp
          </a>
          <a href={`tel:${brand.phone}`} className="inline-flex items-center gap-2 rounded-full border border-line-strong px-7 py-3.5 text-sm text-text transition hover:border-gold hover:text-gold-2">Llamar al {brand.phone}</a>
        </div>
      </Reveal>
    </section>
  );
}
