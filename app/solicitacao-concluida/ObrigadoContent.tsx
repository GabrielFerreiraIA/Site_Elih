"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  MessageCircle,
  Clock,
  ShieldCheck,
  ClipboardList,
  SlidersHorizontal,
  PhoneCall,
} from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

const ease = [0.22, 1, 0.36, 1] as const;
const WHATSAPP_NUMBER = "5511000000000"; // substituir pelo número real

// ─── Phone Mockup ─────────────────────────────────────────────────────────────

function PhoneMockup({ nome }: { nome: string }) {
  const [phase, setPhase] = useState<"idle" | "typing" | "message">("idle");
  const firstName = nome.split(" ")[0] || "você";

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("typing"), 900);
    const t2 = setTimeout(() => setPhase("message"), 2800);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease, delay: 0.45 }}
      className="relative mx-auto w-[270px] sm:w-[290px]"
    >
      {/* Glow ambiente */}
      <div className="absolute inset-x-[-30%] top-[10%] bottom-[-10%] rounded-full bg-[#25D366]/10 blur-3xl pointer-events-none" />

      {/* Frame do telefone */}
      <div className="relative rounded-[2.8rem] bg-[#111B21] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.9),0_0_0_1px_rgba(255,255,255,0.07)] overflow-hidden">

        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-5 bg-[#111B21] rounded-b-2xl z-20" />

        {/* Status bar */}
        <div className="bg-[#111B21] pt-6 pb-1 px-5 flex items-center justify-between">
          <span className="text-[10px] font-semibold text-white/50 tabular-nums">9:41</span>
          <div className="flex items-end gap-0.5">
            {[1.5, 2, 2.5, 3].map((h, i) => (
              <div key={i} className={`w-[3px] rounded-sm bg-white/${i < 3 ? "50" : "25"}`} style={{ height: `${h * 4}px` }} />
            ))}
            <div className="ml-1 w-4 h-2 rounded-sm border border-white/40 relative overflow-hidden">
              <div className="absolute inset-y-[2px] left-[2px] right-[3px] bg-white/40 rounded-sm" />
              <div className="absolute right-[-2px] top-1/2 -translate-y-1/2 w-[3px] h-1.5 bg-white/30 rounded-r-sm" />
            </div>
          </div>
        </div>

        {/* Header WhatsApp */}
        <div className="bg-[#202C33] px-3.5 py-2.5 flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500/40 to-blue-800/40 border border-blue-400/40 flex items-center justify-center shrink-0 font-bold text-blue-300 text-sm">
            E
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[13px] font-semibold text-[#E9EDEF]">Elih Seguros</p>
            <AnimatePresence mode="wait">
              {phase === "typing" ? (
                <motion.p
                  key="typing-status"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-[11px] text-[#25D366]"
                >
                  digitando…
                </motion.p>
              ) : (
                <motion.p
                  key="online-status"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-[11px] text-[#8696A0]"
                >
                  online
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Área de chat */}
        <div
          className="relative px-3 pt-3 pb-3 flex flex-col gap-2 min-h-[230px]"
          style={{ background: "linear-gradient(180deg,#0B141A 0%,#0D1F26 100%)" }}
        >
          {/* Data */}
          <div className="flex justify-center mb-0.5">
            <span className="text-[10px] text-[#8696A0] bg-[#182229] px-2.5 py-0.5 rounded-full">
              Hoje
            </span>
          </div>

          <AnimatePresence>
            {(phase === "typing" || phase === "message") && (
              <motion.div
                key="bubble"
                initial={{ opacity: 0, y: 10, scale: 0.92 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className="self-start max-w-[92%]"
              >
                <div className="bg-[#202C33] rounded-[14px] rounded-tl-[4px] px-3 py-2.5">
                  <AnimatePresence mode="wait">
                    {phase === "typing" ? (
                      <motion.div
                        key="dots"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center gap-1 py-0.5 px-1"
                      >
                        {[0, 1, 2].map((i) => (
                          <motion.span
                            key={i}
                            className="w-1.5 h-1.5 rounded-full bg-[#8696A0]"
                            animate={{ y: [0, -4, 0] }}
                            transition={{
                              duration: 0.55,
                              repeat: Infinity,
                              delay: i * 0.15,
                              ease: "easeInOut",
                            }}
                          />
                        ))}
                      </motion.div>
                    ) : (
                      <motion.div
                        key="msg"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <p className="text-[12.5px] leading-relaxed text-[#E9EDEF]">
                          Olá, <span className="font-semibold">{firstName}</span>! 👋
                        </p>
                        <p className="text-[12.5px] leading-relaxed text-[#E9EDEF] mt-1">
                          Recebi sua cotação e já estou analisando as melhores opções para o seu perfil.
                        </p>
                        <p className="text-[12.5px] leading-relaxed text-[#E9EDEF] mt-1">
                          Retorno em breve! 😊
                        </p>
                        <div className="flex items-center justify-end gap-1 mt-1.5">
                          <span className="text-[10px] text-[#8696A0]">agora</span>
                          {/* double check mark WhatsApp */}
                          <svg className="w-4 h-3 text-[#53BDEB]" viewBox="0 0 18 12" fill="currentColor">
                            <path d="M12.5 1L6 7.5 3 4.5 1.5 6l4.5 4.5 8-8L12.5 1z" />
                            <path d="M16.5 1L10 7.5l-1-1-1.5 1.5 2.5 2.5 8-8L16.5 1z" />
                          </svg>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Input bar */}
        <div className="bg-[#111B21] px-3 py-2.5 flex items-center gap-2 border-t border-white/5">
          <div className="flex-1 bg-[#2A3942] rounded-full px-3.5 py-1.5">
            <span className="text-[11px] text-[#8696A0]">Mensagem</span>
          </div>
          <div className="w-8 h-8 rounded-full bg-[#25D366] flex items-center justify-center shrink-0">
            <svg className="w-4 h-4 text-white translate-x-[1px]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
            </svg>
          </div>
        </div>

      </div>

      {/* Badge "Nova mensagem" */}
      <AnimatePresence>
        {phase === "message" && (
          <motion.div
            key="badge"
            initial={{ opacity: 0, scale: 0.7, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.3 }}
            className="absolute -top-4 -right-4 bg-[#25D366] rounded-2xl px-3 py-1.5 shadow-[0_8px_24px_-4px_rgba(37,211,102,0.45)] flex items-center gap-1.5"
          >
            <motion.span
              className="w-1.5 h-1.5 rounded-full bg-obsidian"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.2, repeat: Infinity }}
            />
            <span className="text-[11px] font-semibold text-obsidian">Nova mensagem</span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ─── Steps timeline ───────────────────────────────────────────────────────────

const steps = [
  { num: "01", icon: ClipboardList, title: "Análise do perfil",   desc: "O consultor revisa suas informações." },
  { num: "02", icon: SlidersHorizontal, title: "Seleção de opções", desc: "Melhores condições do mercado para o seu caso." },
  { num: "03", icon: PhoneCall,  title: "Contato via WhatsApp",    desc: "Retorno personalizado em até 1 dia útil." },
];

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function ObrigadoContent({ nome, tipo }: { nome: string; tipo: string }) {
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Olá! Acabei de fazer uma cotação pelo site da Elih Seguros.")}`;
  const subtext = tipo === "CNPJ"
    ? "Sua cotação empresarial foi enviada ao nosso time."
    : "Sua cotação foi enviada ao nosso time.";

  return (
    <main className="min-h-screen bg-obsidian text-platinum flex flex-col overflow-hidden">

      {/* Glow de fundo */}
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute left-[-15%] top-[-10%] w-[55%] h-[65%] rounded-full bg-blue-700/10 blur-[120px]" />
        <div className="absolute right-[-10%] bottom-[-15%] w-[45%] h-[55%] rounded-full bg-[#25D366]/6 blur-[100px]" />
      </div>
      {/* Grid sutil */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10"
        style={{
          backgroundImage: "linear-gradient(rgba(226,232,240,0.018) 1px, transparent 1px), linear-gradient(90deg, rgba(226,232,240,0.018) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
      />

      {/* Nav */}
      <nav className="w-full px-6 sm:px-10 py-5 flex items-center">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[11px] font-grotesk uppercase tracking-[0.18em] text-platinum/35 hover:text-platinum/70 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" aria-hidden />
          Voltar ao site
        </Link>
      </nav>

      {/* HERO — 2 colunas */}
      <div className="flex-1 flex items-center">
        <div className="w-full max-w-7xl mx-auto px-6 sm:px-10 py-10 sm:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">

            {/* ── Coluna esquerda — texto ── */}
            <div>

              {/* Badge de confirmação */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease }}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#25D366]/15 border border-[#25D366]/30 mb-7"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#25D366] animate-pulse" />
                <span className="text-[11px] font-grotesk uppercase tracking-[0.18em] text-[#25D366]/90">
                  Cotação confirmada
                </span>
              </motion.div>

              {/* Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, ease, delay: 0.1 }}
                className="text-[2.6rem] sm:text-5xl lg:text-[3.5rem] font-bold leading-[1.06] tracking-tight text-pristine text-balance"
              >
                Fique atento ao
                <br />
                <span className="relative">
                  seu{" "}
                  <span className="text-[#25D366]">WhatsApp.</span>
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease, delay: 0.2 }}
                className="mt-5 text-lg sm:text-xl text-platinum/60 leading-relaxed max-w-md text-balance"
              >
                Um de nossos consultores entrará em contato em breve com as melhores opções do mercado para o seu perfil.
              </motion.p>

              {/* Nota personalizada */}
              {nome && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="mt-3 text-sm text-platinum/40"
                >
                  {subtext}
                </motion.p>
              )}

              {/* Pills de garantia */}
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease, delay: 0.35 }}
                className="mt-7 flex flex-wrap gap-2.5"
              >
                {[
                  { icon: Clock,        label: "Retorno em até 1 dia útil" },
                  { icon: ShieldCheck,  label: "Dados protegidos (LGPD)" },
                ].map((pill) => (
                  <span
                    key={pill.label}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-corp-navy/80 border border-platinum/10 text-xs text-platinum/55"
                  >
                    <pill.icon className="w-3.5 h-3.5 text-platinum/40" strokeWidth={1.5} aria-hidden />
                    {pill.label}
                  </span>
                ))}
              </motion.div>

              {/* Separador */}
              <motion.div
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.5, delay: 0.45, ease }}
                className="origin-left my-8 h-px bg-gradient-to-r from-platinum/15 to-transparent"
              />

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease, delay: 0.5 }}
                className="flex flex-col sm:flex-row gap-3"
              >
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-[#25D366] text-obsidian text-[0.9rem] font-semibold hover:bg-[#20c25c] active:scale-[0.98] transition-all duration-150 shadow-[0_14px_32px_-8px_rgba(37,211,102,0.35)]"
                >
                  <MessageCircle className="w-4.5 h-4.5" strokeWidth={2} aria-hidden />
                  Falar pelo WhatsApp
                </a>
                <Link
                  href="/"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border border-platinum/12 text-[0.9rem] font-medium text-platinum/50 hover:border-platinum/25 hover:text-platinum/75 active:scale-[0.98] transition-all duration-150"
                >
                  <ArrowLeft className="w-4 h-4" aria-hidden />
                  Voltar ao início
                </Link>
              </motion.div>

            </div>

            {/* ── Coluna direita — telefone animado ── */}
            <div className="flex justify-center lg:justify-end">
              <PhoneMockup nome={nome} />
            </div>

          </div>
        </div>
      </div>

      {/* ── Timeline de próximos passos ── */}
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-10 pb-14 sm:pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease, delay: 0.7 }}
        >
          <p className="font-grotesk text-[10px] uppercase tracking-[0.22em] text-platinum/25 mb-8 text-center">
            O que acontece agora
          </p>

          <div className="relative grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-0">

            {/* Linha conectora — só no desktop */}
            <div
              aria-hidden
              className="hidden sm:block absolute top-[28px] left-[calc(16.6%+12px)] right-[calc(16.6%+12px)] h-px bg-gradient-to-r from-platinum/10 via-platinum/20 to-platinum/10"
            />

            {steps.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, ease, delay: 0.8 + i * 0.1 }}
                className="relative flex sm:flex-col items-start sm:items-center sm:text-center gap-4 sm:gap-0 px-4 py-4 rounded-2xl bg-corp-navy/40 border border-white/[0.05] sm:bg-transparent sm:border-none sm:p-0"
              >
                {/* Ícone com número */}
                <div className="relative shrink-0">
                  <div className="w-14 h-14 rounded-2xl bg-corp-navy border border-white/[0.07] flex items-center justify-center sm:mx-auto">
                    <step.icon className="w-5 h-5 text-platinum/50" strokeWidth={1.5} aria-hidden />
                  </div>
                  <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-obsidian border border-white/10 flex items-center justify-center font-grotesk text-[9px] font-bold text-platinum/40">
                    {step.num}
                  </span>
                </div>

                {/* Texto */}
                <div className="sm:mt-4">
                  <p className="text-sm font-semibold text-platinum/75">{step.title}</p>
                  <p className="mt-0.5 text-[12px] text-platinum/35 leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.1 }}
        className="w-full border-t border-white/[0.04] py-5 px-6 text-center"
      >
        <p className="text-[11px] text-platinum/25 font-grotesk tracking-wide">
          Elih Seguros · Seus dados estão protegidos pela LGPD · Sem compromisso
        </p>
      </motion.footer>

    </main>
  );
}
