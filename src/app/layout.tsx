import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";
import { brand } from "@/data/brand";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";

const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope", display: "swap" });
const cormorant = Cormorant_Garamond({ subsets: ["latin"], weight: ["400", "500", "600"], style: ["normal", "italic"], variable: "--font-cormorant", display: "swap" });

export const metadata: Metadata = {
  title: { default: `${brand.legalName} · Relojes originales en Barranquilla`, template: `%s · ${brand.name}` },
  description: brand.description,
  icons: { icon: "/brand/favicon.png" },
  openGraph: { title: brand.legalName, description: brand.description, type: "website", locale: "es_CO", images: ["/brand/logo-wide.png"] },
  robots: { index: false, follow: false },
};
export const viewport: Viewport = { themeColor: "#09090b", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-CO" className={`${manrope.variable} ${cormorant.variable}`}>
      <body className="min-h-dvh flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppFloat />
      </body>
    </html>
  );
}
