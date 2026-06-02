"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Check, MapPinned, HeartHandshake, Building2, Network } from "lucide-react";
import Overline from "../primitives/Overline";

const checks = [
  { icon: MapPinned, label: "Cobertura nacional" },
  { icon: Building2, label: "Gestão centralizada para filiais" },
  { icon: HeartHandshake, label: "Suporte consultivo ao RH" },
  { icon: Network, label: "Rede adequada ao perfil da equipe" },
];

export default function CoberturaNacional() {
  return (
    <section
      id="cobertura"
      className="relative isolate bg-obsidian border-b border-platinum/10 overflow-hidden"
    >
      {/* Background image — mapa do Brasil já com pinos */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/img/mapa-brasil-cobertura.png"
          alt=""
          fill
          priority={false}
          sizes="100vw"
          className="object-cover object-[right_center] opacity-90"
        />
        {/* Left-side darken for text legibility */}
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-r from-obsidian via-obsidian/85 via-40% to-transparent"
        />
        {/* Mobile extra overlay (imagem fica mais ao fundo no mobile) */}
        <div
          aria-hidden
          className="absolute inset-0 bg-obsidian/55 lg:bg-transparent"
        />
        {/* Top/bottom edge softeners */}
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-obsidian to-transparent"
        />
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-obsidian to-transparent"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 lg:py-40 min-h-[600px] lg:min-h-[720px] flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 w-full">
          {/* LEFT — copy */}
          <div className="lg:col-span-6 xl:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5 }}
            >
              <Overline tone="dark">O mapa estratégico de cuidado</Overline>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.05] text-pristine text-balance"
            >
              Proteção sem fronteiras.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-6 text-base sm:text-lg leading-relaxed text-platinum/75 text-balance max-w-xl"
            >
              Não importa onde seu colaborador esteja. A Elih orienta sua
              empresa na escolha da melhor rede referenciada e oferece suporte
              para que o RH tenha segurança na gestão de benefícios em todo o
              Brasil.
            </motion.p>

            <motion.ul
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.08, delayChildren: 0.3 } },
              }}
              className="mt-10 space-y-4"
            >
              {checks.map((c) => (
                <motion.li
                  key={c.label}
                  variants={{
                    hidden: { opacity: 0, x: -12 },
                    show: { opacity: 1, x: 0 },
                  }}
                  className="flex items-center gap-3.5"
                >
                  <span className="flex items-center justify-center w-8 h-8 rounded-full border border-platinum/20 bg-platinum/[0.05] backdrop-blur-sm">
                    <Check
                      className="w-4 h-4 text-platinum/85"
                      strokeWidth={2}
                    />
                  </span>
                  <span className="text-sm sm:text-base text-platinum/90">
                    {c.label}
                  </span>
                </motion.li>
              ))}
            </motion.ul>

            {/* Floating signature row */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-12 flex items-center gap-3"
            >
              <span
                className="w-1.5 h-1.5 rounded-full bg-platinum animate-pulse-soft"
                aria-hidden
              />
              <span className="font-grotesk uppercase tracking-[0.18em] text-[11px] text-platinum/55">
                Rede ativa · cobertura nacional
              </span>
            </motion.div>
          </div>

          {/* RIGHT — vazio (a imagem de fundo já mostra o mapa) */}
          <div className="hidden lg:block lg:col-span-6 xl:col-span-7" />
        </div>
      </div>
    </section>
  );
}
