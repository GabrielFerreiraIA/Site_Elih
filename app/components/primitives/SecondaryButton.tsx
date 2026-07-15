import { ReactNode } from "react";

type Tone = "onDark" | "onLight";

export default function SecondaryButton({
  href,
  children,
  tone = "onDark",
  className = "",
}: {
  href: string;
  children: ReactNode;
  tone?: Tone;
  className?: string;
}) {
  const palette =
    tone === "onDark"
      ? "border-white/30 text-white hover:bg-white/5"
      : "border-navy-300 text-navy-800 hover:bg-navy-50";
  return (
    <a
      href={href}
      className={`inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-semibold font-display border transition-colors duration-200 ${palette} ${className}`}
    >
      {children}
    </a>
  );
}
