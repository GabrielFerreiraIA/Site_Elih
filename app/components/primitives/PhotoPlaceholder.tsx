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
      className={`relative overflow-hidden rounded-[20px] border border-platinum/10 ${aspect} ${className} grain`}
      role="img"
      aria-label={caption}
    >
      {/* base gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-corp-navy via-graphite to-deep-navy" />
      {/* spot light */}
      <div className="absolute -top-1/3 -right-1/4 w-[120%] h-[120%] bg-[radial-gradient(circle_at_top_right,rgba(226,232,240,0.18),transparent_55%)]" />
      {/* bottom shade */}
      <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-obsidian/80 to-transparent" />

      {/* icon center */}
      {Icon && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-14 h-14 rounded-full border border-platinum/15 flex items-center justify-center bg-platinum/5 backdrop-blur-sm">
            <Icon className="w-6 h-6 text-platinum/50" strokeWidth={1.25} />
          </div>
        </div>
      )}

      {/* caption */}
      <div className="absolute left-6 right-6 bottom-6 flex items-end justify-between gap-4">
        <p className="overline text-platinum/55">{caption}</p>
        <span className="overline text-platinum/30">placeholder</span>
      </div>
    </div>
  );
}
