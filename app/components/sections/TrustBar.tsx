"use client";

import { motion } from "framer-motion";
import { InfiniteSlider } from "@/app/components/ui/infinite-slider";
import { ProgressiveBlur } from "@/app/components/ui/progressive-blur";
import { Sparkles } from "@/app/components/ui/sparkles";

// ─── Operator logos data (Cloudinary URLs) ──────────────────────────────────
type Operadora = {
  name: string;
  url: string;
};

const operadoras: Operadora[] = [
  {
    name: "SulAmérica",
    url: "https://res.cloudinary.com/dxpfoolyp/image/upload/q_auto/f_auto/v1780410645/sul_america_m2zxxe.png",
  },
  {
    name: "NotreDame Intermédica",
    url: "https://res.cloudinary.com/dxpfoolyp/image/upload/q_auto/f_auto/v1780410645/Notredame_brusb4.png",
  },
  {
    name: "Unimed",
    url: "https://res.cloudinary.com/dxpfoolyp/image/upload/q_auto/f_auto/v1780410645/unimed_uwvlt1.png",
  },
  {
    name: "Amil",
    url: "https://res.cloudinary.com/dxpfoolyp/image/upload/q_auto/f_auto/v1780410645/amil_bnsuig.png",
  },
  {
    name: "Bradesco Saúde",
    url: "https://res.cloudinary.com/dxpfoolyp/image/upload/q_auto/f_auto/v1780410645/bradesco_rdh53d.png",
  },
  {
    name: "Care Plus",
    url: "https://res.cloudinary.com/dxpfoolyp/image/upload/q_auto/f_auto/v1780410645/Carreplus_qdcoi0.png",
  },
  {
    name: "Qualicorp",
    url: "https://res.cloudinary.com/dxpfoolyp/image/upload/q_auto/f_auto/v1780410645/Qualicorp_quwq59.png",
  },
  {
    name: "Porto Seguro",
    url: "https://res.cloudinary.com/dxpfoolyp/image/upload/q_auto/f_auto/v1780410646/porto_seguro_zem4ga.png",
  },
];

// ─── Operator Glass Card logo component ──────────────────────────────────────
const OperadoraLogoCard = ({ name, url }: Operadora) => {
  return (
    <motion.div
      whileHover={{ scale: 1.04, y: -2 }}
      className="group relative flex items-center justify-center h-14 sm:h-16 w-32 sm:w-40 rounded-xl overflow-hidden
                 bg-white/[0.02] border border-white/[0.04] backdrop-blur-sm
                 transition-all duration-300 shadow-[0_8px_20px_-8px_rgba(0,0,0,0.3)] hover:border-white/10"
    >
      <img
        src={url}
        alt={name}
        className="h-8 sm:h-10 w-auto max-w-[75%] sm:max-w-[80%] object-contain flex-shrink-0
                   opacity-40 brightness-0 invert
                   group-hover:opacity-100 group-hover:brightness-100 group-hover:invert-0
                   transition-all duration-500"
      />
    </motion.div>
  );
};

export default function TrustBar() {
  return (
    <section id="operadoras" className="relative bg-obsidian overflow-hidden">
      {/* Top hairline */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-platinum/10 to-transparent" />

      {/* Sweeping background laser light beam behind slider */}
      <div className="absolute inset-x-0 top-[28%] -translate-y-1/2 -z-10 h-px w-full bg-gradient-to-r from-transparent via-blue-500/10 to-transparent blur-sm" />

      <div className="relative z-10 pt-20 pb-0">
        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
          className="text-center px-4 mb-12"
        >
          <p className="font-grotesk text-[11px] uppercase tracking-[0.22em] text-platinum/35 mb-4">
            Parceria com as maiores operadoras do país
          </p>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-pristine leading-tight">
            Acesso premium às{" "}
            <span className="text-platinum/60">melhores redes do Brasil.</span>
          </h2>
        </motion.div>

        {/* Infinite slider with progressive blur */}
        <div className="relative h-[96px] w-full">
          <InfiniteSlider
            className="flex h-full w-full items-center"
            duration={35}
            gap={40}
          >
            {operadoras.map((op) => (
              <OperadoraLogoCard key={op.name} name={op.name} url={op.url} />
            ))}
          </InfiniteSlider>

          <ProgressiveBlur
            className="pointer-events-none absolute top-0 left-0 h-full w-[120px] sm:w-[200px]"
            direction="left"
            blurIntensity={0.8}
          />
          <ProgressiveBlur
            className="pointer-events-none absolute top-0 right-0 h-full w-[120px] sm:w-[200px]"
            direction="right"
            blurIntensity={0.8}
          />
        </div>

        {/* ── 3 Trust Points Grid ─────────────────────────────────────────── */}
        <div className="max-w-6xl mx-auto px-4 mt-16 sm:mt-24 grid grid-cols-1 md:grid-cols-3 gap-6 relative z-20">
          {[
            {
              stat: "100%",
              title: "Independência Comercial",
              desc: "Isenção analítica absoluta. Negociamos com total neutralidade comercial para trazer o melhor custo-benefício de verdade para o caixa da sua empresa.",
              delay: 0.1,
            },
            {
              stat: "8 de 10",
              title: "Parceria Elite do País",
              desc: "Acesso de alto nível às maiores operadoras de saúde, odonto e vida do mercado corporativo nacional em um único canal integrado.",
              delay: 0.2,
            },
            {
              stat: "SLA Direct",
              title: "Suporte Sem 0800",
              desc: "RH livre de centrais telefônicas. Linha executiva direta com a nossa equipe de diretores para resolver demandas estratégicas e críticas imediatamente.",
              delay: 0.3,
            },
          ].map((item) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: item.delay }}
              whileHover={{ y: -4 }}
              className="group relative flex flex-col p-6 rounded-2xl overflow-hidden
                         bg-white/[0.01] border border-white/[0.03] backdrop-blur-sm
                         transition-all duration-300 hover:border-white/[0.08]"
            >
              {/* Subtle hover background highlight */}
              <div aria-hidden className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(226,232,240,0.02),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <span className="text-3xl sm:text-4xl font-serif font-semibold bg-gradient-to-b from-white via-platinum to-platinum/40 bg-clip-text text-transparent mb-3 leading-none">
                {item.stat}
              </span>
              <h3 className="font-grotesk uppercase tracking-[0.14em] text-xs font-semibold text-white/90 mb-2 leading-relaxed">
                {item.title}
              </h3>
              <p className="text-xs sm:text-[13px] text-platinum/45 leading-relaxed text-balance">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── Sparkles + curved border ──────────────────────────────────────── */}
      <div className="relative -mt-10 h-72 w-full overflow-hidden [mask-image:radial-gradient(55%_60%,white,transparent)]">
        {/* Radial glow */}
        <div className="absolute inset-0 before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_bottom_center,rgba(30,58,138,0.45),transparent_65%)]" />

        {/* Curved border (the "bowl" effect) */}
        <div className="absolute -left-1/2 top-1/2 aspect-[1/0.7] z-10 w-[200%] rounded-[100%] border-t border-platinum/[0.08] bg-obsidian" />

        {/* Sparkles */}
        <Sparkles
          density={900}
          size={0.9}
          speed={0.6}
          opacity={0.55}
          color="#ffffff"
          className="absolute inset-x-0 bottom-0 h-full w-full [mask-image:radial-gradient(50%_50%,white,transparent_85%)]"
        />
      </div>
    </section>
  );
}
