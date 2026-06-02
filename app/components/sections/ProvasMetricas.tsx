"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  animate,
  useMotionValue,
  useInView,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import {
  Users,
  TrendingDown,
  Clock,
  ChevronLeft,
  ChevronRight,
  type LucideIcon,
} from "lucide-react";
import Overline from "../primitives/Overline";

// ─── Data ─────────────────────────────────────────────────────────────────────
type Metric = {
  icon: LucideIcon;
  label: string;
  prefix?: string;
  value: number;
  decimals?: number;
  suffix?: string;
};

type Depoimento = {
  quote: string;
  author: string;
  role: string;
  metrics: Metric[];
};

const KPIS: { icon: LucideIcon; label: string; prefix?: string; suffix?: string }[] = [
  { icon: Users, label: "Vidas sob gestão" },
  { icon: TrendingDown, label: "Economia no reajuste", prefix: "−", suffix: "%" },
  { icon: Clock, label: "SLA de atendimento", suffix: "h" },
];

const depoimentos: Depoimento[] = [
  {
    quote:
      "A Elih tirou o peso operacional das costas do nosso RH. Hoje temos clareza, suporte e segurança para cuidar dos colaboradores sem perder previsibilidade financeira.",
    author: "Mariana Costa",
    role: "Diretora de RH · Grupo Industrial",
    metrics: buildMetrics([1240, 23, 24]),
  },
  {
    quote:
      "Pela primeira vez o benefício deixou de ser uma caixa-preta no orçamento. A Elih trouxe dados, negociação dura e previsibilidade real para o nosso caixa.",
    author: "Ricardo Alves",
    role: "CFO · Rede de Varejo",
    metrics: buildMetrics([3580, 18, 12]),
  },
  {
    quote:
      "Crescemos rápido e precisávamos de um parceiro à altura. A Elih estrutura nossos benefícios com a mesma exigência que temos com produto e gente.",
    author: "Patrícia Lima",
    role: "CEO · Empresa de Tecnologia",
    metrics: buildMetrics([480, 27, 8]),
  },
];

function buildMetrics(values: number[]): Metric[] {
  return KPIS.map((k, i) => ({ ...k, value: values[i] }));
}

// ─── Animated counter (numbers adapt to each testimonial) ─────────────────────
function Counter({
  value,
  decimals = 0,
  play,
}: {
  value: number;
  decimals?: number;
  play: boolean;
}) {
  const mv = useMotionValue(0);
  const [display, setDisplay] = useState("0");
  const reduced = useReducedMotion();

  const fmt = (n: number) =>
    n.toLocaleString("pt-BR", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });

  useEffect(() => {
    if (!play) return;
    if (reduced) {
      setDisplay(fmt(value));
      return;
    }
    const controls = animate(mv, value, {
      duration: 1.1,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => setDisplay(fmt(latest)),
    });
    return controls.stop;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, play, reduced]);

  return <span className="tabular-nums slashed-zero">{display}</span>;
}

// ─── Metallic-edge wrapper (silver glowing border, bright at corners) ─────────
function EdgeFrame({ radius = "rounded-xl" }: { radius?: string }) {
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

// ─── Animations ───────────────────────────────────────────────────────────────
const cardStagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};
const cardItem: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};

// ─── Section ──────────────────────────────────────────────────────────────────
export default function ProvasMetricas() {
  const [active, setActive] = useState(0);
  const [dir, setDir] = useState(1);
  const [paused, setPaused] = useState(false);

  const metricsRef = useRef<HTMLDivElement>(null);
  const metricsInView = useInView(metricsRef, { once: true, amount: 0.3 });

  const current = depoimentos[active];

  const go = (next: number) => {
    const target = (next + depoimentos.length) % depoimentos.length;
    setDir(target >= active ? 1 : -1);
    setActive(target);
  };

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => {
      setDir(1);
      setActive((a) => (a + 1) % depoimentos.length);
    }, 7000);
    return () => clearInterval(t);
  }, [paused]);

  return (
    <section
      id="provas"
      className="relative bg-deep-navy border-b border-platinum/10 overflow-hidden"
    >
      {/* ── Background layers ──────────────────────────────────────────── */}
      <div aria-hidden className="absolute inset-0 -z-20 grid-fade" />
      <div
        aria-hidden
        className="absolute inset-0 -z-20 bg-[radial-gradient(ellipse_55%_45%_at_50%_-5%,rgba(37,99,235,0.16),transparent_55%),radial-gradient(ellipse_40%_40%_at_85%_30%,rgba(30,41,59,0.5),transparent_60%)]"
      />
      <div aria-hidden className="absolute inset-0 -z-20 grain" />
      {/* bottom light beam */}
      <div
        aria-hidden
        className="absolute bottom-0 left-1/2 -translate-x-1/2 h-px w-[55%] bg-gradient-to-r from-transparent via-blue-300/70 to-transparent"
      />
      <div
        aria-hidden
        className="absolute bottom-0 left-1/2 -translate-x-1/2 h-16 w-[40%] bg-[radial-gradient(ellipse_at_bottom,rgba(96,165,250,0.25),transparent_70%)] blur-md"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 lg:py-16">
        {/* ── Header (moved above the grid to align metrics card precisely with quote card) ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6 }}
          className="mb-8 lg:mb-10"
        >
          <div className="flex items-center gap-5">
            <Overline tone="dark">Prova executiva</Overline>
            <div className="relative flex-1 h-px bg-gradient-to-r from-platinum/20 to-transparent">
              <motion.span
                aria-hidden
                className="absolute top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-platinum shadow-[0_0_12px_4px_rgba(226,232,240,0.5)]"
                initial={{ left: "0%", opacity: 0 }}
                whileInView={{ left: "30%", opacity: [0, 1, 0.8] }}
                viewport={{ once: true }}
                transition={{ duration: 1.4, ease: "easeOut", delay: 0.3 }}
              />
            </div>
          </div>
          <h2 className="mt-4 font-serif text-3xl sm:text-4xl lg:text-[2.25rem] lg:leading-tight font-semibold tracking-tight text-pristine text-balance">
            A confiança se traduz em resultado.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 lg:items-center">
          
          {/* Coluna da Esquerda: Testemunhal Slider */}
          <div className="lg:col-span-7">
            {/* ── Quote card (glass + metal edge) ──────────────────────────── */}
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
              className="group relative rounded-2xl overflow-hidden
                         bg-[linear-gradient(145deg,rgba(226,232,240,0.06),rgba(15,23,42,0.2))]
                         backdrop-blur-xl shadow-[0_40px_90px_-36px_rgba(2,6,23,0.85)]"
            >
              <EdgeFrame radius="rounded-2xl" />
              {/* corner sheen */}
              <div
                aria-hidden
                className="absolute -top-px -left-px w-40 h-40 bg-[radial-gradient(circle_at_top_left,rgba(226,232,240,0.12),transparent_70%)] rounded-2xl"
              />

              <div className="relative p-6 sm:p-7 lg:p-8">
                {/* serif quote glyph */}
                <span
                  aria-hidden
                  className="block font-serif leading-[0.5] text-platinum/20 select-none text-5xl sm:text-6xl mb-0.5"
                >
                  &ldquo;
                </span>

                <div className="min-h-[110px] sm:min-h-[115px]">
                  <AnimatePresence mode="wait" custom={dir}>
                    <motion.div
                      key={active}
                      custom={dir}
                      initial={{ opacity: 0, x: dir * 40, filter: "blur(4px)" }}
                      animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                      exit={{ opacity: 0, x: dir * -40, filter: "blur(4px)" }}
                      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <blockquote className="font-serif text-lg sm:text-xl lg:text-[22px] leading-relaxed text-pristine text-balance">
                        {current.quote}
                      </blockquote>
                      <figcaption className="mt-5 flex items-center gap-3">
                        <span aria-hidden className="w-6 h-px bg-gradient-to-r from-platinum/50 to-transparent" />
                        <span className="font-grotesk uppercase tracking-[0.14em] text-[10px] sm:text-xs text-platinum/55">
                          {current.author}
                          <span className="text-platinum/35"> — {current.role}</span>
                        </span>
                      </figcaption>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Nav controls */}
                <div className="mt-5 flex items-center justify-between">
                  <div className="flex items-center gap-2.5" role="tablist" aria-label="Selecionar depoimento">
                    {depoimentos.map((_, i) => (
                      <button
                        key={i}
                        role="tab"
                        aria-selected={i === active}
                        aria-label={`Depoimento ${i + 1}`}
                        onClick={() => go(i)}
                        className="group/dot relative h-2 flex items-center"
                      >
                        <span
                          className={`block h-1 rounded-full transition-all duration-500 ${
                            i === active
                              ? "w-6 bg-gradient-to-r from-platinum to-blue-300 shadow-[0_0_6px_rgba(147,197,253,0.5)]"
                              : "w-1 bg-platinum/25 group-hover/dot:bg-platinum/50"
                          }`}
                        />
                      </button>
                    ))}
                  </div>

                  <div className="flex items-center gap-1.5">
                    <NavBtn label="Depoimento anterior" onClick={() => go(active - 1)}>
                      <ChevronLeft className="w-3.5 h-3.5" strokeWidth={2} />
                    </NavBtn>
                    <NavBtn label="Próximo depoimento" onClick={() => go(active + 1)}>
                      <ChevronRight className="w-3.5 h-3.5" strokeWidth={2} />
                    </NavBtn>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Coluna da Direita: Cards de Métricas */}
          <div className="lg:col-span-5 h-full flex flex-col justify-center">
            <motion.div
              ref={metricsRef}
              variants={cardStagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              className="flex flex-col gap-4 w-full"
            >
              {current.metrics.map((m) => (
                <motion.div
                  key={m.label}
                  variants={cardItem}
                  whileHover={{ x: 6 }}
                  transition={{ type: "spring", stiffness: 300, damping: 22 }}
                  className="group relative rounded-xl overflow-hidden p-4 sm:p-5
                             bg-[linear-gradient(155deg,rgba(226,232,240,0.05),rgba(15,23,42,0.18))]
                             backdrop-blur-xl shadow-[0_20px_45px_-24px_rgba(2,6,23,0.8)]
                             flex items-center justify-between gap-5 border border-white/5"
                >
                  <EdgeFrame radius="rounded-xl" />
                  {/* corner sheen */}
                  <div
                    aria-hidden
                    className="absolute -top-px -left-px w-20 h-20 bg-[radial-gradient(circle_at_top_left,rgba(226,232,240,0.12),transparent_70%)] rounded-xl"
                  />
                  
                  {/* Content area: horizontal flex with icon on the left, label on the right */}
                  <div className="flex items-center gap-4">
                    {/* Icon */}
                    <span className="relative flex items-center justify-center w-10 h-10 rounded-lg bg-platinum/[0.07] border border-platinum/12 group-hover:border-platinum/25 transition-colors duration-300 flex-shrink-0">
                      <m.icon className="w-4.5 h-4.5 text-platinum/70" strokeWidth={1.5} aria-hidden />
                    </span>
                    
                    {/* Label */}
                    <div className="flex flex-col">
                      <p className="relative font-grotesk uppercase tracking-[0.14em] text-[10px] text-platinum/50 leading-relaxed">
                        {m.label}
                      </p>
                    </div>
                  </div>

                  {/* Value on the right, large and premium */}
                  <div className="relative flex items-baseline font-serif font-semibold leading-none flex-shrink-0">
                    {m.prefix && (
                      <span className="text-xl mr-0.5 text-platinum/55">{m.prefix}</span>
                    )}
                    <span className="text-3xl sm:text-4xl bg-gradient-to-b from-white via-platinum to-platinum/45 bg-clip-text text-transparent">
                      <Counter value={m.value} decimals={m.decimals} play={metricsInView} />
                    </span>
                    {m.suffix && (
                      <span className="text-lg ml-0.5 text-platinum/45">{m.suffix}</span>
                    )}
                  </div>

                </motion.div>
              ))}
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}

// ─── Nav button ───────────────────────────────────────────────────────────────
function NavBtn({
  children,
  label,
  onClick,
}: {
  children: React.ReactNode;
  label: string;
  onClick: () => void;
}) {
  return (
    <motion.button
      aria-label={label}
      onClick={onClick}
      whileTap={{ scale: 0.9 }}
      className="group/btn relative flex items-center justify-center w-8 h-8 rounded-full overflow-hidden
                 bg-platinum/[0.04] text-platinum/70 hover:text-pristine transition-colors duration-300"
    >
      <span className="pointer-events-none absolute inset-0 rounded-full edge edge-soft" aria-hidden />
      <span className="pointer-events-none absolute inset-0 rounded-full edge edge-strong opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" aria-hidden />
      {children}
    </motion.button>
  );
}
