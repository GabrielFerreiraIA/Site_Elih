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
      ? "border-platinum/20 text-platinum hover:border-platinum/60 hover:text-pristine"
      : "border-graphite/20 text-graphite hover:border-graphite/60 hover:text-obsidian";
  return (
    <a
      href={href}
      className={`inline-flex items-center gap-2 px-6 py-3.5 rounded-[10px] text-sm font-semibold border transition-colors duration-200 ${palette} ${className}`}
    >
      {children}
    </a>
  );
}
