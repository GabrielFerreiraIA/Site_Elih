import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-inter",
  display: "swap",
});

const grotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Elih Seguros — Consultoria Premium em Saúde Corporativa",
  description:
    "Consultoria premium em planos de saúde corporativos, odonto empresarial e seguro de vida coletivo. Blindamos o caixa da sua empresa e cuidamos da sua equipe com atendimento próximo e resolutivo.",
  keywords: [
    "plano de saúde empresarial",
    "consultoria de benefícios",
    "corretora de seguros",
    "odonto empresarial",
    "seguro de vida coletivo",
  ],
  authors: [{ name: "Elih Seguros" }],
  openGraph: {
    title: "Elih Seguros — Consultoria Premium em Saúde Corporativa",
    description:
      "Inteligência corporativa. Acolhimento humano. 30 anos protegendo o caixa de empresas e cuidando de equipes.",
    type: "website",
    locale: "pt_BR",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${grotesk.variable}`}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
