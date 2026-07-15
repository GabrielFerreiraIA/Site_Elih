import { LucideIcon } from "lucide-react";

/**
 * Slot fotográfico premium — substitua por <Image> quando tiver fotos reais.
 * Visual: gradient navy → graphite, ícone discreto centralizado, caption microcopy.
 */
export default function PhotoPlaceholder({
  caption,
  icon: Icon,
  aspect = "aspect-[4/5]",
  className = "",
}: {
  caption: string;
  icon?: LucideIcon;
  aspect?: string;
  className?: string;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-[20px] border border-white/10 ${aspect} ${className}`}
      role="img"
      aria-label={caption}
    >
      {/* base gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-navy-900 via-neutral-900 to-navy-950" />
      {/* spot light */}
      <div className="absolute -top-1/3 -right-1/4 w-[120%] h-[120%] bg-[radial-gradient(circle_at_top_right,rgba(242,245,255,0.14),transparent_55%)]" />
      {/* bottom shade */}
      <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-navy-950/80 to-transparent" />

      {/* icon center */}
      {Icon && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-14 h-14 rounded-full border border-white/15 flex items-center justify-center bg-white/5 backdrop-blur-sm">
            <Icon className="w-6 h-6 text-white/50" strokeWidth={1.25} />
          </div>
        </div>
      )}

      {/* caption */}
      <div className="absolute left-6 right-6 bottom-6 flex items-end justify-between gap-4">
        <p className="overline text-white/60">{caption}</p>
        <span className="overline text-white/30">placeholder</span>
      </div>
    </div>
  );
}
