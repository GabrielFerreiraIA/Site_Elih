import type { Metadata } from "next";
import Script from "next/script";
import { Inter, Space_Grotesk, Playfair_Display } from "next/font/google";
import "./globals.css";

const GTM_ID = "GTM-5DLC93NH";

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

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
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
    <html
      lang="pt-BR"
      className={`${inter.variable} ${grotesk.variable} ${playfair.variable}`}
    >
      <head>
        {/* Google Tag Manager */}
        <Script id="gtm-script" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`}
        </Script>
        {/* End Google Tag Manager */}
      </head>
      <body className="font-sans">
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        {children}
      </body>
    </html>
  );
}
