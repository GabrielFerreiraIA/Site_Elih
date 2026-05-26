"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import Overline from "./Overline";

export default function SectionHeader({
  overline,
  title,
  subtitle,
  tone = "dark",
  align = "left",
  className = "",
}: {
  overline?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  tone?: "dark" | "light";
  align?: "left" | "center";
  className?: string;
}) {
  const alignClass = align === "center" ? "text-center mx-auto" : "text-left";
  const titleColor = tone === "dark" ? "text-pristine" : "text-obsidian";
  const subColor =
    tone === "dark" ? "text-platinum/65" : "text-graphite/75";

  return (
    <div className={`${alignClass} max-w-3xl ${className}`}>
      {overline && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.5 }}
          className="mb-5"
        >
          <Overline tone={tone}>{overline}</Overline>
        </motion.div>
      )}
      <motion.h2
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6, delay: 0.05 }}
        className={`text-balance text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight ${titleColor}`}
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className={`mt-5 text-base sm:text-lg leading-relaxed text-balance ${subColor}`}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
