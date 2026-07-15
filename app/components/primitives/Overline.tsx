import { ReactNode } from "react";

type Tone = "dark" | "light";

export default function Overline({
  children,
  tone = "dark",
  className = "",
}: {
  children: ReactNode;
  tone?: Tone;
  className?: string;
}) {
  const overlineClass = tone === "dark" ? "overline--on-dark" : "";
  return (
    <span
      className={`overline ${overlineClass} inline-flex items-center gap-2 ${className}`}
    >
      <span className="inline-block w-6 h-px bg-current opacity-40" aria-hidden />
      {children}
    </span>
  );
}
