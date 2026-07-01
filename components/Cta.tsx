import Link from "next/link";

type Variant = "primary" | "ghost" | "text";

type CtaProps = {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  onDark?: boolean;
  className?: string;
  ariaLabel?: string;
};

/**
 * Buttons name what happens. Primary resolves to oxblood on hover — the soul
 * color spent at the moment of decision. The arrow slides 4px; nothing bounces.
 */
export default function Cta({
  href,
  children,
  variant = "primary",
  onDark = false,
  className = "",
  ariaLabel,
}: CtaProps) {
  const base =
    "group/cta inline-flex items-center gap-2.5 font-ui text-sm font-medium leading-none rounded-[2px] transition-colors duration-300 ease-liora focus-visible:outline-2";

  const variants: Record<Variant, string> = {
    primary: onDark
      ? "px-[22px] py-[14px] border border-bone bg-bone text-ink hover:bg-oxblood hover:border-oxblood hover:text-bone"
      : "px-[22px] py-[14px] border border-ink bg-ink text-bone hover:bg-oxblood hover:border-oxblood",
    ghost: onDark
      ? "px-[22px] py-[14px] border border-on-dark/35 bg-transparent text-on-dark hover:bg-on-dark hover:text-ink hover:border-on-dark"
      : "px-[22px] py-[14px] border border-ink/80 bg-transparent text-ink hover:bg-ink hover:text-bone",
    text: onDark
      ? "text-on-dark hover:text-gold"
      : "text-ink hover:text-gold",
  };

  return (
    <Link
      href={href}
      aria-label={ariaLabel}
      className={`${base} ${variants[variant]} ${className}`}
    >
      <span>{children}</span>
      <span
        aria-hidden="true"
        className="transition-transform duration-300 ease-liora group-hover/cta:translate-x-1"
      >
        →
      </span>
    </Link>
  );
}
