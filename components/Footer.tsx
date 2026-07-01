import Link from "next/link";
import CookieSettingsButton from "./CookieSettingsButton";

const EXPLORE = [
  { label: "What we build", href: "/#build" },
  { label: "Work", href: "/#work" },
  { label: "Atelier", href: "/#horizon" },
  { label: "About", href: "/#built-by" },
];

const SOCIAL = [
  { label: "LinkedIn", href: "https://www.linkedin.com/company/liora1/" },
  { label: "Instagram", href: "https://www.instagram.com/lioralabs.io/" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-bone text-text">
      <div className="wrap py-[clamp(56px,8vw,96px)]">
        <div className="grid grid-cols-1 gap-x-12 gap-y-12 md:grid-cols-[1.6fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <Link
              href="#top"
              className="font-display text-[22px] tracking-wordmark text-ink"
              aria-label="Liora — home"
            >
              LIORA
            </Link>
            <p className="body-s mt-4 !max-w-[34ch] !text-text-mut">
              An AI-native creative systems lab for fashion, beauty and
              design-led brands.
            </p>
          </div>

          {/* Explore */}
          <nav aria-label="Explore">
            <p className="mb-4 font-mono text-[10px] uppercase tracking-meta text-text-mut">
              Explore
            </p>
            <ul className="space-y-2.5">
              {EXPLORE.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="link-underline inline-block font-ui text-[13.5px] text-text/80 transition-colors duration-300 ease-liora hover:text-text"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <nav aria-label="Contact">
            <p className="mb-4 font-mono text-[10px] uppercase tracking-meta text-text-mut">
              Contact
            </p>
            <ul className="space-y-2.5">
              <li>
                <a
                  href="mailto:info@lioralabs.io"
                  className="link-underline inline-block font-ui text-[13.5px] text-text/80 transition-colors duration-300 ease-liora hover:text-text"
                >
                  info@lioralabs.io
                </a>
              </li>
              {SOCIAL.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${s.label} (opens in a new tab)`}
                    className="group inline-flex items-center gap-1.5 font-ui text-[13.5px] text-text/80 transition-colors duration-300 ease-liora hover:text-text"
                  >
                    {s.label}
                    <span
                      aria-hidden="true"
                      className="text-text-mut transition-[transform,color] duration-300 ease-liora group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-text"
                    >
                      ↗
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Bottom bar */}
        <div className="mt-[clamp(48px,7vw,80px)] flex flex-col gap-4 border-t border-stone pt-7 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-1.5 sm:flex-row sm:items-center sm:gap-5">
            <p className="font-mono text-[11px] text-text-mut">© {year} Liora.</p>
            <p className="font-mono text-[11px] text-text-mut/70">
              Preserve and author.
            </p>
          </div>
          <nav
            aria-label="Legal"
            className="flex items-center gap-3 font-mono text-[11px] text-text-mut"
          >
            <Link href="/privacy" className="link-underline hover:text-text">
              Privacy Policy
            </Link>
            <span aria-hidden="true">·</span>
            <Link href="/terms" className="link-underline hover:text-text">
              Terms of Use
            </Link>
            <span aria-hidden="true">·</span>
            <CookieSettingsButton className="link-underline transition-colors duration-300 ease-liora hover:text-text" />
          </nav>
        </div>
      </div>
    </footer>
  );
}
