import { ArrowUpRight } from "lucide-react";
import { ReactNode } from "react";

type Tone = "onDark" | "onLight";

export default function PrimaryButton({
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
      ? "bg-white text-navy-900 hover:bg-navy-100 shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)]"
      : "bg-navy-900 text-white hover:bg-navy-950 shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)]";
  return (
    <a
      href={href}
      className={`group inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full text-sm font-semibold font-display transition-all duration-200 ${palette} ${className}`}
    >
      {children}
      <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </a>
  );
}
