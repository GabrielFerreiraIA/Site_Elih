"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  HeartPulse,
  Smile,
  HeartHandshake,
  ArrowRight,
  LucideIcon,
  ShieldPlus,
  ShieldCheck,
  Stethoscope,
  Shield,
  Check,
  Activity,
} from "lucide-react";
import Overline from "../primitives/Overline";

type Bullet = { icon: LucideIcon; text: string };

type Solucao = {
  id: string;
  tabLabel: string;
  tabIcon: LucideIcon;
  title: string;
  description: string;
  bullets: Bullet[];
  photoIcon: LucideIcon;
  photoCaption: string;
  image: string;
};

const solucoes: Solucao[] = [
  {
    id: "saude",
    tabLabel: "Saúde Empresarial",
    tabIcon: HeartPulse,
    title: "Planos de Saúde Corporativos",
    description:
      "Desenho estratégico do plano ideal para empresas que precisam equilibrar rede, custo, carência, coparticipação e experiência do colaborador.",
    bullets: [
      { icon: Check, text: "Negociação direta com as principais operadoras" },
      { icon: Check, text: "Análise de sinistralidade e contenção de reajustes" },
      { icon: Check, text: "Implantação assistida com suporte ao RH" },
      { icon: Check, text: "Concierge para reembolsos, inclusões e dúvidas" },
    ],
    photoIcon: Stethoscope,
    photoCaption: "Atendimento clínico premium",
    image:
      "https://res.cloudinary.com/dxpfoolyp/image/upload/q_auto/f_auto/v1780423160/Card_1__cimuj2.png",
  },
  {
    id: "odonto",
    tabLabel: "Odonto Corporativo",
    tabIcon: Smile,
    title: "Odonto Empresarial",
    description:
      "Soluções odontológicas corporativas para ampliar o pacote de benefícios, fortalecer retenção e oferecer cuidado preventivo à equipe.",
    bullets: [
      { icon: Check, text: "Rede credenciada nacional com cobertura ampla" },
      { icon: Check, text: "Planos com foco em prevenção e baixa carência" },
      { icon: Check, text: "Pacotes complementares de ortodontia" },
      { icon: Check, text: "Relatório de uso e adesão para o RH" },
    ],
    photoIcon: ShieldPlus,
    photoCaption: "Cuidado preventivo corporativo",
    image:
      "https://res.cloudinary.com/dxpfoolyp/image/upload/q_auto/f_auto/v1780423161/Card_2__q9qb13.png",
  },
  {
    id: "vida",
    tabLabel: "Vida em Grupo",
    tabIcon: HeartHandshake,
    title: "Seguro de Vida Coletivo",
    description:
      "Proteção financeira para colaboradores e famílias, com desenho consultivo e implantação simplificada para o RH.",
    bullets: [
      { icon: Check, text: "Capital segurado adequado ao perfil da equipe" },
      { icon: Check, text: "Coberturas complementares (invalidez, DMHO, auxílio-funeral)" },
      { icon: Check, text: "Atendimento humano em momentos sensíveis" },
      { icon: Check, text: "Renovação consultiva e ajuste de coberturas" },
    ],
    photoIcon: ShieldCheck,
    photoCaption: "Proteção empresarial e familiar",
    image:
      "https://res.cloudinary.com/dxpfoolyp/image/upload/q_auto/f_auto/v1780423160/Card_3__akmnwl.png",
  },
];

export default function Solucoes() {
  const [activeId, setActiveId] = useState(solucoes[0].id);
  const active = solucoes.find((s) => s.id === activeId)!;

  return (
    <section id="solucoes" className="bg-[#fafbfd] border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 lg:py-16">

        {/* Section header — centered */}
        <div className="text-center mb-8 sm:mb-10 lg:mb-12">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5 }}
          >
            <Overline tone="light">Soluções Corporativas</Overline>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-4 text-3xl sm:text-4xl lg:text-[2.5rem] lg:leading-[1.1] font-bold font-display tracking-tight text-navy-950"
          >
            O portfólio de gestão
          </motion.h2>

          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, delay: 0.28 }}
            className="mx-auto mt-3 h-[1.5px] w-14 bg-neutral-300 origin-center"
          />

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-3.5 text-sm sm:text-base leading-relaxed text-neutral-600 max-w-xl mx-auto"
          >
            A Elih estrutura soluções sob medida para empresas que valorizam qualidade e buscam performance sustentável.
          </motion.p>
        </div>

        {/* 3-column panel (with hover elevation & advanced float shadow) */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          whileHover={{ y: -6 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 lg:grid-cols-12 rounded-[24px] overflow-hidden bg-navy-900
                     shadow-[var(--shadow-md)] hover:shadow-[var(--shadow-lg)] transition-shadow duration-500"
        >
          {/* LEFT — dark nav panel */}
          <div className="lg:col-span-3 bg-navy-950 flex flex-col p-5 lg:p-6">
            <ul
              role="tablist"
              aria-label="Soluções Elih"
              className="space-y-1 flex-1"
            >
              {solucoes.map((s) => {
                const isActive = s.id === activeId;
                return (
                  <li key={s.id}>
                    <button
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      aria-controls={`panel-${s.id}`}
                      id={`tab-${s.id}`}
                      onClick={() => setActiveId(s.id)}
                      className={`group w-full flex items-center gap-3 text-left px-4 py-2.5 rounded-[12px] transition-all duration-200 ${
                        isActive
                          ? "bg-white/10 text-white"
                          : "text-white/50 hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      <span
                        className={`flex items-center justify-center w-8 h-8 rounded-[8px] shrink-0 transition-colors ${
                          isActive
                            ? "bg-white/20 text-white"
                            : "bg-white/5 text-white/50 group-hover:text-white"
                        }`}
                      >
                        <s.tabIcon className="w-4 h-4" strokeWidth={1.5} />
                      </span>
                      <span
                        className={`text-sm font-medium leading-tight ${
                          isActive
                            ? "text-white"
                            : "text-white/60 group-hover:text-white"
                        }`}
                      >
                        {s.tabLabel}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>

            {/* Bottom badge */}
            <div className="mt-6 pt-4 border-t border-white/10 flex items-start gap-2.5">
              <Shield
                className="w-3.5 h-3.5 text-white/30 shrink-0 mt-0.5"
                strokeWidth={1.5}
              />
              <span className="font-display uppercase tracking-[0.13em] text-[9px] leading-[1.55] text-white/30">
                Soluções integradas com visão consultiva
              </span>
            </div>
          </div>

          {/* CENTER — product photo (3:4 slot) */}
          <div className="lg:col-span-5 relative overflow-hidden aspect-[3/4] lg:aspect-auto lg:min-h-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id + "-photo"}
                initial={{ opacity: 0, scale: 1.02 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.01 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0"
              >
                {/* gradient fallback behind image */}
                <div className="absolute inset-0 bg-gradient-to-br from-navy-900 via-neutral-900 to-navy-950" />
                {/* product image — fills the 3:4 slot */}
                <img
                  src={active.image}
                  alt={active.photoCaption}
                  className="absolute inset-0 w-full h-full object-cover object-center"
                  loading="lazy"
                />
                {/* bottom shade for caption legibility */}
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-navy-950/80 via-navy-950/20 to-transparent" />
                {/* caption */}
                <div className="absolute left-6 right-6 bottom-6">
                  <p className="overline text-white/70">{active.photoCaption}</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* RIGHT — content panel */}
          <div
            className="lg:col-span-4 bg-white p-5 sm:p-6 lg:p-7 flex flex-col"
            role="tabpanel"
            id={`panel-${active.id}`}
            aria-labelledby={`tab-${active.id}`}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -6 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="flex flex-col flex-1"
              >
                {/* Pill badge */}
                <span className="inline-flex self-start items-center gap-1.5 px-2.5 py-1 rounded-full border border-neutral-200 bg-neutral-50 text-[9.5px] font-display uppercase tracking-overline text-neutral-500">
                  <span
                    className="w-1.5 h-1.5 rounded-full bg-navy-500"
                    aria-hidden
                  />
                  Solução ativa
                </span>

                <h3 className="mt-4 text-xl sm:text-2xl font-bold font-display tracking-tight text-navy-950 leading-snug text-balance">
                  {active.title}
                </h3>

                <p className="mt-2.5 text-sm leading-relaxed text-neutral-600 text-balance">
                  {active.description}
                </p>

                {/* Bullets with dividers */}
                <ul className="mt-4 flex-1">
                  {active.bullets.map((b, i) => (
                    <li
                      key={b.text}
                      className={`flex items-start gap-3 py-2.5 ${
                        i < active.bullets.length - 1
                          ? "border-b border-neutral-200/60"
                          : ""
                      }`}
                    >
                      <span className="flex items-center justify-center w-[18px] h-[18px] rounded-full border border-navy-100 bg-navy-50 text-navy-600 shrink-0 mt-0.5">
                        <b.icon
                          className="w-2.5 h-2.5 text-navy-600"
                          strokeWidth={2.5}
                        />
                      </span>
                      <span className="text-sm text-neutral-750 leading-snug">
                        {b.text}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <a
                  href="#contato"
                  className="mt-5 inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-navy-900 text-white text-sm font-semibold hover:bg-navy-950 transition-colors duration-200 self-start shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)] font-display"
                >
                  Ver solução
                  <ArrowRight className="w-4 h-4" />
                </a>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Bottom trust strip */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 flex items-center justify-center gap-2.5 text-neutral-400"
        >
          <Activity className="w-3.5 h-3.5 shrink-0" strokeWidth={1.5} />
          <span className="font-display uppercase tracking-[0.18em] text-[9.5px]">
            Gestão integrada · Inteligência de dados · Cuidado contínuo
          </span>
        </motion.div>
      </div>
    </section>
  );
}
