"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  ArrowLeft,
  Check,
  Loader2,
  AlertCircle,
  CalendarCheck,
  ShieldCheck,
  TrendingDown,
  User,
  Phone,
  UserRound,
  Users,
  MapPinned,
  CalendarRange,
  Building2,
  Wallet,
  Heart,
  ThumbsUp,
  Plus,
  Minus,
  Briefcase,
  type LucideIcon,
} from "lucide-react";
import Overline from "../primitives/Overline";
import {
  buildLeadPayload,
  submitLead,
  formatPhoneBR,
  digitsOnly,
  type RespostaEntry,
} from "../../../lib/leadPayload";

// ─── Config ───────────────────────────────────────────────────────────────────

const REDUCAO = "30%";
const ease = [0.22, 1, 0.36, 1] as const;

// ─── Types ────────────────────────────────────────────────────────────────────

type Option = { valor: string; rotulo: string; desc?: string };

type SelectDef = {
  type: "select";
  campo: string;
  pergunta: string;
  icon: LucideIcon;
  options: Option[];
};

// Faixas etárias ANS (RN 63/2003) — 10 faixas oficiais com impacto real no preço
type VidasBracket = { key: string; rotulo: string; short: string };

type VidasDef = {
  type: "vidas";
  campo: string;
  perguntaCPF: string;
  perguntaCNPJ: string;
  icon: LucideIcon;
  brackets: VidasBracket[];
};

type StepDef = SelectDef | VidasDef;
type QuizStepName = "tipo" | "porte" | "plano" | "regiao" | "idade" | "vidas" | "hospital" | "valor";
type StepName = QuizStepName | "nome" | "tel";
type CurStep = "intro" | StepName;

type Answers = Record<string, string>;
type VidasCounts = Record<string, number>;

// ─── Step definitions ─────────────────────────────────────────────────────────

const STEPS: Record<QuizStepName, StepDef> = {
  tipo: {
    type: "select",
    campo: "tipo",
    pergunta: "Para começar, qual o seu perfil?",
    icon: UserRound,
    options: [
      { valor: "CPF",  rotulo: "Pessoa Física" },
      { valor: "CNPJ", rotulo: "Empresa" },
    ],
  },

  // Pergunta exclusiva para CNPJ — porte impacta elegibilidade e operadoras disponíveis
  porte: {
    type: "select",
    campo: "porte",
    pergunta: "Como a empresa está constituída?",
    icon: Briefcase,
    options: [
      { valor: "MEI",        rotulo: "MEI",                desc: "Microempreendedor Individual" },
      { valor: "ME_EPP",     rotulo: "Micro / Pequena",    desc: "ME ou EPP — até ~50 funcionários" },
      { valor: "MEDIO",      rotulo: "Média Empresa",      desc: "LTDA / S.A. — 50 a 200 funcionários" },
      { valor: "GRANDE",     rotulo: "Grande Empresa",     desc: "LTDA / S.A. — acima de 200 funcionários" },
    ],
  },

  plano: {
    type: "select",
    campo: "plano",
    pergunta: "O plano é individual ou familiar?",
    icon: Users,
    options: [
      { valor: "INDIVIDUAL", rotulo: "Individual" },
      { valor: "FAMILIAR",   rotulo: "Familiar" },
    ],
  },

  regiao: {
    type: "select",
    campo: "regiao",
    pergunta: "Em qual região você está?",
    icon: MapPinned,
    options: [
      { valor: "N",  rotulo: "Norte" },
      { valor: "NE", rotulo: "Nordeste" },
      { valor: "CO", rotulo: "Centro-Oeste" },
      { valor: "SE", rotulo: "Sudeste" },
      { valor: "S",  rotulo: "Sul" },
    ],
  },

  // Usado apenas para CPF + INDIVIDUAL (uma única pessoa)
  idade: {
    type: "select",
    campo: "idade",
    pergunta: "Qual é a sua faixa etária?",
    icon: CalendarRange,
    options: [
      { valor: "0-18",  rotulo: "Até 18 anos" },
      { valor: "19-28", rotulo: "19 – 28 anos" },
      { valor: "29-38", rotulo: "29 – 38 anos" },
      { valor: "39-48", rotulo: "39 – 48 anos" },
      { valor: "49-58", rotulo: "49 – 58 anos" },
      { valor: "59+",   rotulo: "59 anos ou mais" },
    ],
  },

  // 6 faixas agrupadas pelos saltos reais de precificação ANS
  // 0-18 (pediátrico) · 19-28 (mais barato) · 29-38 · 39-48 · 49-58 · 59+ (até 6×)
  vidas: {
    type: "vidas",
    campo: "vidas",
    perguntaCPF:  "Quem são os beneficiários do plano?",
    perguntaCNPJ: "Quantas vidas por faixa etária?",
    icon: CalendarRange,
    brackets: [
      { key: "0-18",  short: "0–18",  rotulo: "Até 18 anos" },
      { key: "19-28", short: "19–28", rotulo: "19 – 28 anos" },
      { key: "29-38", short: "29–38", rotulo: "29 – 38 anos" },
      { key: "39-48", short: "39–48", rotulo: "39 – 48 anos" },
      { key: "49-58", short: "49–58", rotulo: "49 – 58 anos" },
      { key: "59+",   short: "59+",   rotulo: "59 anos ou mais" },
    ],
  },

  hospital: {
    type: "select",
    campo: "hospital",
    pergunta: "Tem preferência por hospital ou rede?",
    icon: Building2,
    options: [
      { valor: "SIM", rotulo: "Sim, tenho preferência" },
      { valor: "NAO", rotulo: "Quero o melhor custo-benefício" },
    ],
  },

  valor: {
    type: "select",
    campo: "valor",
    pergunta: "Qual é o investimento mensal em saúde?",
    icon: Wallet,
    options: [
      { valor: "0-500",     rotulo: "Até R$ 500" },
      { valor: "500-1000",  rotulo: "R$ 500 a R$ 1.000" },
      { valor: "1000-2000", rotulo: "R$ 1.000 a R$ 2.000" },
      { valor: "2000+",     rotulo: "Acima de R$ 2.000" },
    ],
  },
};

const ALL_STEPS: StepName[] = [
  "tipo", "porte", "plano", "regiao", "idade", "vidas", "hospital", "valor", "nome", "tel",
];

// Recalcula quais steps são visíveis a partir das respostas atuais
function getVisibleSteps(answers: Answers): StepName[] {
  const tipo  = answers.tipo;
  const plano = answers.plano;
  return ALL_STEPS.filter((s) => {
    if (s === "porte")  return tipo === "CNPJ";
    if (s === "plano")  return tipo === "CPF";
    if (s === "idade")  return tipo === "CPF" && plano === "INDIVIDUAL";
    if (s === "vidas")  return tipo === "CNPJ" || (tipo === "CPF" && plano === "FAMILIAR");
    return true;
  });
}

// ─── Animations ───────────────────────────────────────────────────────────────

const slideVariants = {
  enter:  (dir: number) => ({ opacity: 0, x: dir * 40, filter: "blur(6px)" }),
  center: { opacity: 1, x: 0, filter: "blur(0px)" },
  exit:   (dir: number) => ({ opacity: 0, x: dir * -40, filter: "blur(6px)" }),
};
const slideReduced = {
  enter:  { opacity: 0 },
  center: { opacity: 1 },
  exit:   { opacity: 0 },
};

// ─── Icon mapper ──────────────────────────────────────────────────────────────

function getOptionIcon(campo: string, valor: string): LucideIcon | null {
  const map: Record<string, Record<string, LucideIcon>> = {
    tipo:     { CPF: User, CNPJ: Building2 },
    plano:    { INDIVIDUAL: User, FAMILIAR: Users },
    hospital: { SIM: Heart, NAO: ThumbsUp },
  };
  return map[campo]?.[valor] ?? null;
}

// ─── Badge ────────────────────────────────────────────────────────────────────

function QuoteBadge() {
  return (
    <span className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-corp-navy shadow-[0_8px_22px_-10px_rgba(2,6,23,0.6)] relative overflow-hidden">
      <span aria-hidden className="pointer-events-none absolute inset-0 rounded-full edge edge-soft" />
      <span className="font-grotesk text-[10px] uppercase tracking-[0.18em] text-platinum/85 relative">
        Cotação simplificada
      </span>
    </span>
  );
}

// ─── FinalCTA ─────────────────────────────────────────────────────────────────

export default function FinalCTA() {
  const reduced = useReducedMotion();
  const router  = useRouter();

  const [currentStep, setCurrentStep] = useState<CurStep>("intro");
  const [dir, setDir] = useState(1);
  const [status, setStatus] = useState<"form" | "submitting" | "success" | "error">("form");
  const [errorMsg, setErrorMsg] = useState("");

  const [answers, setAnswers]         = useState<Answers>({});
  const [vidasCounts, setVidasCounts] = useState<VidasCounts>({});
  const [nome, setNome]               = useState("");
  const [telefone, setTelefone]       = useState("");

  const visibleSteps = useMemo(() => getVisibleSteps(answers), [answers]);
  const stepIdx      = currentStep === "intro" ? -1 : visibleSteps.indexOf(currentStep as StepName);
  const total        = visibleSteps.length;
  const progress     = currentStep === "intro" ? 0 : ((stepIdx + 1) / total) * 100;

  const nomeValid  = nome.trim().length >= 2;
  const phoneValid = digitsOnly(telefone).length >= 10;

  function goTo(step: CurStep, direction: number) {
    setDir(direction);
    setCurrentStep(step);
  }

  function next() {
    if (currentStep === "intro") { goTo("tipo", 1); return; }
    if (stepIdx < total - 1) goTo(visibleSteps[stepIdx + 1], 1);
  }

  function back() {
    if (currentStep === "tipo" || stepIdx <= 0) { goTo("intro", -1); return; }
    goTo(visibleSteps[stepIdx - 1], -1);
  }

  function select(campo: string, valor: string) {
    const newAnswers   = { ...answers, [campo]: valor };
    setAnswers(newAnswers);
    const newVisible   = getVisibleSteps(newAnswers);
    const idx          = newVisible.indexOf(currentStep as StepName);
    setTimeout(() => {
      if (idx < newVisible.length - 1) goTo(newVisible[idx + 1], 1);
    }, 200);
  }

  function adjustVidas(key: string, delta: number) {
    setVidasCounts((c) => ({ ...c, [key]: Math.max(0, (c[key] ?? 0) + delta) }));
  }

  const respostas: RespostaEntry[] = useMemo(() => {
    const entries: RespostaEntry[] = [];
    for (const s of visibleSteps) {
      if (s === "nome" || s === "tel") continue;
      if (s === "vidas") {
        const def = STEPS.vidas as VidasDef;
        const tot = Object.values(vidasCounts).reduce((sum, n) => sum + n, 0);
        entries.push({
          campo: "vidas_total",
          pergunta: "Total de vidas",
          valor: String(tot),
          rotulo: `${tot} vida${tot !== 1 ? "s" : ""}`,
        });
        for (const b of def.brackets) {
          const count = vidasCounts[b.key] ?? 0;
          entries.push({
            campo: `vidas_${b.key.replace(/[^a-z0-9]/gi, "_")}`,
            pergunta: `Vidas ${b.rotulo}`,
            valor: String(count),
            rotulo: `${count} vida${count !== 1 ? "s" : ""}`,
          });
        }
        continue;
      }
      const def = STEPS[s as QuizStepName] as SelectDef;
      if (!def || def.type !== "select") continue;
      const valor = answers[s] ?? "";
      const opt   = def.options.find((o) => o.valor === valor);
      entries.push({ campo: s, pergunta: def.pergunta, valor, rotulo: opt?.rotulo ?? valor });
    }
    return entries;
  }, [visibleSteps, answers, vidasCounts]);

  async function handleSubmit() {
    setStatus("submitting");
    setErrorMsg("");
    const payload = buildLeadPayload({ contact: { nome, telefone }, respostas });
    const res     = await submitLead(payload);
    if (res.ok) {
      const params = new URLSearchParams({
        nome: nome.trim(),
        tipo: answers.tipo ?? "",
      });
      router.push(`/obrigado?${params.toString()}`);
    } else {
      setStatus("error");
      setErrorMsg(res.error ?? "Falha no envio");
    }
  }

  const currentDef: StepDef | null =
    currentStep !== "intro" && currentStep !== "nome" && currentStep !== "tel"
      ? (STEPS[currentStep as QuizStepName] ?? null)
      : null;

  return (
    <section
      id="contato"
      className="relative isolate overflow-hidden bg-pristine text-graphite border-t border-soft-slate"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_55%_50%_at_85%_10%,rgba(226,232,240,0.6),transparent_65%)]" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          backgroundImage: "linear-gradient(rgba(15,23,42,0.028) 1px, transparent 1px), linear-gradient(90deg, rgba(15,23,42,0.028) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 50% 40%, #000 20%, transparent 75%)",
          maskImage: "radial-gradient(ellipse 70% 60% at 50% 40%, #000 20%, transparent 75%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* ── LEFT — copy ── */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5 }}
            >
              <Overline tone="light">O convite consultivo</Overline>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-5 text-3xl sm:text-4xl lg:text-[2.6rem] lg:leading-[1.1] font-bold tracking-tight text-balance text-obsidian"
            >
              Pague menos pelo plano de saúde ideal.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-5 text-base sm:text-lg leading-relaxed text-slate-600 text-balance"
            >
              Responda algumas perguntas rápidas e um consultor da Elih retorna
              com as melhores condições do mercado para o seu perfil.
            </motion.p>

            <ul className="mt-9 space-y-3.5 text-sm text-slate-600 font-medium">
              {[
                { icon: TrendingDown, t: `Até ${REDUCAO} de economia no valor atual` },
                { icon: CalendarCheck, t: "Retorno consultivo em até 1 dia útil" },
                { icon: ShieldCheck,   t: "Sem compromisso · dados protegidos (LGPD)" },
              ].map((it) => (
                <li key={it.t} className="flex items-center gap-3">
                  <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-clinical border border-slate-200 shrink-0">
                    <it.icon className="w-3.5 h-3.5 text-corp-navy/70" strokeWidth={1.5} aria-hidden />
                  </span>
                  {it.t}
                </li>
              ))}
            </ul>
          </div>

          {/* ── RIGHT — quiz card ── */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6 }}
              className="relative rounded-[24px] bg-corp-navy glass-dark border border-white/[0.08] shadow-[0_30px_80px_-20px_rgba(2,6,23,0.7)] overflow-hidden"
            >
              <span aria-hidden className="pointer-events-none absolute inset-0 rounded-[24px] edge edge-soft" />
              <div className="relative p-6 sm:p-8 lg:p-9 min-h-[470px] flex flex-col">

                {/* Top bar */}
                <div className="flex items-center justify-between gap-4 mb-7">
                  <QuoteBadge />
                  {status === "form" && currentStep !== "intro" && (
                    <span className="font-grotesk text-[11px] uppercase tracking-[0.14em] text-platinum/50 tabular-nums shrink-0">
                      {stepIdx + 1} / {total}
                    </span>
                  )}
                </div>

                {/* Progress + back */}
                {status === "form" && currentStep !== "intro" && (
                  <div className="mb-7">
                    <div className="h-1 rounded-full bg-platinum/10 overflow-hidden">
                      <motion.div
                        className="h-full rounded-full bg-gradient-to-r from-blue-400 to-cyan-300"
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.5, ease }}
                      />
                    </div>
                    <button
                      type="button"
                      onClick={back}
                      className="mt-3 inline-flex items-center gap-1.5 text-[11px] font-grotesk uppercase tracking-[0.14em] text-platinum/50 hover:text-platinum/85 transition-colors"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" aria-hidden />
                      Voltar
                    </button>
                  </div>
                )}

                {/* Body */}
                <div className="flex-1 flex flex-col">
                  <AnimatePresence mode="wait" custom={dir}>

                    {/* SUCCESS */}
                    {status === "success" ? (
                      <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.96 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, ease }}
                        className="flex-1 flex flex-col items-center justify-center text-center"
                      >
                        <motion.span
                          initial={reduced ? false : { scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.1 }}
                          className="flex items-center justify-center w-16 h-16 rounded-full bg-blue-400/20 border border-blue-400/40 mb-6"
                        >
                          <Check className="w-8 h-8 text-blue-300" strokeWidth={2.5} />
                        </motion.span>
                        <h3 className="text-2xl font-bold text-pristine">Cotação recebida!</h3>
                        <p className="mt-3 text-sm text-platinum/70 max-w-sm leading-relaxed">
                          Obrigado, {nome.split(" ")[0] || "tudo certo"}. Um consultor da Elih
                          vai entrar em contato pelo WhatsApp em breve com as melhores condições.
                        </p>
                      </motion.div>

                    ) : status === "error" ? (
                    /* ERROR */
                      <motion.div
                        key="error"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex-1 flex flex-col items-center justify-center text-center"
                      >
                        <span className="flex items-center justify-center w-16 h-16 rounded-full bg-red-500/20 border border-red-500/40 mb-6">
                          <AlertCircle className="w-8 h-8 text-red-400" strokeWidth={2} />
                        </span>
                        <h3 className="text-xl font-bold text-pristine">Não foi possível enviar agora</h3>
                        <p className="mt-2.5 text-sm text-platinum/70 max-w-sm leading-relaxed">
                          Tente novamente em instantes. Se persistir, fale direto com a gente.
                        </p>
                        {errorMsg && (
                          <p className="mt-2 text-[11px] text-platinum/50 font-mono">{errorMsg}</p>
                        )}
                        <button
                          type="button"
                          onClick={() => setStatus("form")}
                          className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 text-pristine text-sm font-semibold hover:bg-blue-700 transition-colors"
                        >
                          Tentar novamente
                        </button>
                      </motion.div>

                    ) : currentStep === "intro" ? (
                    /* INTRO */
                      <motion.div
                        key="intro"
                        custom={dir}
                        variants={reduced ? slideReduced : slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.4, ease }}
                        className="flex-1 flex flex-col justify-center"
                      >
                        <h3 className="text-2xl sm:text-[1.75rem] font-bold text-pristine leading-tight text-balance">
                          Faça sua cotação simples — você pode reduzir em até{" "}
                          <span className="text-blue-300">{REDUCAO}</span> o valor
                          do seu plano de saúde atual.
                        </h3>
                        <p className="mt-4 text-sm sm:text-base text-platinum/70 leading-relaxed">
                          São perguntas rápidas e diretas. Leva menos de um minuto.
                        </p>
                        <button
                          type="button"
                          onClick={next}
                          className="group mt-8 relative inline-flex self-start items-center gap-2.5 px-6 py-3.5 rounded-[11px] text-sm font-semibold text-obsidian overflow-hidden transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-obsidian"
                          style={{
                            background: "linear-gradient(160deg, rgba(255,255,255,0.96) 0%, rgba(241,245,249,0.92) 100%)",
                            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.9), 0 0 0 1px rgba(15,23,42,0.72), 0 4px 14px -4px rgba(15,23,42,0.18)",
                          }}
                        >
                          <span aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white to-transparent opacity-80" />
                          <span aria-hidden className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200" style={{ background: "linear-gradient(160deg, rgba(15,23,42,0.04) 0%, rgba(15,23,42,0.08) 100%)" }} />
                          <span className="relative">Começar cotação</span>
                          <ArrowRight className="relative w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" aria-hidden />
                        </button>
                      </motion.div>

                    ) : currentDef?.type === "select" ? (
                    /* SELECT STEP */
                      <SelectStep
                        key={currentDef.campo}
                        def={currentDef}
                        answers={answers}
                        dir={dir}
                        reduced={!!reduced}
                        onSelect={select}
                      />

                    ) : currentDef?.type === "vidas" ? (
                    /* VIDAS COUNTER */
                      <VidasCounterStep
                        key="vidas"
                        def={currentDef}
                        answers={answers}
                        counts={vidasCounts}
                        dir={dir}
                        reduced={!!reduced}
                        onChange={adjustVidas}
                        onContinue={next}
                      />

                    ) : currentStep === "nome" ? (
                    /* NOME */
                      <motion.div
                        key="nome"
                        custom={dir}
                        variants={reduced ? slideReduced : slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.4, ease }}
                        className="flex-1 flex flex-col"
                      >
                        <StepHeading icon={User} label="Como podemos te chamar?" />
                        <div className="mt-7 flex-1 flex flex-col">
                          <TextField
                            value={nome}
                            onChange={setNome}
                            onEnter={() => nomeValid && next()}
                            placeholder="Seu nome completo"
                            autoFocus
                          />
                          <NextButton label="Continuar" disabled={!nomeValid} onClick={next} />
                        </div>
                      </motion.div>

                    ) : (
                    /* TELEFONE */
                      <motion.div
                        key="telefone"
                        custom={dir}
                        variants={reduced ? slideReduced : slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.4, ease }}
                        className="flex-1 flex flex-col"
                      >
                        <StepHeading icon={Phone} label="Para qual WhatsApp enviamos a cotação?" />
                        <div className="mt-7 flex-1 flex flex-col">
                          <TextField
                            value={telefone}
                            onChange={(v) => setTelefone(formatPhoneBR(v))}
                            onEnter={() => phoneValid && handleSubmit()}
                            placeholder="(11) 99999-8888"
                            inputMode="tel"
                            autoFocus
                          />
                          <p className="mt-3 text-xs text-slate-400 flex items-center gap-1.5">
                            <ShieldCheck className="w-3.5 h-3.5" aria-hidden />
                            Usamos apenas para o retorno da cotação.
                          </p>
                          <NextButton
                            label="Solicitar cotação"
                            disabled={!phoneValid}
                            onClick={handleSubmit}
                          />
                        </div>
                      </motion.div>
                    )}

                  </AnimatePresence>
                </div>

                {/* Submitting overlay */}
                {status === "submitting" && (
                  <div className="absolute inset-0 z-10 flex items-center justify-center bg-obsidian/70 backdrop-blur-sm rounded-[24px]">
                    <span className="flex flex-col items-center gap-3 text-platinum">
                      <Loader2 className="w-7 h-7 animate-spin text-blue-400" />
                      <span className="font-grotesk text-[11px] uppercase tracking-[0.16em] text-platinum/70">
                        Enviando…
                      </span>
                    </span>
                  </div>
                )}
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}

// ─── SelectStep ───────────────────────────────────────────────────────────────

function SelectStep({
  def,
  answers,
  dir,
  reduced,
  onSelect,
}: {
  def: SelectDef;
  answers: Answers;
  dir: number;
  reduced: boolean;
  onSelect: (campo: string, valor: string) => void;
}) {
  return (
    <motion.div
      custom={dir}
      variants={reduced ? slideReduced : slideVariants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{ duration: 0.4, ease }}
      className="flex-1 flex flex-col"
    >
      <StepHeading icon={def.icon} label={def.pergunta} />

      {def.options.length === 2 ? (
        /* 2 opções: cards com ícone */
        <div className="mt-8 grid grid-cols-2 gap-4">
          {def.options.map((opt) => {
            const selected = answers[def.campo] === opt.valor;
            const Icon     = getOptionIcon(def.campo, opt.valor);
            return (
              <button
                key={opt.valor}
                type="button"
                onClick={() => onSelect(def.campo, opt.valor)}
                className={`group relative flex flex-col items-center justify-center gap-3 rounded-2xl p-6 border transition-all duration-200 ${
                  selected
                    ? "bg-blue-600/20 border-blue-400/60 shadow-[0_8px_24px_-8px_rgba(59,130,246,0.3)]"
                    : "bg-platinum/5 border-platinum/20 hover:bg-platinum/10 hover:border-platinum/30"
                }`}
              >
                {Icon && (
                  <Icon
                    className={`w-8 h-8 transition-colors ${
                      selected ? "text-blue-300" : "text-platinum/60 group-hover:text-platinum/80"
                    }`}
                    strokeWidth={1.5}
                    aria-hidden
                  />
                )}
                <span className={`text-sm font-semibold text-center leading-snug transition-colors ${
                  selected ? "text-pristine" : "text-platinum/80 group-hover:text-platinum/95"
                }`}>
                  {opt.rotulo}
                </span>
                {selected && (
                  <span className="absolute top-2 right-2 flex items-center justify-center w-5 h-5 rounded-full bg-blue-400 border border-blue-300">
                    <Check className="w-3 h-3 text-obsidian" strokeWidth={3} />
                  </span>
                )}
              </button>
            );
          })}
        </div>
      ) : (
        /* 3+ opções: lista vertical com desc opcional */
        <div className="mt-5 space-y-2.5">
          {def.options.map((opt) => {
            const selected = answers[def.campo] === opt.valor;
            return (
              <button
                key={opt.valor}
                type="button"
                onClick={() => onSelect(def.campo, opt.valor)}
                className={`group relative w-full text-left rounded-2xl px-4 py-3 border transition-all duration-200 ${
                  selected
                    ? "bg-blue-600/20 border-blue-400/60 shadow-[0_4px_16px_-8px_rgba(59,130,246,0.3)]"
                    : "bg-platinum/5 border-platinum/20 hover:bg-platinum/10 hover:border-platinum/30"
                }`}
              >
                <span className="flex items-center justify-between gap-3">
                  <span className="min-w-0">
                    <span className={`block text-[0.95rem] font-semibold leading-snug transition-colors ${
                      selected ? "text-pristine" : "text-platinum/80 group-hover:text-platinum/95"
                    }`}>
                      {opt.rotulo}
                    </span>
                    {opt.desc && (
                      <span className={`block text-[11px] mt-0.5 transition-colors ${
                        selected ? "text-blue-300/80" : "text-platinum/40 group-hover:text-platinum/55"
                      }`}>
                        {opt.desc}
                      </span>
                    )}
                  </span>
                  <span className={`flex items-center justify-center w-5 h-5 rounded-full border shrink-0 transition-all ${
                    selected ? "bg-blue-400 border-blue-400" : "border-platinum/40 group-hover:border-platinum/60"
                  }`}>
                    {selected && <Check className="w-3 h-3 text-obsidian" strokeWidth={3} />}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      )}
    </motion.div>
  );
}

// ─── VidasCounterStep ─────────────────────────────────────────────────────────

function VidasCounterStep({
  def,
  answers,
  counts,
  dir,
  reduced,
  onChange,
  onContinue,
}: {
  def: VidasDef;
  answers: Answers;
  counts: VidasCounts;
  dir: number;
  reduced: boolean;
  onChange: (key: string, delta: number) => void;
  onContinue: () => void;
}) {
  const total    = Object.values(counts).reduce((s, n) => s + n, 0);
  const pergunta = answers.tipo === "CNPJ" ? def.perguntaCNPJ : def.perguntaCPF;
  const isCNPJ   = answers.tipo === "CNPJ";

  return (
    <motion.div
      custom={dir}
      variants={reduced ? slideReduced : slideVariants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{ duration: 0.4, ease }}
      className="flex-1 flex flex-col"
    >
      <StepHeading icon={def.icon} label={pergunta} />
      <p className="mt-1.5 text-[12px] text-platinum/50 leading-relaxed">
        {isCNPJ
          ? "6 faixas pelos saltos reais de preço ANS. Use +10 para entradas rápidas."
          : "Informe quantas pessoas da família estão em cada faixa etária."}
      </p>

      {/* 6 faixas — cabem sem scroll */}
      <div className="mt-4 space-y-2">
        {def.brackets.map((b) => {
          const count = counts[b.key] ?? 0;
          return (
            <div
              key={b.key}
              className={`flex items-center gap-2 rounded-xl px-3 py-2 border transition-all duration-150 ${
                count > 0
                  ? "bg-blue-600/15 border-blue-400/35"
                  : "bg-platinum/[0.04] border-platinum/12"
              }`}
            >
              {/* Faixa tag */}
              <span className={`text-[10px] font-grotesk font-bold uppercase tracking-[0.08em] tabular-nums px-1.5 py-0.5 rounded-md shrink-0 w-[42px] text-center transition-colors ${
                count > 0 ? "bg-blue-400/20 text-blue-300" : "bg-platinum/10 text-platinum/35"
              }`}>
                {b.short}
              </span>

              {/* Label */}
              <span className={`flex-1 text-[13px] font-medium truncate transition-colors ${
                count > 0 ? "text-pristine" : "text-platinum/55"
              }`}>
                {b.rotulo}
              </span>

              {/* Controles: −10 − [n] + +10 */}
              <div className="flex items-center gap-1 shrink-0">
                {/* −10 */}
                <button
                  type="button"
                  onClick={() => onChange(b.key, -10)}
                  disabled={count < 10}
                  aria-label={`−10 vidas em ${b.rotulo}`}
                  className="flex items-center justify-center h-7 px-1.5 rounded-lg border border-platinum/20 text-[10px] font-bold text-platinum/50 hover:border-platinum/40 hover:text-platinum/80 disabled:opacity-20 disabled:cursor-not-allowed transition-all active:scale-95"
                >
                  −10
                </button>

                {/* − */}
                <button
                  type="button"
                  onClick={() => onChange(b.key, -1)}
                  disabled={count === 0}
                  aria-label={`Remover uma vida de ${b.rotulo}`}
                  className="flex items-center justify-center w-7 h-7 rounded-lg border border-platinum/25 text-platinum/60 hover:border-platinum/50 hover:text-platinum disabled:opacity-20 disabled:cursor-not-allowed transition-all active:scale-95"
                >
                  <Minus className="w-3 h-3" />
                </button>

                {/* Número */}
                <motion.span
                  key={count}
                  initial={{ scale: 1.25 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 500, damping: 22 }}
                  className={`text-base font-bold tabular-nums w-7 text-center transition-colors ${
                    count > 0 ? "text-blue-300" : "text-platinum/25"
                  }`}
                >
                  {count}
                </motion.span>

                {/* + */}
                <button
                  type="button"
                  onClick={() => onChange(b.key, 1)}
                  aria-label={`Adicionar uma vida de ${b.rotulo}`}
                  className="flex items-center justify-center w-7 h-7 rounded-lg border border-blue-400/35 text-blue-300 hover:bg-blue-400/15 hover:border-blue-400/60 transition-all active:scale-95"
                >
                  <Plus className="w-3 h-3" />
                </button>

                {/* +10 */}
                <button
                  type="button"
                  onClick={() => onChange(b.key, 10)}
                  aria-label={`+10 vidas em ${b.rotulo}`}
                  className="flex items-center justify-center h-7 px-1.5 rounded-lg border border-blue-400/30 text-[10px] font-bold text-blue-300/70 hover:bg-blue-400/15 hover:border-blue-400/55 hover:text-blue-300 transition-all active:scale-95"
                >
                  +10
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Total */}
      <div className="mt-3 flex items-center gap-2">
        <span className="text-xs text-platinum/45">Total:</span>
        <motion.span
          key={total}
          initial={{ scale: 1.15 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
          className={`text-sm font-bold tabular-nums transition-colors ${
            total > 0 ? "text-blue-300" : "text-platinum/25"
          }`}
        >
          {total} vida{total !== 1 ? "s" : ""}
        </motion.span>
      </div>

      <NextButton label="Continuar" disabled={total === 0} onClick={onContinue} />
    </motion.div>
  );
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function StepHeading({ icon: Icon, label }: { icon: LucideIcon; label: string }) {
  return (
    <div className="flex items-start gap-3">
      <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-blue-600/20 border border-blue-400/40 shrink-0">
        <Icon className="w-4 h-4 text-blue-300" strokeWidth={1.5} aria-hidden />
      </span>
      <h3 className="text-lg sm:text-xl font-semibold text-pristine leading-snug pt-1 text-balance">
        {label}
      </h3>
    </div>
  );
}

function TextField({
  value,
  onChange,
  onEnter,
  placeholder,
  autoFocus,
  inputMode,
}: {
  value: string;
  onChange: (v: string) => void;
  onEnter: () => void;
  placeholder: string;
  autoFocus?: boolean;
  inputMode?: "text" | "tel" | "email";
}) {
  return (
    <input
      // eslint-disable-next-line jsx-a11y/no-autofocus
      autoFocus={autoFocus}
      value={value}
      inputMode={inputMode}
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          onEnter();
        }
      }}
      placeholder={placeholder}
      className="w-full bg-transparent border-0 border-b border-platinum/40 px-0 py-3 text-2xl sm:text-3xl font-semibold text-pristine placeholder:text-platinum/50 focus:outline-none focus:border-blue-400 transition-colors"
    />
  );
}

function NextButton({
  label,
  disabled,
  onClick,
}: {
  label: string;
  disabled: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="group mt-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-blue-600 text-pristine text-sm font-semibold hover:bg-blue-700 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed shadow-[0_10px_28px_-10px_rgba(37,99,235,0.4)]"
    >
      {label}
      <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" aria-hidden />
    </button>
  );
}
