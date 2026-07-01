import Image from "next/image";

type Preset = "hero" | "card";
type RevealMode = "static" | "hover";

const SEAMS: Record<
  Preset,
  { clip: string; tear: string }
> = {
  // near-vertical jagged tear through the centre
  hero: {
    clip: "polygon(46% 0,51% 7%,47% 15%,53% 23%,48% 32%,55% 40%,49% 49%,56% 58%,50% 67%,57% 75%,51% 84%,58% 92%,53% 100%,100% 100%,100% 0)",
    tear: "M46 0 L51 7 L47 15 L53 23 L48 32 L55 40 L49 49 L56 58 L50 67 L57 75 L51 84 L58 92 L53 100",
  },
  // seam sits to the right — for portrait work cards
  card: {
    clip: "polygon(60% 0,64% 9%,59% 18%,66% 28%,60% 38%,67% 48%,61% 58%,68% 68%,62% 78%,69% 88%,63% 100%,100% 100%,100% 0)",
    tear: "M60 0 L64 9 L59 18 L66 28 L60 38 L67 48 L61 58 L68 68 L62 78 L69 88 L63 100",
  },
};

type TornSeamProps = {
  craftSrc: string;
  craftAlt: string;
  aiSrc: string;
  aiAlt?: string;
  preset?: Preset;
  reveal?: RevealMode;
  priority?: boolean;
  sizes?: string;
  className?: string;
};

/**
 * The Torn Seam — Liora's one bold gesture.
 *
 * An old-master "craft" image, torn open to reveal its AI continuation.
 * The reveal IS the seam: nothing zooms, nothing scales. In `hover` mode the
 * AI half and the torn edge resolve in on hover; in `static` mode the seam is
 * always present (hero, dividers).
 */
export default function TornSeam({
  craftSrc,
  craftAlt,
  aiSrc,
  aiAlt = "",
  preset = "hero",
  reveal = "static",
  priority = false,
  sizes = "(max-width: 768px) 100vw, 50vw",
  className = "",
}: TornSeamProps) {
  const seam = SEAMS[preset];
  const hover = reveal === "hover";

  return (
    <div
      className={`group relative h-full w-full overflow-hidden bg-ink ${className}`}
    >
      {/* Craft half — the old master, warm */}
      <Image
        src={craftSrc}
        alt={craftAlt}
        fill
        priority={priority}
        sizes={sizes}
        className="object-cover object-center [filter:saturate(1.02)_contrast(1.02)]"
      />

      {/* AI continuation half — clipped to the right of the tear */}
      <div
        className={`absolute inset-0 transition-opacity duration-700 ease-liora ${
          hover ? "opacity-0 group-hover:opacity-100" : "opacity-100"
        }`}
        style={{ clipPath: seam.clip, WebkitClipPath: seam.clip } as React.CSSProperties}
        aria-hidden={hover ? true : undefined}
      >
        <Image
          src={aiSrc}
          alt={hover ? "" : aiAlt}
          fill
          sizes={sizes}
          className="object-cover object-center [filter:grayscale(0.32)_contrast(1.06)_brightness(0.86)]"
        />
        {/* warm-to-dark tone so the machine half reads cooler, deeper */}
        <div className="absolute inset-0 bg-gradient-to-br from-ink/35 via-ink/10 to-ink/70" />
        {/* the signature gold halftone — texture of the continuation */}
        <div className="halftone-gold absolute inset-0 opacity-45 mix-blend-soft-light" />
      </div>

      {/* The torn edge itself, drawn in bone */}
      <svg
        className={`pointer-events-none absolute inset-0 h-full w-full transition-opacity duration-700 ease-liora ${
          hover ? "opacity-0 group-hover:opacity-100" : "opacity-100"
        }`}
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d={seam.tear}
          fill="none"
          stroke="var(--bone)"
          strokeWidth={2.2}
          vectorEffect="non-scaling-stroke"
          style={{ filter: "drop-shadow(0 0 0.5px rgba(0,0,0,0.45))" }}
        />
      </svg>
    </div>
  );
}
