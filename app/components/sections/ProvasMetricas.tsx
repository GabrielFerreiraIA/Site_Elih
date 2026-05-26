"use client";

import { motion } from "framer-motion";
import Overline from "../primitives/Overline";

const metrics = [
  { value: "30", suffix: "anos", label: "de mercado" },
  { value: "+5.000", suffix: "", label: "empresas assessoradas" },
  { value: "+40", suffix: "", label: "sindicatos e entidades parceiras" },
  { value: "100%", suffix: "", label: "gestão ativa contra reajustes" },
];

export default function ProvasMetricas() {
  return (
    <section
      id="provas"
      className="bg-deep-navy border-b border-platinum/10 grain"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-32">
        {/* Quote block */}
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center mb-2"
          >
            <Overline tone="dark">A prova executiva</Overline>
          </motion.div>

          {/* Decorative opening quote */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6 }}
            aria-hidden
            className="flex justify-center mt-6"
          >
            <span className="block leading-none text-platinum/15 font-serif select-none text-7xl sm:text-8xl">
              &ldquo;
            </span>
          </motion.div>

          <motion.blockquote
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="text-center text-balance text-xl sm:text-2xl lg:text-3xl font-medium leading-snug text-pristine -mt-2"
          >
            A Elih tirou o peso operacional das costas do nosso RH. Hoje temos
            clareza, suporte e segurança para cuidar dos colaboradores sem
            perder previsibilidade financeira.
          </motion.blockquote>

          <motion.figcaption
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-8 flex items-center justify-center gap-3"
          >
            <span
              className="w-8 h-px bg-platinum/30"
              aria-hidden
            />
            <span className="font-grotesk uppercase tracking-[0.18em] text-xs text-platinum/55">
              Diretora de RH, empresa cliente
            </span>
            <span
              className="w-8 h-px bg-platinum/30"
              aria-hidden
            />
          </motion.figcaption>
        </div>

        {/* Metrics grid */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.08, delayChildren: 0.4 } },
          }}
          className="mt-20 sm:mt-24 grid grid-cols-2 lg:grid-cols-4 gap-0 border-t border-platinum/10"
        >
          {metrics.map((m, idx) => (
            <motion.div
              key={m.label}
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
              }}
              className={`pt-10 sm:pt-12 pb-2 px-4 sm:px-6 ${
                idx > 0 ? "lg:border-l border-platinum/10" : ""
              } ${idx === 2 ? "lg:border-l border-platinum/10" : ""}
                ${idx % 2 === 1 ? "border-l border-platinum/10 lg:border-l" : ""}
              `}
            >
              <div className="flex items-baseline gap-2">
                <span className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-pristine">
                  {m.value}
                </span>
                {m.suffix && (
                  <span className="text-base sm:text-lg font-semibold text-platinum/65">
                    {m.suffix}
                  </span>
                )}
              </div>
              <p className="mt-3 font-grotesk uppercase tracking-[0.16em] text-xs text-platinum/55 leading-relaxed">
                {m.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
