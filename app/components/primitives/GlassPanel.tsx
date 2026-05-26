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
      ? "glass-dark border-platinum/10"
      : "glass-light border-graphite/10";
  return (
    <div
      className={`${base} border rounded-[20px] shadow-[0_24px_60px_-30px_rgba(2,6,23,0.6)] ${className}`}
    >
      {children}
    </div>
  );
}
