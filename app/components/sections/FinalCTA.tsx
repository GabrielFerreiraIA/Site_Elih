"use client";

import { useMemo, useState } from "react";
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

type Option = { valor: string; rotulo: string };
type Question = {
  campo: string;
  pergunta: string;
  icon: LucideIcon;
  options: Option[];
};

// Perguntas — engenharia reversa do payload "cotacao-simplificada"
const questions: Question[] = [
  {
    campo: "tipo",
    pergunta: "Para começar, qual o seu perfil?",
    icon: UserRound,
    options: [
      { valor: "CPF", rotulo: "Pessoa Física" },
      { valor: "CNPJ", rotulo: "Empresa" },
    ],
  },
  {
    campo: "plano",
    pergunta: "O plano é individual ou familiar?",
    icon: Users,
    options: [
      { valor: "INDIVIDUAL", rotulo: "Individual" },
      { valor: "FAMILIAR", rotulo: "Familiar" },
    ],
  },
  {
    campo: "regiao",
    pergunta: "Em qual região você está?",
    icon: MapPinned,
    options: [
      { valor: "N", rotulo: "Norte" },
      { valor: "NE", rotulo: "Nordeste" },
      { valor: "CO", rotulo: "Centro-Oeste" },
      { valor: "SE", rotulo: "Sudeste" },
      { valor: "S", rotulo: "Sul" },
    ],
  },
  {
    campo: "idade",
    pergunta: "Faixa etária predominante?",
    icon: CalendarRange,
    options: [
      { valor: "0-18", rotulo: "Até 18 anos" },
      { valor: "19-33", rotulo: "19 – 33 anos" },
      { valor: "34-43", rotulo: "34 – 43 anos" },
      { valor: "44-58", rotulo: "44 – 58 anos" },
      { valor: "59+", rotulo: "59 anos ou mais" },
    ],
  },
  {
    campo: "hospital",
    pergunta: "Tem preferência por hospital ou rede?",
    icon: Building2,
    options: [
      { valor: "SIM", rotulo: "Sim, tenho preferência" },
      { valor: "NAO", rotulo: "Quero o melhor custo-benefício" },
    ],
  },
  {
    campo: "valor",
    pergunta: "Quanto você investe hoje no plano?",
    icon: Wallet,
    options: [
      { valor: "0-500", rotulo: "Até R$ 500" },
      { valor: "500-1000", rotulo: "R$ 500 a R$ 1.000" },
      { valor: "1000-2000", rotulo: "R$ 1.000 a R$ 2.000" },
      { valor: "2000+", rotulo: "Acima de R$ 2.000" },
    ],
  },
];

const NUM_Q = questions.length; // 6
const TOTAL = NUM_Q + 2; // + nome + telefone
const STEP_NOME = NUM_Q + 1; // 7
const STEP_TEL = NUM_Q + 2; // 8

type Status = "form" | "submitting" | "success" | "error";
const ease = [0.22, 1, 0.36, 1] as const;

// ─── Slide animation ──────────────────────────────────────────────────────────

const slideVariants = {
  enter: (dir: number) => ({ opacity: 0, x: dir * 40, filter: "blur(6px)" }),
  center: { opacity: 1, x: 0, filter: "blur(0px)" },
  exit: (dir: number) => ({ opacity: 0, x: dir * -40, filter: "blur(6px)" }),
};
const slideReduced = {
  enter: { opacity: 0 },
  center: { opacity: 1 },
  exit: { opacity: 0 },
};

// ─── Icon mapper ──────────────────────────────────────────────────────────────

function getOptionIcon(campo: string, valor: string): LucideIcon | null {
  const iconMap: Record<string, Record<string, LucideIcon>> = {
    tipo: {
      CPF: User,
      CNPJ: Building2,
    },
    plano: {
      INDIVIDUAL: User,
      FAMILIAR: Users,
    },
    hospital: {
      SIM: Heart,
      NAO: ThumbsUp,
    },
  };
  return iconMap[campo]?.[valor] ?? null;
}

// ─── Badge (elemento da imagem de referência) ──────────────────────────────────

function QuoteBadge() {
  return (
    <span className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-corp-navy shadow-[0_8px_22px_-10px_rgba(2,6,23,0.6)] relative overflow-hidden">
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-full edge edge-soft"
      />
      <span className="font-grotesk text-[10px] uppercase tracking-[0.18em] text-platinum/85 relative">
        Cotação simplificada
      </span>
    </span>
  );
}

// ─── FinalCTA ─────────────────────────────────────────────────────────────────

export default function FinalCTA() {
  const reduced = useReducedMotion();

  const [step, setStep] = useState(0); // 0 = intro
  const [dir, setDir] = useState(1);
  const [status, setStatus] = useState<Status>("form");
  const [errorMsg, setErrorMsg] = useState("");

  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");

  const go = (nextStep: number, direction: number) => {
    setDir(direction);
    setStep(nextStep);
  };
  const next = () => go(step + 1, 1);
  const back = () => go(step - 1, -1);

  const nomeValid = nome.trim().length >= 2;
  const phoneValid = digitsOnly(telefone).length >= 10;

  function select(campo: string, valor: string) {
    setAnswers((a) => ({ ...a, [campo]: valor }));
    setTimeout(() => go(step + 1, 1), 200);
  }

  const respostas: RespostaEntry[] = useMemo(
    () =>
      questions.map((q) => {
        const valor = answers[q.campo] ?? "";
        const opt = q.options.find((o) => o.valor === valor);
        return {
          campo: q.campo,
          pergunta: q.pergunta,
          valor,
          rotulo: opt?.rotulo ?? valor,
        };
      }),
    [answers]
  );

  async function handleSubmit() {
    setStatus("submitting");
    setErrorMsg("");
    const payload = buildLeadPayload({ contact: { nome, telefone }, respostas });
    const res = await submitLead(payload);
    if (res.ok) setStatus("success");
    else {
      setStatus("error");
      setErrorMsg(res.error ?? "Falha no envio");
    }
  }

  const progress = step === 0 ? 0 : (step / TOTAL) * 100;
  const currentQuestion = step >= 1 && step <= NUM_Q ? questions[step - 1] : null;

  return (
    <section
      id="contato"
      className="relative isolate overflow-hidden bg-pristine text-graphite border-t border-soft-slate"
    >
      {/* Background — light, discreet */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_55%_50%_at_85%_10%,rgba(226,232,240,0.6),transparent_65%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          backgroundImage:
            "linear-gradient(rgba(15,23,42,0.028) 1px, transparent 1px), linear-gradient(90deg, rgba(15,23,42,0.028) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 60% at 50% 40%, #000 20%, transparent 75%)",
          maskImage:
            "radial-gradient(ellipse 70% 60% at 50% 40%, #000 20%, transparent 75%)",
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
                { icon: ShieldCheck, t: "Sem compromisso · dados protegidos (LGPD)" },
              ].map((it) => (
                <li key={it.t} className="flex items-center gap-3">
                  <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-clinical border border-slate-200 shrink-0">
                    <it.icon
                      className="w-3.5 h-3.5 text-corp-navy/70"
                      strokeWidth={1.5}
                      aria-hidden
                    />
                  </span>
                  {it.t}
                </li>
              ))}
            </ul>
          </div>

          {/* ── RIGHT — interactive quiz card ── */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6 }}
              className="relative rounded-[24px] bg-corp-navy glass-dark border border-white/[0.08] shadow-[0_30px_80px_-20px_rgba(2,6,23,0.7)] overflow-hidden"
            >
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-[24px] edge edge-soft"
              />
              <div className="relative p-6 sm:p-8 lg:p-9 min-h-[470px] flex flex-col">

                {/* Top bar: badge + progress */}
                <div className="flex items-center justify-between gap-4 mb-7">
                  <QuoteBadge />
                  {status === "form" && step > 0 && (
                    <span className="font-grotesk text-[11px] uppercase tracking-[0.14em] text-platinum/50 tabular-nums shrink-0">
                      {step} / {TOTAL}
                    </span>
                  )}
                </div>

                {/* Progress bar + back (oculto no intro/sucesso/erro) */}
                {status === "form" && step > 0 && (
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

                    {status === "success" ? (
                      /* ── SUCCESS ── */
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
                        <h3 className="text-2xl font-bold text-pristine">
                          Cotação recebida!
                        </h3>
                        <p className="mt-3 text-sm text-platinum/70 max-w-sm leading-relaxed">
                          Obrigado, {nome.split(" ")[0] || "tudo certo"}. Um
                          consultor da Elih vai entrar em contato pelo WhatsApp em
                          breve com as melhores condições.
                        </p>
                      </motion.div>
                    ) : status === "error" ? (
                      /* ── ERROR ── */
                      <motion.div
                        key="error"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex-1 flex flex-col items-center justify-center text-center"
                      >
                        <span className="flex items-center justify-center w-16 h-16 rounded-full bg-red-500/20 border border-red-500/40 mb-6">
                          <AlertCircle className="w-8 h-8 text-red-400" strokeWidth={2} />
                        </span>
                        <h3 className="text-xl font-bold text-pristine">
                          Não foi possível enviar agora
                        </h3>
                        <p className="mt-2.5 text-sm text-platinum/70 max-w-sm leading-relaxed">
                          Tente novamente em instantes. Se persistir, fale direto
                          com a gente.
                        </p>
                        {errorMsg && (
                          <p className="mt-2 text-[11px] text-platinum/50 font-mono">
                            {errorMsg}
                          </p>
                        )}
                        <button
                          type="button"
                          onClick={() => setStatus("form")}
                          className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 text-pristine text-sm font-semibold hover:bg-blue-700 transition-colors"
                        >
                          Tentar novamente
                        </button>
                      </motion.div>
                    ) : step === 0 ? (
                      /* ── INTRO ── */
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
                    ) : currentQuestion ? (
                      /* ── QUESTÃO DE ESCOLHA ── */
                      <motion.div
                        key={currentQuestion.campo}
                        custom={dir}
                        variants={reduced ? slideReduced : slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.4, ease }}
                        className="flex-1 flex flex-col"
                      >
                        <StepHeading
                          icon={currentQuestion.icon}
                          label={currentQuestion.pergunta}
                        />
                        {currentQuestion.options.length === 2 ? (
                          /* ── 2 OPÇÕES: CARDS COM ÍCONE EM CIMA ── */
                          <div className="mt-8 grid grid-cols-2 gap-4">
                            {currentQuestion.options.map((opt) => {
                              const selected =
                                answers[currentQuestion.campo] === opt.valor;
                              const Icon = getOptionIcon(currentQuestion.campo, opt.valor);
                              return (
                                <button
                                  key={opt.valor}
                                  type="button"
                                  onClick={() =>
                                    select(currentQuestion.campo, opt.valor)
                                  }
                                  className={`group relative flex flex-col items-center justify-center gap-3 rounded-2xl p-6 border transition-all duration-200 ${
                                    selected
                                      ? "bg-blue-600/20 border-blue-400/60 shadow-[0_8px_24px_-8px_rgba(59,130,246,0.3)]"
                                      : "bg-platinum/5 border-platinum/20 hover:bg-platinum/10 hover:border-platinum/30 hover:shadow-[0_4px_16px_-8px_rgba(226,232,240,0.2)]"
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
                          /* ── 3+ OPÇÕES: LISTA VERTICAL ── */
                          <div className="mt-6 space-y-3">
                            {currentQuestion.options.map((opt) => {
                              const selected =
                                answers[currentQuestion.campo] === opt.valor;
                              return (
                                <button
                                  key={opt.valor}
                                  type="button"
                                  onClick={() =>
                                    select(currentQuestion.campo, opt.valor)
                                  }
                                  className={`group relative w-full text-left rounded-2xl p-4 border transition-all duration-200 ${
                                    selected
                                      ? "bg-blue-600/20 border-blue-400/60 shadow-[0_4px_16px_-8px_rgba(59,130,246,0.3)]"
                                      : "bg-platinum/5 border-platinum/20 hover:bg-platinum/10 hover:border-platinum/30 hover:shadow-[0_4px_16px_-8px_rgba(226,232,240,0.2)]"
                                  }`}
                                >
                                  <span className="flex items-center justify-between gap-2">
                                    <span className={`text-[0.95rem] font-semibold leading-snug transition-colors ${
                                      selected ? "text-pristine" : "text-platinum/80 group-hover:text-platinum/95"
                                    }`}>
                                      {opt.rotulo}
                                    </span>
                                    <span
                                      className={`flex items-center justify-center w-5 h-5 rounded-full border shrink-0 transition-all ${
                                        selected
                                          ? "bg-blue-400 border-blue-400"
                                          : "border-platinum/40 group-hover:border-platinum/60"
                                      }`}
                                    >
                                      {selected && (
                                        <Check className="w-3 h-3 text-obsidian" strokeWidth={3} />
                                      )}
                                    </span>
                                  </span>
                                </button>
                              );
                            })}
                          </div>
                        )}
                      </motion.div>
                    ) : step === STEP_NOME ? (
                      /* ── NOME (penúltima) ── */
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
                          <NextButton
                            label="Continuar"
                            disabled={!nomeValid}
                            onClick={next}
                          />
                        </div>
                      </motion.div>
                    ) : (
                      /* ── TELEFONE (última — só após enviar o nome) ── */
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
                        <StepHeading
                          icon={Phone}
                          label="Para qual WhatsApp enviamos a cotação?"
                        />
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

// ─── Sub-components ─────────────────────────────────────────────────────────────

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
