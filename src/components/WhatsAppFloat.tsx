import { whatsappUrl } from "@/data/brand";
import { WhatsAppIcon } from "./Icons";

export default function WhatsAppFloat() {
  return (
    <a href={whatsappUrl("Hola Killaclock, vi su página y quiero más información.")} target="_blank" rel="noopener" aria-label="Chatear por WhatsApp"
      className="fixed bottom-5 right-5 z-40 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_10px_30px_-5px_rgba(37,211,102,0.6)] transition hover:scale-105 active:scale-95">
      <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-40 animate-ping [animation-duration:2.2s]" />
      <WhatsAppIcon className="relative h-7 w-7" />
    </a>
  );
}
