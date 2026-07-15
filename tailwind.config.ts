import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Legacy colors mapped to new scale for smooth transition
        obsidian: "#010b28",
        "corp-navy": "#011246",
        "deep-navy": "#02195f",
        graphite: "#1a202e",
        platinum: "#e7e9ef",
        "cool-gray": "#878fa1",
        pristine: "#ffffff",
        clinical: "#fafbfd",
        "soft-slate": "#f2f4f7",
        "inst-blue": "#c9d6fd",
        // New Design System Scales
        navy: {
          50: "#f2f5ff",
          100: "#e1e8fe",
          150: "#c9d6fd",
          200: "#a9bdf9",
          300: "#7796f3",
          400: "#3e69ea",
          500: "#1142d4",
          600: "#0931aa",
          700: "#042381",
          800: "#02195f",
          900: "#011246",
          950: "#010b28",
        },
        neutral: {
          0: "#ffffff",
          50: "#fafbfd",
          100: "#f2f4f7",
          200: "#e7e9ef",
          300: "#d6d9e1",
          400: "#b3b9c6",
          500: "#878fa1",
          600: "#606a80",
          700: "#454c5f",
          800: "#2d3443",
          900: "#1a202e",
          950: "#0d121c",
        },
        accent: {
          100: "#e2eefd",
          300: "#7db4f7",
          500: "#2582f4",
          700: "#0f5cc4",
        },
        success: {
          100: "#e8f7f0",
          500: "#298e5f",
          700: "#1c6b47",
        },
        warning: {
          100: "#fef4dc",
          500: "#f29e0d",
          700: "#b97505",
        },
        danger: {
          100: "#fce8e9",
          500: "#d3222e",
          700: "#a01820",
        },
      },
      fontFamily: {
        sans: ["var(--font-nunito)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        grotesk: ["var(--font-display)", "system-ui", "sans-serif"],
        serif: ["var(--font-display)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        overline: "0.14em",
        tight: "-0.02em",
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
