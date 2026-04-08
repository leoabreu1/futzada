import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

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
        <Header />
        <main style={{ flex: 1 }}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
