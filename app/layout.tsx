import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Providers from "@/components/Providers";

export const metadata: Metadata = {
  title: "FUTZADA - Minijogos de Futebol",
  description: "Minijogos de futebol com estilo brasileiro. Jogos criativos, competitivos e divertidos.",
  keywords: "futebol, minijogos, brasil, jogos online",
  icons: {
    icon: "/logo.svg",
    shortcut: "/logo.svg",
    apple: "/logo.svg",
  },
  openGraph: {
    title: "FUTZADA - Minijogos de Futebol",
    description: "Minijogos de futebol com estilo brasileiro",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Providers>
          {/* Background orbs animados */}
          <div className="bg-orbs" aria-hidden="true" />
          <div className="bg-orb-purple" aria-hidden="true" />
          <div className="bg-noise" aria-hidden="true" />

          <Header />
          <main style={{ flex: 1 }}>
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
