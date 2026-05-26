"use client";

import { motion } from "framer-motion";
import { FileSearch, ShieldCheck, Headset, LucideIcon } from "lucide-react";
import SectionHeader from "../primitives/SectionHeader";

type Pilar = {
  num: string;
  icon: LucideIcon;
  title: string;
  body: string;
};

const pilares: Pilar[] = [
  {
    num: "01",
    icon: FileSearch,
    title: "Diagnóstico e Desenho",
    body: "Analisamos o perfil da sua empresa, número de vidas, rede necessária, histórico de utilização e orçamento para encontrar a proteção máxima com o menor impacto no caixa.",
  },
  {
    num: "02",
    icon: ShieldCheck,
    title: "Implantação Silenciosa",
    body: "Assumimos a burocracia com operadoras, documentos, inclusões e transição de planos para que seus colaboradores tenham continuidade de cuidado sem fricção.",
  },
  {
    num: "03",
    icon: Headset,
    title: "Concierge de Pós-Venda",
    body: "Seu RH não precisa enfrentar 0800s ou protocolos intermináveis. Acompanhamos inclusões, reembolsos, carências, dúvidas de cobertura e demandas sensíveis com atendimento próximo.",
  },
];

export default function Metodo() {
  return (
    <section
      id="metodo"
      className="bg-pristine border-b border-soft-slate"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-32">
        <SectionHeader
          overline="A bússola consultiva"
          title="O Método Elih"
          subtitle="Combinamos estratégia comercial e cuidado operacional para tirar o peso das costas do RH — antes, durante e depois da implantação."
          tone="light"
          align="left"
          className="mb-16 sm:mb-20"
        />

        <div className="grid grid-cols-1 md:grid-cols-3">
          {pilares.map((p, idx) => (
            <motion.article
              key={p.num}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className={`relative pt-10 md:pt-0 md:px-8 lg:px-10 first:md:pl-0 last:md:pr-0 ${
                idx > 0 ? "md:border-l border-graphite/15" : ""
              }`}
            >
              {/* Mobile divider top */}
              {idx > 0 && (
                <div className="md:hidden absolute top-0 left-0 right-0 h-px bg-graphite/15" />
              )}

              {/* Number */}
              <div className="flex items-baseline justify-between mb-6">
                <span className="font-extrabold tracking-tight text-5xl sm:text-6xl lg:text-7xl text-obsidian leading-none">
                  {p.num}
                </span>
                <span className="flex items-center justify-center w-11 h-11 rounded-[10px] border border-graphite/15 bg-clinical">
                  <p.icon
                    className="w-5 h-5 text-corp-navy"
                    strokeWidth={1.5}
                  />
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-obsidian mb-3">
                {p.title}
              </h3>
              <p className="text-sm sm:text-base leading-relaxed text-graphite/80">
                {p.body}
              </p>

              {/* Bottom thin line accent */}
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.7, delay: 0.3 + idx * 0.1 }}
                className="mt-8 h-px bg-corp-navy/30 origin-left"
              />
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
