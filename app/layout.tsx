import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Providers from "@/components/Providers";
import NicknameGate from "@/components/NicknameGate";

export const metadata: Metadata = {
  title: "FUTLE | Arcade diario de futebol",
  description:
    "Minijogos diarios de futebol com ranking global, desafios criativos e clima de arquibancada.",
  keywords: "futebol, jogo diario, ranking, wordle, trivia, futle",
  openGraph: {
    title: "FUTLE | Arcade diario de futebol",
    description:
      "Uma colecao de minijogos diarios de futebol com identidade forte e competicao entre amigos.",
    type: "website",
    images: ["/branding/futle-logo-transparent.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "FUTLE | Arcade diario de futebol",
    description:
      "Jogue desafios diarios, suba no ranking e prove que voce entende de futebol.",
    images: ["/branding/futle-logo-transparent.png"],
  },
  icons: {
    icon: "/branding/futle-logo-transparent.png",
    shortcut: "/branding/futle-logo-transparent.png",
    apple: "/branding/futle-logo-transparent.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>
        <Providers>
          <div className="site-shell">
            <div className="site-backdrop" aria-hidden="true" />
            <div className="site-stripes" aria-hidden="true" />
            <NicknameGate />
            <Header />
            <main className="site-main">{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
