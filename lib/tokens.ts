/**
 * Design Tokens — Elih Seguros
 * Espelha tailwind.config.ts. Use estes em código TS quando precisar de valores brutos.
 */

export const colors = {
  // Dark / Executive
  obsidian: "#020617",
  corpNavy: "#0F172A",
  deepNavy: "#0C1324",
  graphite: "#1E293B",
  platinum: "#E2E8F0",
  coolGray: "#C5C6CB",
  // Light / Clinical
  pristine: "#FFFFFF",
  clinical: "#F8FAFC",
  softSlate: "#E5E7EB",
  instBlue: "#CBD5E1",
} as const;

export const motion = {
  fadeUp: {
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.8, ease: "easeOut" },
  },
  stagger: {
    container: {
      animate: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
    },
    item: {
      initial: { opacity: 0, y: 16 },
      animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    },
  },
  viewport: { once: true, amount: 0.3 } as const,
} as const;
