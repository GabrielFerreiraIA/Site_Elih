"use client";

import { motion } from "framer-motion";
import {
  Users,
  Network,
  TrendingDown,
  Headset,
  Briefcase,
} from "lucide-react";
import Overline from "../primitives/Overline";
import PrimaryButton from "../primitives/PrimaryButton";
import SecondaryButton from "../primitives/SecondaryButton";
import GlassPanel from "../primitives/GlassPanel";
import PhotoPlaceholder from "../primitives/PhotoPlaceholder";

const microMetrics = [
  {
    icon: Users,
    label: "Vidas cobertas",
    value: "24.580",
  },
  {
    icon: Network,
    label: "Rede credenciada",
    value: "1.300+",
  },
  {
    icon: TrendingDown,
    label: "Reajuste controlado",
    value: "Abaixo do mercado",
  },
  {
    icon: Headset,
    label: "Suporte RH",
    value: "Ativo e próximo",
  },
];

const authorityChips = [
  "30 anos de mercado",
  "+5.000 empresas",
  "Atuação nacional",
  "Suporte ao RH",
];

const containerStagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.4 } },
};
const itemStagger = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative isolate overflow-hidden bg-obsidian grain"
    >
      {/* radial gradient backdrop */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_70%_60%_at_70%_-10%,rgba(30,41,59,0.85),transparent_60%),radial-gradient(ellipse_50%_50%_at_10%_110%,rgba(15,23,42,0.7),transparent_60%)]"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-platinum/15 to-transparent"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20 sm:pt-28 sm:pb-28 lg:pt-32 lg:pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          {/* LEFT — copy */}
          <div className="lg:col-span-6 xl:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Overline tone="dark">
                Consultoria premium em saúde corporativa
              </Overline>
            </motion.div>

            <h1 className="mt-6 text-balance text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight leading-[1.02] text-pristine">
              <motion.span
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="block"
              >
                Inteligência corporativa.
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.7,
                  delay: 0.15,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="block text-platinum/85"
              >
                Acolhimento humano.
              </motion.span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="mt-7 max-w-xl text-base sm:text-lg leading-relaxed text-platinum/70"
            >
              Não apenas desenhamos o plano de saúde da sua empresa. Blindamos
              o seu caixa contra reajustes abusivos, simplificamos a rotina do
              RH e cuidamos de cada vida da sua equipe com suporte próximo e
              resolutivo.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.45 }}
              className="mt-9 flex flex-wrap items-center gap-3"
            >
              <PrimaryButton href="#contato">Agendar Assessoria</PrimaryButton>
              <SecondaryButton href="#solucoes">
                Conhecer Soluções
              </SecondaryButton>
            </motion.div>

            {/* Authority chips */}
            <motion.ul
              variants={containerStagger}
              initial="hidden"
              animate="show"
              className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs text-platinum/45"
            >
              {authorityChips.map((c, i) => (
                <motion.li
                  key={c}
                  variants={itemStagger}
                  className="flex items-center gap-2"
                >
                  {i > 0 && (
                    <span
                      className="w-1 h-1 rounded-full bg-platinum/25"
                      aria-hidden
                    />
                  )}
                  <span className="font-grotesk uppercase tracking-[0.16em]">
                    {c}
                  </span>
                </motion.li>
              ))}
            </motion.ul>
          </div>

          {/* RIGHT — photo + glass panel */}
          <div className="lg:col-span-6 xl:col-span-5 relative">
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative"
            >
              <PhotoPlaceholder
                icon={Briefcase}
                caption="Reunião RH × Consultor Elih"
                aspect="aspect-[4/5]"
              />

              {/* Floating glass panel */}
              <motion.div
                initial={{ opacity: 0, x: 20, y: 20 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.8, delay: 0.65 }}
                className="absolute -bottom-6 -left-6 sm:-bottom-10 sm:-left-10 w-[88%] sm:w-[78%] max-w-sm"
              >
                <GlassPanel tone="dark" className="p-5 sm:p-6">
                  <div className="flex items-center justify-between mb-4 pb-4 border-b border-platinum/10">
                    <p className="overline text-platinum/55">
                      Painel de proteção corporativa
                    </p>
                    <span className="font-grotesk text-[10px] uppercase tracking-[0.18em] text-platinum/40">
                      live
                    </span>
                  </div>
                  <motion.ul
                    variants={containerStagger}
                    initial="hidden"
                    animate="show"
                    className="space-y-3.5"
                  >
                    {microMetrics.map((m) => (
                      <motion.li
                        key={m.label}
                        variants={itemStagger}
                        className="flex items-center gap-3.5"
                      >
                        <span className="flex items-center justify-center w-9 h-9 rounded-[8px] bg-platinum/[0.06] border border-platinum/10 shrink-0">
                          <m.icon
                            className="w-4 h-4 text-platinum/70"
                            strokeWidth={1.5}
                          />
                        </span>
                        <span className="flex-1 min-w-0">
                          <span className="block font-grotesk text-[10px] uppercase tracking-[0.16em] text-platinum/45">
                            {m.label}
                          </span>
                          <span className="block mt-0.5 text-sm font-semibold text-pristine truncate">
                            {m.value}
                          </span>
                        </span>
                      </motion.li>
                    ))}
                  </motion.ul>
                </GlassPanel>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
