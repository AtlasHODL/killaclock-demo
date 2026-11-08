// Datos reales tomados de https://www.killaclock.com.co/ (HTML de la home, 2026-11-08)
export const brand = {
  name: "Killaclock",
  legalName: "KILLACLOCK STORE",
  tagline: "Relojería & Outfit Store",
  description:
    "Tienda física de relojes, perfumes y lentes de sol de marcas originales, con envíos nacionales a toda Colombia. Estamos en Barranquilla, en el Centro Comercial Parque Alegra, Local 1-64, primer piso.",
  city: "Barranquilla, Colombia",
  phone: "3002430050",
  phoneIntl: "573002430050",
  email: "killaclockstore@gmail.com",
  stores: [
    { name: "CC Parque Alegra", detail: "Local 1-64, primer piso", city: "Barranquilla" },
    { name: "CC Buenavista 2", detail: "Piso 3", city: "Barranquilla" },
  ],
  social: {
    instagram: "https://www.instagram.com/killaclock/",
    facebook: "https://www.facebook.com/Killaclockoficial/",
    tiktok: "https://www.tiktok.com/@killaclock",
    youtube: "https://www.youtube.com/channel/UC7rwLf3ELMwI-p3gsHQehmQ",
  },
  website: "https://www.killaclock.com.co/",
  // Marcas que aparecen en el menú principal del sitio actual
  brands: [
    "Invicta", "Technomarine", "Tissot", "Guess", "Casio", "G-Shock", "Fossil",
    "Bulova", "Festina", "Nautica", "Mulco", "Diesel", "Tommy Hilfiger",
  ],
  // Medios de pago mencionados en el sitio actual (banners Addi / Sistecredito, pago contra entrega)
  payments: ["Addi", "Sistecredito", "Pago contra entrega", "Tarjetas débito y crédito"],
} as const;

export const whatsappUrl = (text: string) =>
  `https://wa.me/${brand.phoneIntl}?text=${encodeURIComponent(text)}`;
