"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  useMotionValue,
  useSpring,
  useMotionValueEvent,
  useMotionTemplate,
  type MotionValue,
} from "framer-motion";
import {
  HeartPulse,
  Building2,
  HeartHandshake,
  TrendingDown,
  CalendarCheck,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import { cn } from "../../../lib/utils";

// ─── Props ────────────────────────────────────────────────────────────────────

interface HeroProps {
  heroImageUrl?: string;
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
}

// Shared pointer state (viewport coordinates) used for tilt + repulsion.
type Pointer = {
  x: MotionValue<number>;
  y: MotionValue<number>;
  active: MotionValue<number>;
};

// ─── Data ─────────────────────────────────────────────────────────────────────

interface CareCardData {
  id: string;
  icon: LucideIcon;
  title: string;
  text: string;
  delay: number;
  bob: number; // idle oscillation duration
  className: string;
}

const careCards: CareCardData[] = [
  {
    id: "rede",
    icon: Building2,
    title: "Rede adequada",
    text: "Escolha guiada pelo perfil da equipe",
    delay: 0.7,
    bob: 5.4,
    className: "-left-7 lg:-left-10 top-[8%]",
  },
  {
    id: "suporte",
    icon: HeartHandshake,
    title: "Suporte ao RH",
    text: "Reembolsos, dúvidas e autorizações",
    delay: 0.86,
    bob: 6.3,
    className: "-right-6 lg:-right-9 top-[44%]",
  },
  {
    id: "reajustes",
    icon: TrendingDown,
    title: "Reajustes sob gestão",
    text: "Análise para proteger previsibilidade",
    delay: 1.02,
    bob: 5.9,
    className: "-left-5 lg:-left-8 bottom-[10%]",
  },
];

const trustStats = [
  { value: "30 anos", label: "de mercado" },
  { value: "+5.000", label: "empresas atendidas" },
  { value: "Nacional", label: "cobertura Brasil" },
  { value: "Suporte VIP", label: "dedicado ao RH" },
];

const ease = [0.22, 1, 0.36, 1] as const;
const REPEL_RADIUS = 175;
const REPEL_STRENGTH = 32;

// ─── FloatingCard ─── glass card with idle bob ──────────────────────────

function FloatingCard({
  icon: Icon,
  title,
  text,
  delay,
  bob,
  className,
  reduced,
}: CareCardData & { pointer: Pointer; reduced: boolean | null }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.55, delay, ease }}
      className={cn("absolute z-20 hidden lg:block w-[202px]", className)}
    >
      {/* Idle bob layer */}
      <motion.div
        animate={reduced ? undefined : { y: [0, -6, 0] }}
        transition={{
          duration: bob,
          repeat: Infinity,
          ease: "easeInOut",
          delay: delay,
        }}
        className="relative flex items-start gap-2.5 p-3 rounded-2xl overflow-hidden
                   bg-navy-950/70 border border-white/10 backdrop-blur-md
                   shadow-[var(--shadow-md)]"
      >
        {/* Corner sheen */}
        <span
          aria-hidden
          className="pointer-events-none absolute -top-px -left-px w-20 h-20 rounded-2xl bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.06),transparent_70%)]"
        />
        <span className="flex items-center justify-center w-8 h-8 rounded-[10px] bg-white/10 border border-white/10 shrink-0">
          <Icon
            className="w-[15px] h-[15px] text-white/90"
            strokeWidth={1.75}
            aria-hidden
          />
        </span>
        <div className="flex flex-col min-w-0">
          <span className="font-display text-[10px] uppercase tracking-[0.14em] text-white font-medium leading-tight">
            {title}
          </span>
          <span className="font-sans text-[11px] leading-snug text-white/70 mt-[3px]">
            {text}
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── ImageFrame ─── clean image container ─────────────────────

function ImageFrame({
  heroImageUrl,
  reduced,
}: {
  heroImageUrl?: string;
  pointer: Pointer;
  reduced: boolean | null;
}) {
  return (
    <div className="relative group overflow-hidden rounded-[28px] lg:rounded-[34px] shadow-[var(--shadow-lg)]">
      <div
        className="relative overflow-hidden rounded-[28px] lg:rounded-[34px]"
        style={{
          aspectRatio: "4 / 5",
        }}
      >
        {heroImageUrl ? (
          <img
            src={heroImageUrl}
            alt="Consultora da Elih em reunião com gestor de RH"
            className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            loading="eager"
          />
        ) : (
          /* Placeholder */
          <div
            role="img"
            aria-label="Imagem principal da Elih — aguardando upload"
            className="absolute inset-0 select-none"
            style={{
              background:
                "linear-gradient(150deg, #e9eef4 0%, #f2f5f9 48%, #dde4ee 100%)",
            }}
          >
            <HeartHandshake
              aria-hidden
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 text-navy-900/[0.12]"
              strokeWidth={1}
            />
            <div className="absolute bottom-5 left-6">
              <p className="font-display text-[10px] uppercase tracking-[0.2em] text-navy-900/40">
                Imagem principal
              </p>
            </div>
          </div>
        )}

        {/* Bottom navy gradient for badge legibility */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-950/20 via-transparent to-transparent"
        />

        {/* Badge: Cotação consultiva */}
        <div
          className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 border border-white/15 backdrop-blur-md shadow-[var(--shadow-sm)]"
        >
          <CalendarCheck
            className="w-3.5 h-3.5 text-white/90"
            strokeWidth={1.75}
            aria-hidden
          />
          <span className="font-display text-[10px] uppercase tracking-[0.15em] text-white font-medium">
            Cotação consultiva
          </span>
        </div>
      </div>
    </div>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

export default function Hero({
  heroImageUrl,
  onPrimaryClick,
  onSecondaryClick,
}: HeroProps) {
  const reduced = useReducedMotion();
  const containerRef = useRef<HTMLElement>(null);

  // Pointer state shared with tilt + card repulsion.
  const px = useMotionValue(-9999);
  const py = useMotionValue(-9999);
  const active = useMotionValue(0);
  const pointer: Pointer = { x: px, y: py, active };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (reduced) return;
    px.set(e.clientX);
    py.set(e.clientY);
    active.set(1);
  };
  const handlePointerLeave = () => active.set(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const imageYRaw = useTransform(scrollYProgress, [0, 1], [0, 52]);
  const contentYRaw = useTransform(scrollYProgress, [0, 1], [0, -26]);
  const contentOpacityRaw = useTransform(scrollYProgress, [0, 0.52], [1, 0.32]);

  const imageY = reduced ? 0 : imageYRaw;
  const contentY = reduced ? 0 : contentYRaw;
  const contentOpacity = reduced ? 1 : contentOpacityRaw;

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative isolate min-h-[100svh] flex flex-col bg-clinical text-neutral-900"
      aria-label="Início — Elih Seguros"
    >
      {/* ── Background ── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_75%_at_-5%_0%,rgba(255,255,255,0.95),transparent_62%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_55%_55%_at_105%_55%,rgba(1,18,70,0.04),transparent_65%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-0 right-0 -z-10 h-32 bg-gradient-to-b from-transparent to-navy-950/[0.03]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          backgroundImage:
            "linear-gradient(rgba(1,18,70,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(1,18,70,0.02) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          WebkitMaskImage:
            "radial-gradient(ellipse 72% 62% at 50% 35%, #000 20%, transparent 72%)",
          maskImage:
            "radial-gradient(ellipse 72% 62% at 50% 35%, #000 20%, transparent 72%)",
        }}
      />

      {/* ── Main content ── */}
      <div className="flex-1 flex items-center max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-24 pb-12 sm:pt-28 lg:pt-24 lg:pb-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 xl:gap-10 items-center w-full">

          {/* ── LEFT: text ── */}
          <motion.div
            style={{ y: contentY, opacity: contentOpacity }}
            className="lg:col-span-5 xl:col-span-5 flex flex-col"
          >
            <motion.h1
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.72, delay: 0.1, ease }}
              className="mt-4 text-[1.8rem] sm:text-[2.1rem] lg:text-[2.25rem] xl:text-[2.5rem] font-extrabold font-display tracking-tight leading-[1.08] text-balance text-navy-950"
            >
              Plano de Saúde para Empresas (PME) —{" "}
              <span className="text-navy-900 block sm:inline">A partir de 2 vidas</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.22, ease }}
              className="mt-4 text-[0.95rem] sm:text-base leading-relaxed text-neutral-600 max-w-[480px] text-balance"
            >
              Cote e compare planos para o seu CNPJ com as principais operadoras (Bradesco, Amil, SulAmérica e mais). Encontre a rede credenciada ideal com até 40% de economia.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.33, ease }}
              className="mt-6 flex flex-wrap items-center gap-3"
            >
              <a
                href="#contato"
                onClick={onPrimaryClick}
                className="group inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-navy-900 text-white text-sm font-semibold hover:bg-navy-950 transition-all duration-200 shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy-900 font-display"
              >
                Solicitar cotação consultiva
                <ArrowRight
                  className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
                  aria-hidden
                />
              </a>
              <a
                href="#solucoes"
                onClick={onSecondaryClick}
                className="group relative inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-navy-300 text-navy-800 hover:bg-navy-50 text-sm font-semibold transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy-900 font-display"
              >
                Conhecer soluções
              </a>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.46 }}
              className="mt-3 font-display text-[11px] uppercase tracking-overline text-navy-500"
              aria-label="Resposta rápida, atendimento consultivo e sem compromisso"
            >
              Resposta rápida · Atendimento consultivo · Sem compromisso
            </motion.p>

            <motion.dl
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.56 }}
              className="mt-6 pt-5 border-t border-neutral-200 grid grid-cols-4 gap-0"
            >
              {trustStats.map((s, i) => (
                <div
                  key={s.label}
                  className={cn(
                    "flex flex-col gap-0.5 pr-4",
                    i > 0 && "pl-4 border-l border-neutral-200"
                  )}
                >
                  <dt className="text-sm font-semibold text-navy-950 font-display tabular-nums whitespace-nowrap">
                    {s.value}
                  </dt>
                  <dd className="font-display text-[10px] uppercase tracking-[0.13em] text-neutral-500 whitespace-nowrap">
                    {s.label}
                  </dd>
                </div>
              ))}
            </motion.dl>
          </motion.div>

          {/* ── RIGHT: image + floating cards ── */}
          <div className="lg:col-span-7 xl:col-span-7 flex justify-center lg:justify-end">
            <motion.div
              initial={{ opacity: 0, x: 22 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.88, delay: 0.28, ease }}
              style={{ y: imageY }}
              className="relative w-full max-w-[380px] sm:max-w-[400px] lg:max-w-[410px] xl:max-w-[450px]"
            >
              <motion.div
                onPointerMove={handlePointerMove}
                onPointerLeave={handlePointerLeave}
                animate={reduced ? undefined : { y: [0, -6, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                className="relative"
                style={{ perspective: 1200 }}
              >
                <ImageFrame
                  heroImageUrl={heroImageUrl}
                  pointer={pointer}
                  reduced={reduced}
                />

                {careCards.map((card) => (
                  <FloatingCard
                    key={card.id}
                    {...card}
                    pointer={pointer}
                    reduced={reduced}
                  />
                ))}
              </motion.div>

              {/* ── Mobile chip strip ── */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
                className="lg:hidden mt-4 flex flex-wrap gap-2 justify-center"
                aria-label="Diferenciais do plano"
              >
                {careCards.map((card) => (
                  <div
                    key={card.id}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/10 bg-navy-950/70 backdrop-blur-md"
                  >
                    <card.icon
                      className="w-3.5 h-3.5 text-white/70"
                      strokeWidth={1.75}
                      aria-hidden
                    />
                    <span className="font-display text-[10px] uppercase tracking-[0.12em] text-white">
                      {card.title}
                    </span>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
