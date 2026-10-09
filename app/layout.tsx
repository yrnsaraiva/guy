import type { Metadata, Viewport } from "next";
import { Archivo } from "next/font/google";
import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Guyzelh Ramos — Ao vivo",
  description: "Empresário, promotor de eventos e criador. Uma transmissão em cinco episódios.",
  openGraph: {
    title: "Guyzelh Ramos — Ao vivo",
    description: "Uma transmissão em cinco episódios.",
    locale: "pt_MZ",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt" className={archivo.variable}>
      <body>{children}</body>
    </html>
  );
}
