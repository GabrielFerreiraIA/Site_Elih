"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  HeartPulse,
  Sparkles,
  Users,
  ArrowRight,
  LucideIcon,
  Briefcase,
  Stethoscope,
  Shield,
  Check,
  BarChart2,
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
  },
  {
    id: "odonto",
    tabLabel: "Odonto Corporativo",
    tabIcon: Sparkles,
    title: "Odonto Empresarial",
    description:
      "Soluções odontológicas corporativas para ampliar o pacote de benefícios, fortalecer retenção e oferecer cuidado preventivo à equipe.",
    bullets: [
      { icon: Check, text: "Rede credenciada nacional com cobertura ampla" },
      { icon: Check, text: "Planos com foco em prevenção e baixa carência" },
      { icon: Check, text: "Pacotes complementares de ortodontia" },
      { icon: Check, text: "Relatório de uso e adesão para o RH" },
    ],
    photoIcon: Briefcase,
    photoCaption: "Cuidado preventivo corporativo",
  },
  {
    id: "vida",
    tabLabel: "Vida em Grupo",
    tabIcon: Users,
    title: "Seguro de Vida Coletivo",
    description:
      "Proteção financeira para colaboradores e famílias, com desenho consultivo e implantação simplificada para o RH.",
    bullets: [
      { icon: Check, text: "Capital segurado adequado ao perfil da equipe" },
      { icon: Check, text: "Coberturas complementares (invalidez, DMHO, auxílio-funeral)" },
      { icon: Check, text: "Atendimento humano em momentos sensíveis" },
      { icon: Check, text: "Renovação consultiva e ajuste de coberturas" },
    ],
    photoIcon: Shield,
    photoCaption: "Proteção empresarial e familiar",
  },
];

export default function Solucoes() {
  const [activeId, setActiveId] = useState(solucoes[0].id);
  const active = solucoes.find((s) => s.id === activeId)!;

  return (
    <section id="solucoes" className="bg-clinical border-b border-soft-slate">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-32">

        {/* Section header — centered */}
        <div className="text-center mb-14 sm:mb-16 lg:mb-20">
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
            className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-bold italic tracking-tight text-obsidian"
          >
            O portfólio de gestão
          </motion.h2>

          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, delay: 0.28 }}
            className="mx-auto mt-4 h-[1.5px] w-14 bg-graphite/25 origin-center"
          />

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-5 text-base sm:text-lg leading-relaxed text-graphite/65 max-w-xl mx-auto"
          >
            A Elih estrutura soluções sob medida para empresas que valorizam qualidade e buscam performance sustentável.
          </motion.p>
        </div>

        {/* 3-column panel */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
          className="grid grid-cols-1 lg:grid-cols-12 rounded-[24px] overflow-hidden shadow-[0_32px_80px_-20px_rgba(2,6,23,0.20)] border border-graphite/[0.08]"
        >
          {/* LEFT — dark nav panel */}
          <div className="lg:col-span-3 bg-corp-navy flex flex-col p-7 lg:p-8">
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
                      className={`group w-full flex items-center gap-3 text-left px-4 py-3.5 rounded-[12px] transition-all duration-250 ${
                        isActive
                          ? "bg-platinum/[0.13] text-pristine"
                          : "text-platinum/50 hover:bg-platinum/[0.07] hover:text-platinum/80"
                      }`}
                    >
                      <span
                        className={`flex items-center justify-center w-8 h-8 rounded-[8px] shrink-0 transition-colors ${
                          isActive
                            ? "bg-platinum/20 text-pristine"
                            : "bg-platinum/[0.08] text-platinum/45 group-hover:text-platinum/70"
                        }`}
                      >
                        <s.tabIcon className="w-4 h-4" strokeWidth={1.5} />
                      </span>
                      <span
                        className={`text-sm font-medium leading-tight ${
                          isActive
                            ? "text-pristine"
                            : "text-platinum/55 group-hover:text-platinum/82"
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
            <div className="mt-10 pt-6 border-t border-platinum/[0.09] flex items-start gap-2.5">
              <Shield
                className="w-3.5 h-3.5 text-platinum/28 shrink-0 mt-0.5"
                strokeWidth={1.5}
              />
              <span className="font-grotesk uppercase tracking-[0.13em] text-[9px] leading-[1.55] text-platinum/30">
                Soluções integradas com visão consultiva
              </span>
            </div>
          </div>

          {/* CENTER — tall photo placeholder */}
          <div className="lg:col-span-5 relative min-h-[280px] lg:min-h-0 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id + "-photo"}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 grain"
              >
                {/* gradient background */}
                <div className="absolute inset-0 bg-gradient-to-br from-corp-navy via-graphite to-deep-navy" />
                {/* spotlight */}
                <div className="absolute -top-1/4 -right-1/4 w-[130%] h-[130%] bg-[radial-gradient(circle_at_top_right,rgba(226,232,240,0.16),transparent_55%)]" />
                {/* bottom shade */}
                <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-obsidian/75 to-transparent" />
                {/* icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full border border-platinum/12 flex items-center justify-center bg-platinum/[0.04] backdrop-blur-sm">
                    <active.photoIcon
                      className="w-7 h-7 text-platinum/40"
                      strokeWidth={1.25}
                    />
                  </div>
                </div>
                {/* caption */}
                <div className="absolute left-6 right-6 bottom-6">
                  <p className="overline text-platinum/45">{active.photoCaption}</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* RIGHT — content panel */}
          <div
            className="lg:col-span-4 bg-pristine p-7 sm:p-8 lg:p-10 flex flex-col"
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
                <span className="inline-flex self-start items-center gap-1.5 px-2.5 py-1 rounded-full border border-graphite/12 bg-clinical text-[9.5px] font-grotesk uppercase tracking-[0.16em] text-graphite/45">
                  <span
                    className="w-1.5 h-1.5 rounded-full bg-corp-navy/50"
                    aria-hidden
                  />
                  Solução ativa
                </span>

                <h3 className="mt-5 text-2xl sm:text-3xl font-bold tracking-tight text-obsidian leading-snug text-balance">
                  {active.title}
                </h3>

                <p className="mt-4 text-sm sm:text-[15px] leading-relaxed text-graphite/65 text-balance">
                  {active.description}
                </p>

                {/* Bullets with dividers */}
                <ul className="mt-7 flex-1">
                  {active.bullets.map((b, i) => (
                    <li
                      key={b.text}
                      className={`flex items-start gap-3 py-3.5 ${
                        i < active.bullets.length - 1
                          ? "border-b border-graphite/[0.09]"
                          : ""
                      }`}
                    >
                      <span className="flex items-center justify-center w-[18px] h-[18px] rounded-full border border-graphite/15 bg-clinical shrink-0 mt-0.5">
                        <b.icon
                          className="w-2.5 h-2.5 text-corp-navy"
                          strokeWidth={2.5}
                        />
                      </span>
                      <span className="text-sm text-graphite/80 leading-snug">
                        {b.text}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <a
                  href="#contato"
                  className="mt-8 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-[10px] bg-obsidian text-pristine text-sm font-semibold hover:bg-corp-navy transition-colors duration-200 self-start"
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
          className="mt-10 flex items-center justify-center gap-2.5 text-graphite/40"
        >
          <BarChart2 className="w-3.5 h-3.5 shrink-0" strokeWidth={1.5} />
          <span className="font-grotesk uppercase tracking-[0.18em] text-[9.5px]">
            Gestão integrada · Inteligência de dados · Cuidado contínuo
          </span>
        </motion.div>
      </div>
    </section>
  );
}
