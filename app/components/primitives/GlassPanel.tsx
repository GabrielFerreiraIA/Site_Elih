import { ReactNode } from "react";

export default function GlassPanel({
  children,
  className = "",
  tone = "dark",
}: {
  children: ReactNode;
  className?: string;
  tone?: "dark" | "light";
}) {
  const base =
    tone === "dark"
      ? "glass-dark border-white/10"
      : "bg-white border-neutral-200/80";
  return (
    <div
      className={`${base} border rounded-[20px] shadow-[var(--shadow-lg)] ${className}`}
    >
      {children}
    </div>
  );
}
