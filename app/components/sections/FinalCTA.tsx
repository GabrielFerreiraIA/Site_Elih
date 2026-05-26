"use client";

import { FormEvent, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Check } from "lucide-react";
import Overline from "../primitives/Overline";

type FormState = "idle" | "submitting" | "ok" | "error";

const fields = [
  { name: "nome", label: "Nome completo", type: "text", required: true },
  {
    name: "email",
    label: "E-mail corporativo",
    type: "email",
    required: true,
  },
  { name: "cnpj", label: "CNPJ", type: "text", required: true },
  {
    name: "vidas",
    label: "Número de vidas",
    type: "number",
    required: true,
  },
] as const;

export default function FinalCTA() {
  const [state, setState] = useState<FormState>("idle");

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("submitting");
    const data = new FormData(e.currentTarget);
    const payload = Object.fromEntries(data.entries());
    // Sem backend ainda — log + feedback visual.
    // eslint-disable-next-line no-console
    console.log("[FinalCTA] payload:", payload);
    setTimeout(() => setState("ok"), 700);
  }

  return (
    <section
      id="contato"
      className="bg-clinical border-b border-soft-slate"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* LEFT — copy */}
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
              className="mt-5 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-obsidian text-balance"
            >
              Eleve o padrão de benefícios da sua empresa.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-5 text-base sm:text-lg leading-relaxed text-graphite/80 text-balance"
            >
              Converse com um consultor da Elih e entenda como proteger seu
              caixa, simplificar a rotina do RH e oferecer mais segurança para
              sua equipe.
            </motion.p>

            <ul className="mt-10 space-y-3 text-sm text-graphite/75">
              {[
                "Retorno consultivo, sem compromisso",
                "Análise inicial do perfil da empresa",
                "Resposta em até 1 dia útil",
              ].map((it) => (
                <li key={it} className="flex items-start gap-3">
                  <span className="mt-0.5 flex items-center justify-center w-5 h-5 rounded-full bg-obsidian/5 border border-obsidian/10 shrink-0">
                    <Check
                      className="w-3 h-3 text-corp-navy"
                      strokeWidth={2.5}
                    />
                  </span>
                  {it}
                </li>
              ))}
            </ul>
          </div>

          {/* RIGHT — form */}
          <div className="lg:col-span-7">
            <motion.form
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
              onSubmit={onSubmit}
              className="rounded-[20px] border border-graphite/15 bg-pristine p-6 sm:p-8 lg:p-10 shadow-[0_24px_60px_-30px_rgba(15,23,42,0.18)]"
              noValidate
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-7">
                {fields.map((f) => (
                  <label key={f.name} className="block">
                    <span className="block font-grotesk uppercase tracking-[0.16em] text-[10px] text-graphite/55 mb-2">
                      {f.label}
                      {f.required && (
                        <span className="text-corp-navy/60 ml-1">*</span>
                      )}
                    </span>
                    <input
                      type={f.type}
                      name={f.name}
                      required={f.required}
                      disabled={state === "submitting" || state === "ok"}
                      className="block w-full bg-transparent border-0 border-b border-graphite/25 px-0 py-2 text-base text-obsidian placeholder:text-graphite/35 focus:outline-none focus:border-corp-navy focus:ring-0 transition-colors disabled:opacity-60"
                      placeholder={
                        f.type === "email"
                          ? "voce@empresa.com.br"
                          : f.name === "cnpj"
                            ? "00.000.000/0000-00"
                            : f.name === "vidas"
                              ? "Ex: 80"
                              : "Como podemos chamar você"
                      }
                    />
                  </label>
                ))}
              </div>

              <div className="mt-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <p className="text-xs text-graphite/55 max-w-sm leading-relaxed">
                  Ao enviar, você concorda em receber retorno consultivo da
                  Elih. Seus dados são tratados conforme a LGPD.
                </p>
                <button
                  type="submit"
                  disabled={state === "submitting" || state === "ok"}
                  className="group inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-[10px] bg-obsidian text-pristine text-sm font-semibold hover:bg-corp-navy transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed shrink-0"
                >
                  {state === "ok" ? (
                    <>
                      Recebido <Check className="w-4 h-4" strokeWidth={2.5} />
                    </>
                  ) : state === "submitting" ? (
                    "Enviando..."
                  ) : (
                    <>
                      Falar com Consultor
                      <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </>
                  )}
                </button>
              </div>

              {state === "ok" && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-6 text-sm text-corp-navy/80 border-t border-graphite/15 pt-5"
                >
                  Recebemos sua solicitação. Um consultor da Elih retorna em
                  breve.
                </motion.p>
              )}
            </motion.form>
          </div>
        </div>
      </div>
    </section>
  );
}
