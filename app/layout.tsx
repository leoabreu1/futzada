import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Providers from "@/components/Providers";
import NicknameGate from "@/components/NicknameGate";

export const metadata: Metadata = {
  title: "FUTLE - Desafio Diário de Futebol Brasileiro",
  description: "Desafio diário de futebol brasileiro. Jogos criativos, competitivos e divertidos.",
  keywords: "futebol, desafio diário, brasil, jogos online, futle",
  icons: {
    icon: "/logo-icon.png",
    shortcut: "/logo-icon.png",
    apple: "/logo-icon.png",
  },
  openGraph: {
    title: "FUTLE - Desafio Diário de Futebol Brasileiro",
    description: "Desafio diário • Futebol brasileiro",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Providers>
          <NicknameGate />
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
