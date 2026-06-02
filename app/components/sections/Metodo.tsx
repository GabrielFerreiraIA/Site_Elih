"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ScanSearch, 
  ShieldCheck, 
  HeartHandshake, 
  ArrowRight, 
  Check, 
  RotateCcw, 
  Sparkles, 
  Activity,
  MessageSquare,
  Send,
  TrendingDown,
  ChevronRight
} from "lucide-react";
import SectionHeader from "../primitives/SectionHeader";

// ─── Types ───────────────────────────────────────────────────────────────────
type Pilar = {
  num: string;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  title: string;
  body: string;
};

const pilares: Pilar[] = [
  {
    num: "01",
    icon: ScanSearch,
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
    icon: HeartHandshake,
    title: "Concierge de Pós-Venda",
    body: "Seu RH não precisa enfrentar 0800s ou protocolos intermináveis. Acompanhamos inclusões, reembolsos, carências, dúvidas de cobertura e demandas sensíveis.",
  },
];

// ─── Sub-Components / Frame Sheen ───────────────────────────────────────────
function EdgeFrame({ radius = "rounded-2xl" }: { radius?: string }) {
  return (
    <>
      <span className={`pointer-events-none absolute inset-0 ${radius} edge edge-soft`} aria-hidden />
      <span
        className={`pointer-events-none absolute inset-0 ${radius} edge edge-strong opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
        aria-hidden
      />
    </>
  );
}

export default function Metodo() {
  const [activeTab, setActiveTab] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [progress, setProgress] = useState(0);

  // Pilar 1 State
  const [optimized, setOptimized] = useState(false);

  // Pilar 2 State
  const [onboardingStep, setOnboardingStep] = useState(2); // 2: intermediate, 4: complete

  // Pilar 3 State
  const [chatProgress, setChatProgress] = useState(2); // shows first 2 messages
  const [isTyping, setIsTyping] = useState(false);

  // ─── Autoplay effect ────────────────────────────────────────────────────────
  useEffect(() => {
    if (isHovered) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setActiveTab((curr) => (curr + 1) % 3);
          return 0;
        }
        return prev + 1; // 100 steps * 80ms = 8000ms (8 seconds)
      });
    }, 80);

    return () => clearInterval(interval);
  }, [isHovered, activeTab]);

  const handleTabClick = (idx: number) => {
    setActiveTab(idx);
    setProgress(0);
  };

  // Chat simulator action
  const handleChatSimulation = () => {
    if (chatProgress === 2 && !isTyping) {
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        setChatProgress(3);
        // Next message delay
        setIsTyping(true);
        setTimeout(() => {
          setIsTyping(false);
          setChatProgress(4);
        }, 1200);
      }, 1500);
    } else if (chatProgress === 4) {
      setChatProgress(2);
    }
  };

  return (
    <section
      id="metodo"
      className="bg-pristine border-b border-soft-slate relative overflow-hidden"
    >
      {/* Background visual detail */}
      <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-[radial-gradient(circle_at_top_right,rgba(15,23,42,0.02),transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-32">
        
        {/* Header Section */}
        <SectionHeader
          overline="A bússola consultiva"
          title="O Método Elih"
          subtitle="Combinamos estratégia comercial e cuidado operacional para tirar o peso das costas do RH — antes, durante e depois da implantação."
          tone="light"
          align="left"
          className="mb-16 sm:mb-20"
        />

        {/* Core Layout Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* LEFT COLUMN: Stepper / Vertical Selector */}
          <div 
            className="lg:col-span-5 flex flex-col gap-5 relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {pilares.map((p, idx) => {
              const isActive = idx === activeTab;
              return (
                <button
                  key={p.num}
                  onClick={() => handleTabClick(idx)}
                  className={`group relative text-left p-6 sm:p-7 rounded-2xl border transition-all duration-500 flex gap-5 items-start z-10 ${
                    isActive
                      ? "border-soft-slate/70 shadow-[0_20px_50px_-20px_rgba(15,23,42,0.12)] scale-[1.01]"
                      : "border-transparent opacity-65 hover:opacity-100 hover:bg-clinical/50"
                  }`}
                >
                  {/* Sliding active background */}
                  {isActive && (
                    <motion.div
                      layoutId="active-pilar-bg"
                      className="absolute inset-0 bg-white rounded-2xl -z-10"
                      transition={{ type: "spring", stiffness: 130, damping: 20 }}
                    />
                  )}

                  {/* Left Active Progress Indicator */}
                  {isActive && (
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-corp-navy overflow-hidden rounded-l-2xl z-20">
                      <motion.div
                        initial={{ scaleY: 0 }}
                        animate={{ scaleY: progress / 100 }}
                        transition={{ ease: "linear" }}
                        className="w-full h-full bg-corp-navy origin-top"
                      />
                    </div>
                  )}

                  {/* Icon Container */}
                  <div className={`flex items-center justify-center w-12 h-12 rounded-xl border shrink-0 transition-all duration-300 ${
                    isActive
                      ? "bg-corp-navy text-white border-corp-navy shadow-md shadow-corp-navy/10 scale-105"
                      : "bg-white border-soft-slate text-graphite/40 group-hover:text-corp-navy group-hover:border-corp-navy/20 group-hover:bg-clinical"
                  }`}>
                    <p.icon className="w-5.5 h-5.5" strokeWidth={1.5} />
                  </div>

                  {/* Text Details */}
                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <h3 className="text-lg sm:text-xl font-bold tracking-tight text-obsidian">
                        {p.title}
                      </h3>
                      <span className={`font-mono text-[10px] font-bold px-2.5 py-0.5 rounded-full transition-all duration-300 ${
                        isActive ? "bg-corp-navy/10 text-corp-navy" : "bg-soft-slate/50 text-graphite/50"
                      }`}>
                        {p.num}
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed text-graphite/70 text-balance">
                      {p.body}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* RIGHT COLUMN: Interactive Dashboard Display */}
          <div 
            className="lg:col-span-7 h-[480px] sm:h-[520px] lg:h-[560px] w-full relative flex items-center justify-center"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Ambient Background Glow matching the active tab */}
            <div className="absolute inset-0 -z-10 flex items-center justify-center">
              <div className={`w-[85%] h-[85%] rounded-full blur-[90px] opacity-25 transition-all duration-1000 ${
                activeTab === 0 ? "bg-blue-500/80" : activeTab === 1 ? "bg-indigo-500/80" : "bg-emerald-500/80"
              }`} />
            </div>

            {/* Container macOS Window Frame */}
            <div className="w-full h-full rounded-3xl overflow-hidden bg-corp-navy/95 border border-white/[0.08] glass-dark shadow-[0_35px_90px_-20px_rgba(2,6,23,0.85)] p-6 sm:p-7 flex flex-col grain relative">
              <EdgeFrame radius="rounded-3xl" />
              
              {/* Window Header */}
              <div className="flex items-center justify-between pb-4 border-b border-white/[0.08] mb-6 shrink-0">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E]/30 shadow-[inset_0_1px_1.5px_rgba(0,0,0,0.2)]" />
                  <span className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123]/30 shadow-[inset_0_1px_1.5px_rgba(0,0,0,0.2)]" />
                  <span className="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAB29]/30 shadow-[inset_0_1px_1.5px_rgba(0,0,0,0.2)]" />
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[10px] font-mono tracking-wider uppercase text-platinum/40 font-semibold">
                    painel_elih_interativo
                  </span>
                </div>
              </div>

              {/* Dynamic Content Switching with Animations */}
              <div className="flex-1 relative overflow-hidden flex flex-col justify-center">
                <AnimatePresence mode="wait">
                  
                  {/* Pilar 01: Diagnóstico e Desenho */}
                  {activeTab === 0 && (
                    <motion.div
                      key="pilar-01"
                      initial={{ opacity: 0, y: 15, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -15, scale: 0.98 }}
                      transition={{ duration: 0.4 }}
                      className="h-full flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-4 mb-2">
                          <h4 className="font-semibold text-white/95 text-base sm:text-lg flex items-center gap-2">
                            <Sparkles className="w-4 h-4 text-blue-400" />
                            Estudo Comparativo de Benefícios
                          </h4>
                          <span className="text-[10px] font-mono bg-blue-500/10 border border-blue-500/25 px-2 py-0.5 rounded text-blue-400">
                            Simulação
                          </span>
                        </div>
                        <p className="text-xs text-platinum/50 leading-relaxed mb-5">
                          Compare o cenário atual de uma empresa fictícia de 145 vidas com o plano otimizado desenhado pela consultoria Elih.
                        </p>
                      </div>

                      {/* Main Comparison Interface */}
                      <div className="grid grid-cols-2 gap-4 mb-5">
                        
                        {/* Cenário Atual */}
                        <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-4 flex flex-col justify-between h-[115px]">
                          <div>
                            <span className="text-[10px] font-mono uppercase tracking-wider font-semibold text-red-400/80">Cenário Atual</span>
                            <div className="flex items-baseline gap-1.5 mt-1">
                              <span className="text-xs font-medium text-white/40">R$</span>
                              <p className="text-2xl sm:text-3xl font-bold tracking-tight font-sans text-white/95">48.200</p>
                            </div>
                          </div>
                          <span className="text-[11px] text-white/50 flex items-center gap-1.5 mt-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-400" /> Sinistralidade Alta (82%)
                          </span>
                        </div>

                        {/* Proposta Elih */}
                        <div className={`rounded-2xl p-4 flex flex-col justify-between h-[115px] transition-all duration-500 border ${
                          optimized 
                            ? "bg-emerald-500/[0.06] border-emerald-500/30 shadow-[0_12px_24px_-10px_rgba(16,185,129,0.15)] scale-[1.02]" 
                            : "bg-white/[0.02] border-white/[0.06]"
                        }`}>
                          <div>
                            <span className={`text-[10px] font-mono uppercase tracking-wider font-semibold transition-colors ${
                              optimized ? "text-emerald-400" : "text-white/40"
                            }`}>
                              Proposta Elih
                            </span>
                            <div className="flex items-baseline gap-1.5 mt-1">
                              <span className={`text-xs font-medium transition-colors ${optimized ? "text-emerald-400/70" : "text-white/40"}`}>R$</span>
                              <motion.p 
                                animate={{ color: optimized ? "#10b981" : "#ffffff" }}
                                className="text-2xl sm:text-3xl font-bold tracking-tight font-sans text-white/95"
                              >
                                {optimized ? "38.560" : "48.200"}
                              </motion.p>
                            </div>
                          </div>
                          <span className="text-[11px] text-white/50 flex items-center gap-1.5 mt-2">
                            <span className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${optimized ? "bg-emerald-400 animate-pulse-soft" : "bg-white/30"}`} /> 
                            {optimized ? "Economia Consolidada" : "Redução Projetada (20%)"}
                          </span>
                        </div>
                      </div>

                      {/* Animated comparison chart */}
                      <div className="flex justify-around items-end h-28 sm:h-32 bg-white/[0.01] border border-white/[0.05] rounded-2xl p-4 relative mb-5">
                        {/* Grid lines */}
                        <div className="absolute left-0 right-0 top-1/4 border-t border-white/[0.03] pointer-events-none" />
                        <div className="absolute left-0 right-0 top-2/4 border-t border-white/[0.03] pointer-events-none" />
                        <div className="absolute left-0 right-0 top-3/4 border-t border-white/[0.03] pointer-events-none" />

                        {/* Bar 1 */}
                        <div className="flex flex-col items-center gap-2 z-10 w-24">
                          <span className="text-[10px] font-mono font-semibold text-red-400 bg-red-400/10 px-1.5 py-0.5 rounded border border-red-500/20">
                            R$ 48.2k
                          </span>
                          <div className="w-10 sm:w-12 bg-gradient-to-t from-red-500/10 to-red-500/30 border border-red-500/25 rounded-t-lg h-20 shadow-[0_0_15px_rgba(239,68,68,0.1)] transition-all duration-300" />
                          <span className="text-[9px] text-white/40 uppercase tracking-widest font-mono font-semibold">Atual</span>
                        </div>

                        {/* Bar 2 */}
                        <div className="flex flex-col items-center gap-2 z-10 w-24">
                          <span className={`text-[10px] font-mono font-semibold transition-all duration-300 px-1.5 py-0.5 rounded border ${
                            optimized 
                              ? "text-emerald-400 bg-emerald-400/10 border-emerald-500/20" 
                              : "text-white/60 bg-white/5 border-white/10"
                          }`}>
                            {optimized ? "R$ 38.5k" : "R$ 48.2k"}
                          </span>
                          <motion.div
                            initial={{ height: "80px" }}
                            animate={{ height: optimized ? "64px" : "80px" }}
                            transition={{ type: "spring", stiffness: 100, damping: 15 }}
                            className={`w-10 sm:w-12 rounded-t-lg transition-all duration-500 ${
                              optimized 
                                ? "bg-gradient-to-t from-emerald-500/10 to-emerald-500/40 border border-emerald-500/35 shadow-[0_0_20px_rgba(16,185,129,0.2)]" 
                                : "bg-gradient-to-t from-white/5 to-white/15 border border-white/10"
                            }`}
                          />
                          <span className="text-[9px] text-white/40 uppercase tracking-widest font-mono font-semibold">Proposta</span>
                        </div>
                      </div>

                      {/* Simulator trigger button */}
                      <button
                        onClick={() => setOptimized(!optimized)}
                        className={`w-full py-3 px-4 rounded-xl text-xs font-bold transition-all duration-300 flex items-center justify-center gap-2 ${
                          optimized
                            ? "bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20 shadow-[0_4px_12px_rgba(16,185,129,0.05)]"
                            : "bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/20 hover:shadow-blue-600/30 hover:scale-[1.01]"
                        }`}
                      >
                        {optimized ? (
                          <>
                            <RotateCcw className="w-3.5 h-3.5" />
                            Reiniciar Comparativo
                          </>
                        ) : (
                          <>
                            <TrendingDown className="w-3.5 h-3.5 animate-bounce" />
                            Simular Otimização Consultiva (Salvar R$ 9,6k/mês)
                          </>
                        )}
                      </button>
                    </motion.div>
                  )}

                  {/* Pilar 02: Implantação Silenciosa */}
                  {activeTab === 1 && (
                    <motion.div
                      key="pilar-02"
                      initial={{ opacity: 0, y: 15, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -15, scale: 0.98 }}
                      transition={{ duration: 0.4 }}
                      className="h-full flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-4 mb-2">
                          <h4 className="font-semibold text-white/95 text-base sm:text-lg flex items-center gap-2">
                            <Activity className="w-4 h-4 text-indigo-400" />
                            Painel de Migração Assistida
                          </h4>
                          <span className="text-[10px] font-mono bg-indigo-500/10 border border-indigo-500/25 px-2 py-0.5 rounded text-indigo-400">
                            Status da Transição
                          </span>
                        </div>
                        <p className="text-xs text-platinum/50 leading-relaxed mb-4">
                          Cuidamos de toda a transição de planos de saúde, garantindo portabilidade de carências e integrando os dados dos funcionários em segundo plano.
                        </p>
                      </div>

                      {/* Timeline Workflow */}
                      <div className="relative my-auto py-2 pr-1 space-y-4 max-h-[300px] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                        {/* Vertical connection line */}
                        <div className="absolute left-[15px] top-6 bottom-6 w-0.5 bg-white/10 pointer-events-none" />
                        
                        {/* Animated active vertical fill */}
                        <div 
                          className="absolute left-[15px] top-6 w-0.5 bg-gradient-to-b from-emerald-500 to-indigo-500 origin-top transition-all duration-1000 pointer-events-none" 
                          style={{ 
                            height: `${onboardingStep === 2 ? '33%' : onboardingStep === 4 ? '100%' : '0%'}` 
                          }} 
                        />

                        {[
                          { id: 1, label: "Auditoria cadastral de base", desc: "Varredura de dependentes e inconsistências" },
                          { id: 2, label: "Portabilidade de carências", desc: "Garantia de isenção total junto à nova operadora" },
                          { id: 3, label: "Migração digital na operadora", desc: "Transmissão sem duplicidade de cobrança" },
                          { id: 4, label: "Onboarding & Atendimento Ativo", desc: "Entrega de carteirinhas e suporte ao colaborador" },
                        ].map((st, sIdx) => {
                          const isCompleted = sIdx < onboardingStep;
                          const isCurrent = sIdx === onboardingStep;

                          return (
                            <div 
                              key={st.id} 
                              className={`flex items-start gap-4 pl-1 relative z-10 transition-all duration-500 ${
                                isCurrent 
                                  ? "scale-[1.01]" 
                                  : isCompleted 
                                    ? "opacity-95"
                                    : "opacity-40"
                              }`}
                            >
                              {/* Timeline node */}
                              <div className="relative flex items-center justify-center shrink-0">
                                <span className={`flex items-center justify-center w-8 h-8 rounded-full border text-xs font-mono transition-all duration-500 ${
                                  isCompleted 
                                    ? "bg-emerald-500/20 border-emerald-500/50 text-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.15)]" 
                                    : isCurrent 
                                      ? "bg-indigo-500/20 border-indigo-500/50 text-indigo-400 shadow-[0_0_12px_rgba(99,102,241,0.25)] animate-pulse" 
                                      : "bg-white/5 border-white/10 text-white/30"
                                }`}>
                                  {isCompleted ? (
                                    <Check className="w-4 h-4 text-emerald-400" strokeWidth={3} />
                                  ) : (
                                    st.id
                                  )}
                                </span>
                              </div>

                              {/* Content card */}
                              <div className={`flex-1 min-w-0 p-3 rounded-xl border transition-all duration-300 ${
                                  isCurrent 
                                    ? "bg-white/[0.04] border-white/10 shadow-lg" 
                                    : "bg-transparent border-transparent"
                              }`}>
                                <div className="flex items-center justify-between gap-2 mb-0.5">
                                  <p className="text-xs font-semibold text-white/95 truncate">{st.label}</p>
                                  {isCurrent && (
                                    <span className="text-[8px] font-mono bg-indigo-500/15 border border-indigo-500/25 px-1.5 py-0.5 rounded text-indigo-400 animate-pulse uppercase shrink-0">
                                      Processando
                                    </span>
                                  )}
                                  {isCompleted && (
                                    <span className="text-[8px] font-mono bg-emerald-500/10 border border-emerald-500/20 px-1.5 py-0.5 rounded text-emerald-400 uppercase shrink-0 font-medium">
                                      Concluído
                                    </span>
                                  )}
                                </div>
                                <p className="text-[10px] text-white/50 truncate">{st.desc}</p>
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {/* Action Button */}
                      <div className="mt-4">
                        <button
                          onClick={() => setOnboardingStep(onboardingStep === 2 ? 4 : 2)}
                          className={`w-full py-3 px-4 rounded-xl text-xs font-bold transition-all duration-300 flex items-center justify-center gap-2 ${
                            onboardingStep === 2 
                              ? "bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/20 hover:scale-[1.01]" 
                              : "bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20"
                          }`}
                        >
                          {onboardingStep === 2 ? (
                            <>
                              <Activity className="w-3.5 h-3.5 animate-spin" />
                              Concluir Validação & Migrar sem Fricção
                            </>
                          ) : (
                            <>
                              <RotateCcw className="w-3.5 h-3.5" />
                              Reiniciar Fluxo de Implantação
                            </>
                          )}
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {/* Pilar 03: Concierge de Pós-Venda */}
                  {activeTab === 2 && (
                    <motion.div
                      key="pilar-03"
                      initial={{ opacity: 0, y: 15, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -15, scale: 0.98 }}
                      transition={{ duration: 0.4 }}
                      className="h-full flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-4 mb-2">
                          <h4 className="font-semibold text-white/95 text-base sm:text-lg flex items-center gap-2">
                            <MessageSquare className="w-4 h-4 text-emerald-400" />
                            Atendimento Executivo Sem 0800
                          </h4>
                          <span className="text-[10px] font-mono bg-emerald-500/10 border border-emerald-500/25 px-2 py-0.5 rounded text-emerald-400">
                            Canal Direto
                          </span>
                        </div>
                        <p className="text-xs text-platinum/50 leading-relaxed mb-4">
                          Linha direta via WhatsApp/Slack. Sua equipe é atendida por gestores de verdade, em minutos. Nada de robôs ou gravações.
                        </p>
                      </div>

                      {/* Chat Messages Log */}
                      <div className="flex-1 bg-black/20 border border-white/[0.06] rounded-2xl p-4 space-y-4 overflow-y-auto max-h-[200px] mb-4 flex flex-col justify-end [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                        <div className="space-y-4">
                          {/* Message 1: Client */}
                          <div className="flex items-start gap-2.5 justify-end">
                            <div className="flex flex-col items-end max-w-[80%]">
                              <div className="bg-white/5 border border-white/10 rounded-2xl rounded-tr-sm px-3.5 py-2.5 shadow-sm">
                                <p className="text-xs text-white/90 leading-relaxed">
                                  Olá, Elih! Um novo diretor precisa de inclusão emergencial no plano para fazer uma cirurgia esta semana. Conseguimos?
                                </p>
                              </div>
                              <span className="text-[8px] text-white/30 mt-1 mr-1.5 font-mono">10:42 · Márcia (RH)</span>
                            </div>
                            {/* Avatar Client */}
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-[10px] font-bold text-white shrink-0 shadow-md shadow-indigo-500/10">
                              RH
                            </div>
                          </div>

                          {/* Message 2: Concierge */}
                          <div className="flex items-start gap-2.5">
                            {/* Avatar Elih */}
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center text-[10px] font-bold text-white shrink-0 shadow-md shadow-emerald-500/10">
                              EL
                            </div>
                            <div className="flex flex-col items-start max-w-[80%]">
                              <div className="bg-emerald-500/10 border border-emerald-500/25 text-emerald-50 rounded-2xl rounded-tl-sm px-3.5 py-2.5 shadow-sm">
                                <p className="text-xs leading-relaxed">
                                  Bom dia, Márcia! Perfeito. Mande a foto do RG dele aqui. Protocolamos na fila especial e cuidamos da isenção de carência.
                                </p>
                              </div>
                              <span className="text-[8px] text-white/30 mt-1 ml-1.5 font-mono">10:43 · Concierge Elih</span>
                            </div>
                          </div>

                          {/* Message 3: Resolution (Conditional) */}
                          {chatProgress >= 3 && (
                            <motion.div 
                              initial={{ opacity: 0, y: 12, scale: 0.98 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              className="flex items-start gap-2.5"
                            >
                              {/* Avatar Elih */}
                              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center text-[10px] font-bold text-white shrink-0 shadow-md shadow-emerald-500/10">
                                EL
                              </div>
                              <div className="flex flex-col items-start max-w-[80%]">
                                <div className="bg-emerald-500/15 border border-emerald-500/30 text-emerald-100 rounded-2xl rounded-tl-sm px-3.5 py-2.5 shadow-sm shadow-emerald-950/20">
                                  <p className="text-xs font-medium leading-relaxed">
                                    Pronto! Inclusão finalizada na operadora. A carteirinha digital foi emitida com isenção total de carências. Ele já pode realizar o procedimento!
                                  </p>
                                </div>
                                <span className="text-[8px] text-white/30 mt-1 ml-1.5 font-mono">10:51 · Concierge Elih</span>
                              </div>
                            </motion.div>
                          )}

                          {/* Message 4: Client response (Conditional) */}
                          {chatProgress >= 4 && (
                            <motion.div 
                              initial={{ opacity: 0, y: 12, scale: 0.98 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              className="flex items-start gap-2.5 justify-end"
                            >
                              <div className="flex flex-col items-end max-w-[80%]">
                                <div className="bg-white/5 border border-white/10 rounded-2xl rounded-tr-sm px-3.5 py-2.5 shadow-sm">
                                  <p className="text-xs text-white/90 leading-relaxed">
                                    Sensacional! Em menos de 10 minutos. O corretor antigo demorava dias. Muito obrigada! 🚀
                                  </p>
                                </div>
                                <span className="text-[8px] text-white/30 mt-1 mr-1.5 font-mono">10:52 · Márcia (RH)</span>
                              </div>
                              {/* Avatar Client */}
                              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-[10px] font-bold text-white shrink-0 shadow-md shadow-indigo-500/10">
                                RH
                              </div>
                            </motion.div>
                          )}

                          {/* Typing indicator */}
                          {isTyping && (
                            <div className="flex items-start gap-2.5">
                              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center text-[10px] font-bold text-white shrink-0 shadow-md shadow-emerald-500/10">
                                EL
                              </div>
                              <div className="flex gap-1.5 p-3 bg-white/5 border border-white/10 rounded-2xl rounded-tl-sm max-w-[60px] items-center justify-center">
                                <span className="w-1.5 h-1.5 bg-white/50 rounded-full animate-bounce [animation-delay:0s]" />
                                <span className="w-1.5 h-1.5 bg-white/50 rounded-full animate-bounce [animation-delay:0.2s]" />
                                <span className="w-1.5 h-1.5 bg-white/50 rounded-full animate-bounce [animation-delay:0.4s]" />
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Trigger Simulation */}
                      <button
                        onClick={handleChatSimulation}
                        disabled={isTyping}
                        className={`w-full py-3 px-4 rounded-xl text-xs font-bold transition-all duration-300 flex items-center justify-center gap-2 ${
                          chatProgress === 2
                            ? "bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-600/20 hover:scale-[1.01]"
                            : "bg-white/5 border border-white/10 text-platinum/70 hover:bg-white/10 hover:text-white"
                        }`}
                      >
                        {chatProgress === 2 ? (
                          <>
                            <Send className="w-3.5 h-3.5" />
                            Simular Resposta Rápida (Resolver Chamado)
                          </>
                        ) : (
                          <>
                            <RotateCcw className="w-3.5 h-3.5" />
                            Limpar Histórico de Chat
                          </>
                        )}
                      </button>
                    </motion.div>
                  )}

                </AnimatePresence>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
