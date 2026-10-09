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
  title: "Guyzelh Ramos | Empresário e promotor de eventos",
  description: "Empresário, promotor de eventos e criador digital em Moçambique. Negócios, eventos e parcerias.",
  openGraph: {
    title: "Guyzelh Ramos | Empresário e promotor de eventos",
    description: "Empresário, promotor de eventos e criador digital em Moçambique.",
    locale: "pt_MZ",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt" className={archivo.variable} suppressHydrationWarning>
      <head>
        {/* activa os estados iniciais das animações antes de pintar; sem JS o conteúdo fica visível */}
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.classList.add('js');if(matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('rm')`,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
