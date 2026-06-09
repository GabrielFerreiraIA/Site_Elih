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

// ─── FloatingCard ─── dark glass, metallic edge, repulsion + idle bob ──────────

function FloatingCard({
  icon: Icon,
  title,
  text,
  delay,
  bob,
  className,
  pointer,
  reduced,
}: CareCardData & { pointer: Pointer; reduced: boolean | null }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useSpring(0, { stiffness: 110, damping: 17, mass: 0.7 });
  const y = useSpring(0, { stiffness: 110, damping: 17, mass: 0.7 });

  const compute = () => {
    const el = ref.current;
    if (!el || reduced) return;
    if (!pointer.active.get()) {
      x.set(0);
      y.set(0);
      return;
    }
    const r = el.getBoundingClientRect();
    // Subtract the currently-applied spring offset to get the resting center.
    const cx = r.left + r.width / 2 - x.get();
    const cy = r.top + r.height / 2 - y.get();
    const dx = cx - pointer.x.get();
    const dy = cy - pointer.y.get();
    const dist = Math.hypot(dx, dy) || 1;
    if (dist < REPEL_RADIUS) {
      const f = 1 - dist / REPEL_RADIUS;
      x.set((dx / dist) * f * REPEL_STRENGTH);
      y.set((dy / dist) * f * REPEL_STRENGTH);
    } else {
      x.set(0);
      y.set(0);
    }
  };

  useMotionValueEvent(pointer.x, "change", compute);
  useMotionValueEvent(pointer.y, "change", compute);
  useMotionValueEvent(pointer.active, "change", compute);

  return (
    <motion.div
      ref={ref}
      style={{ x, y }}
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
                   shadow-[0_18px_44px_-14px_rgba(2,6,23,0.55)]"
        style={{
          background:
            "linear-gradient(135deg, rgba(15,23,42,0.88) 0%, rgba(12,19,36,0.76) 100%)",
          backdropFilter: "blur(18px) saturate(1.4)",
          WebkitBackdropFilter: "blur(18px) saturate(1.4)",
        }}
      >
        {/* Metallic edge */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-2xl edge edge-soft"
        />
        {/* Corner sheen */}
        <span
          aria-hidden
          className="pointer-events-none absolute -top-px -left-px w-20 h-20 rounded-2xl bg-[radial-gradient(circle_at_top_left,rgba(226,232,240,0.14),transparent_70%)]"
        />
        <span className="flex items-center justify-center w-8 h-8 rounded-[10px] bg-white/[0.06] border border-white/10 shrink-0">
          <Icon
            className="w-[15px] h-[15px] text-platinum/75"
            strokeWidth={1.5}
            aria-hidden
          />
        </span>
        <div className="flex flex-col min-w-0">
          <span className="font-grotesk text-[10px] uppercase tracking-[0.14em] text-platinum/90 font-medium leading-tight">
            {title}
          </span>
          <span className="font-sans text-[11px] leading-snug text-platinum/55 mt-[3px]">
            {text}
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── ImageFrame ─── 3D "claw" tilt that follows the cursor ─────────────────────

function ImageFrame({
  heroImageUrl,
  pointer,
  reduced,
}: {
  heroImageUrl?: string;
  pointer: Pointer;
  reduced: boolean | null;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const rotX = useSpring(0, { stiffness: 130, damping: 16, mass: 0.5 });
  const rotY = useSpring(0, { stiffness: 130, damping: 16, mass: 0.5 });
  const glareX = useSpring(50, { stiffness: 120, damping: 20 });
  const glareY = useSpring(50, { stiffness: 120, damping: 20 });

  const clamp = (v: number) => Math.max(-0.5, Math.min(0.5, v));

  const compute = () => {
    const el = ref.current;
    if (!el || reduced) return;
    if (!pointer.active.get()) {
      rotX.set(0);
      rotY.set(0);
      glareX.set(50);
      glareY.set(50);
      return;
    }
    const r = el.getBoundingClientRect();
    const nx = clamp((pointer.x.get() - r.left) / r.width - 0.5);
    const ny = clamp((pointer.y.get() - r.top) / r.height - 0.5);
    // Cursor side sinks, opposite side lifts → the "claw / push" feel.
    rotY.set(nx * 9);
    rotX.set(-ny * 9);
    glareX.set((nx + 0.5) * 100);
    glareY.set((ny + 0.5) * 100);
  };

  useMotionValueEvent(pointer.x, "change", compute);
  useMotionValueEvent(pointer.y, "change", compute);
  useMotionValueEvent(pointer.active, "change", compute);

  const glareBg = useMotionTemplate`radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.16), transparent 46%)`;

  return (
    <motion.div
      ref={ref}
      style={{
        rotateX: rotX,
        rotateY: rotY,
        transformPerspective: 1200,
        transformStyle: "preserve-3d",
      }}
      className="relative group overflow-hidden rounded-[28px] lg:rounded-[34px] will-change-transform"
    >
      <div
        className="relative overflow-hidden rounded-[28px] lg:rounded-[34px]"
        style={{
          aspectRatio: "4 / 5",
          boxShadow:
            "0 34px 72px -20px rgba(2,6,23,0.18), 0 12px 30px -12px rgba(2,6,23,0.10)",
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
          /* Placeholder — sem card central; watermark + rótulo no rodapé */
          <div
            role="img"
            aria-label="Imagem principal da Elih — aguardando upload"
            className="absolute inset-0 select-none"
            style={{
              background:
                "linear-gradient(150deg, #e9eef4 0%, #f2f5f9 48%, #dde4ee 100%)",
            }}
          >
            <div
              aria-hidden
              className="absolute inset-0 opacity-[0.06]"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(15,23,42,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(15,23,42,0.6) 1px, transparent 1px)",
                backgroundSize: "34px 34px",
              }}
            />
            <HeartHandshake
              aria-hidden
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 text-graphite/[0.12]"
              strokeWidth={1}
            />
            <div className="absolute bottom-5 left-6">
              <p className="font-grotesk text-[10px] uppercase tracking-[0.2em] text-graphite/35">
                Imagem principal
              </p>
              <p className="font-grotesk text-[9px] tracking-wide text-graphite/22 mt-0.5">
                prop: heroImageUrl
              </p>
            </div>
          </div>
        )}

        {/* Bottom navy gradient for badge legibility */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-deep-navy/30 via-transparent to-transparent"
        />
        {/* Cursor-following glare */}
        {!reduced && (
          <motion.div
            aria-hidden
            style={{ background: glareBg }}
            className="pointer-events-none absolute inset-0 mix-blend-overlay"
          />
        )}
        {/* Metallic edge — brightens on hover */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[28px] lg:rounded-[34px] edge edge-soft opacity-70 group-hover:opacity-100 transition-opacity duration-500"
        />

        {/* Badge: Cotação consultiva — dark glass */}
        <motion.div
          initial={{ opacity: 0, scale: 0.86, y: -5 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 1.1, ease }}
          className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full overflow-hidden shadow-[0_8px_22px_-8px_rgba(2,6,23,0.5)]"
          style={{
            background:
              "linear-gradient(135deg, rgba(15,23,42,0.9) 0%, rgba(12,19,36,0.78) 100%)",
            backdropFilter: "blur(14px) saturate(1.4)",
            WebkitBackdropFilter: "blur(14px) saturate(1.4)",
          }}
        >
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-full edge edge-soft"
          />
          <CalendarCheck
            className="w-3.5 h-3.5 text-blue-300/90"
            strokeWidth={1.5}
            aria-hidden
          />
          <span className="font-grotesk text-[10px] uppercase tracking-[0.15em] text-platinum/90 font-medium">
            Cotação consultiva
          </span>
        </motion.div>
      </div>
    </motion.div>
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
      className="relative isolate min-h-[100svh] flex flex-col bg-clinical text-graphite"
      aria-label="Início — Elih Seguros"
    >
      {/* ── Background ── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_75%_at_-5%_0%,rgba(255,255,255,0.95),transparent_62%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_55%_55%_at_105%_55%,rgba(12,19,36,0.05),transparent_65%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-0 right-0 -z-10 h-32 bg-gradient-to-b from-transparent to-obsidian/[0.055]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          backgroundImage:
            "linear-gradient(rgba(15,23,42,0.032) 1px, transparent 1px), linear-gradient(90deg, rgba(15,23,42,0.032) 1px, transparent 1px)",
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
              className="mt-4 text-[1.8rem] sm:text-[2.1rem] lg:text-[2.25rem] xl:text-[2.5rem] font-extrabold tracking-tight leading-[1.08] text-balance text-obsidian"
            >
              Plano de Saúde para Empresas (PME) —{" "}
              <span className="text-corp-navy block sm:inline">A partir de 2 vidas</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.22, ease }}
              className="mt-4 text-[0.95rem] sm:text-base leading-relaxed text-slate-600 max-w-[480px] text-balance"
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
                className="group inline-flex items-center gap-2.5 px-6 py-3.5 rounded-[11px] bg-obsidian text-pristine text-sm font-semibold hover:bg-corp-navy transition-all duration-200 shadow-[0_6px_20px_-6px_rgba(2,6,23,0.24)] hover:shadow-[0_10px_26px_-6px_rgba(2,6,23,0.32)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-corp-navy"
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
                className="group relative inline-flex items-center gap-2 px-6 py-3.5 rounded-[11px] text-sm font-semibold text-obsidian overflow-hidden transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-obsidian"
                style={{
                  background: "linear-gradient(160deg, rgba(255,255,255,0.96) 0%, rgba(241,245,249,0.92) 100%)",
                  boxShadow:
                    "inset 0 1px 0 rgba(255,255,255,0.9), 0 0 0 1px rgba(15,23,42,0.72), 0 4px 14px -4px rgba(15,23,42,0.18)",
                }}
              >
                {/* Top-edge metallic sheen */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white to-transparent opacity-80"
                />
                {/* Hover fill */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  style={{
                    background:
                      "linear-gradient(160deg, rgba(15,23,42,0.04) 0%, rgba(15,23,42,0.08) 100%)",
                  }}
                />
                <span className="relative">Conhecer soluções</span>
              </a>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.46 }}
              className="mt-3 font-grotesk text-[11px] uppercase tracking-[0.16em] text-slate-500"
              aria-label="Resposta rápida, atendimento consultivo e sem compromisso"
            >
              Resposta rápida · Atendimento consultivo · Sem compromisso
            </motion.p>

            <motion.dl
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.56 }}
              className="mt-6 pt-5 border-t border-soft-slate grid grid-cols-4 gap-0"
            >
              {trustStats.map((s, i) => (
                <div
                  key={s.label}
                  className={cn(
                    "flex flex-col gap-0.5 pr-4",
                    i > 0 && "pl-4 border-l border-soft-slate"
                  )}
                >
                  <dt className="text-sm font-semibold text-obsidian tabular-nums whitespace-nowrap">
                    {s.value}
                  </dt>
                  <dd className="font-grotesk text-[10px] uppercase tracking-[0.13em] text-slate-500 whitespace-nowrap">
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
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-graphite/15"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(15,23,42,0.92), rgba(12,19,36,0.82))",
                    }}
                  >
                    <card.icon
                      className="w-3.5 h-3.5 text-platinum/70"
                      strokeWidth={1.5}
                      aria-hidden
                    />
                    <span className="font-grotesk text-[10px] uppercase tracking-[0.12em] text-platinum/85">
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
