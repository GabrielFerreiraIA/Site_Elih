"use client";

import { motion } from "framer-motion";
import Overline from "../primitives/Overline";

const operadoras = [
  "Bradesco Saúde",
  "SulAmérica",
  "Amil",
  "Allianz",
  "Porto Seguro",
  "Unimed",
  "Omint",
  "Hapvida NotreDame",
];

// Duplicado para marquee infinito sem corte
const marqueeList = [...operadoras, ...operadoras];

export default function TrustBar() {
  return (
    <section
      id="operadoras"
      className="bg-clinical border-b border-soft-slate"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-12 sm:mb-14"
        >
          <Overline tone="light">
            Parceria com as maiores operadoras do país
          </Overline>
          <p className="mt-5 text-base sm:text-lg text-graphite/75 leading-relaxed text-balance">
            A Elih orienta empresas na escolha, implantação e gestão de
            benefícios junto às principais operadoras de saúde, odontologia e
            seguros do Brasil.
          </p>
        </motion.div>

        {/* Marquee */}
        <div
          className="relative overflow-hidden"
          aria-label="Lista de operadoras parceiras"
        >
          {/* Edge fades */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 left-0 w-24 sm:w-32 bg-gradient-to-r from-clinical to-transparent z-10"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 right-0 w-24 sm:w-32 bg-gradient-to-l from-clinical to-transparent z-10"
          />

          <div className="flex w-max animate-marquee gap-12 sm:gap-16 py-6">
            {marqueeList.map((nome, i) => (
              <div
                key={`${nome}-${i}`}
                className="shrink-0 group cursor-default"
                aria-hidden={i >= operadoras.length}
              >
                <span className="font-grotesk uppercase tracking-[0.18em] text-base sm:text-lg text-graphite/55 group-hover:text-corp-navy transition-colors duration-300 relative inline-block">
                  {nome}
                  <span
                    className="absolute -bottom-1.5 left-0 right-0 h-px bg-corp-navy/0 group-hover:bg-corp-navy/60 transition-colors duration-300"
                    aria-hidden
                  />
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
