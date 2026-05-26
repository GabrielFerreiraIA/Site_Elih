import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Dark / Executive
        obsidian: "#020617",
        "corp-navy": "#0F172A",
        "deep-navy": "#0C1324",
        graphite: "#1E293B",
        platinum: "#E2E8F0",
        "cool-gray": "#C5C6CB",
        // Light / Clinical
        pristine: "#FFFFFF",
        clinical: "#F8FAFC",
        "soft-slate": "#E5E7EB",
        "inst-blue": "#CBD5E1",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        grotesk: ["var(--font-grotesk)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        overline: "0.18em",
      },
      maxWidth: {
        "8xl": "88rem",
      },
      keyframes: {
        "pulse-soft": {
          "0%, 100%": { opacity: "0.6" },
          "50%": { opacity: "1" },
        },
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        "pulse-soft": "pulse-soft 3s ease-in-out infinite",
        marquee: "marquee 40s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
