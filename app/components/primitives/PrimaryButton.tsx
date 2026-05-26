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
      ? "bg-pristine text-obsidian hover:bg-platinum"
      : "bg-obsidian text-pristine hover:bg-corp-navy";
  return (
    <a
      href={href}
      className={`group inline-flex items-center gap-2.5 px-6 py-3.5 rounded-[10px] text-sm font-semibold transition-colors duration-200 ${palette} ${className}`}
    >
      {children}
      <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </a>
  );
}
