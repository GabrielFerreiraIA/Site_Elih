import type { Metadata } from "next";
import ObrigadoContent from "./ObrigadoContent";

export const metadata: Metadata = {
  title: "Cotação Recebida — Elih Seguros",
  description: "Sua cotação foi recebida. Um consultor da Elih vai entrar em contato em breve.",
  robots: { index: false, follow: false },
};

export default async function ObrigadoPage({
  searchParams,
}: {
  searchParams: Promise<{ nome?: string; tipo?: string }>;
}) {
  const { nome = "", tipo = "" } = await searchParams;

  return <ObrigadoContent nome={decodeURIComponent(nome)} tipo={tipo} />;
}
