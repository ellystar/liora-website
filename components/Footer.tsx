import Link from "next/link";
import CookieSettingsButton from "./CookieSettingsButton";
import { type Lang, localize } from "@/lib/i18n";

const SOCIAL = [
  { label: "LinkedIn", href: "https://www.linkedin.com/company/liora1/" },
  { label: "Instagram", href: "https://www.instagram.com/lioralabs_/" },
];

const COPY = {
  en: {
    tagline: "An AI-native creative systems lab for fashion, beauty and design-led brands.",
    explore: "Explore",
    links: [
      { label: "What we build", href: "/#build" },
      { label: "Work", href: "/#work" },
      { label: "Atelier", href: "/#horizon" },
      { label: "About", href: "/#built-by" },
    ],
    contact: "Contact",
    newTab: "opens in a new tab",
    legal: "Legal",
    privacy: "Privacy Policy",
    sales: "Distance Sales Agreement",
    returns: "Delivery & Return Terms",
    cookies: "Cookie settings",
    language: "Language",
  },
  tr: {
    tagline: "Moda, güzellik ve tasarım odaklı markalar için yapay zekâ temelli bir yaratıcı sistemler laboratuvarı.",
    explore: "Keşfet",
    links: [
      { label: "Ne kuruyoruz", href: "/#build" },
      { label: "İşler", href: "/#work" },
      { label: "Atelier", href: "/#horizon" },
      { label: "Hakkımızda", href: "/#built-by" },
    ],
    contact: "İletişim",
    newTab: "yeni sekmede açılır",
    legal: "Yasal",
    privacy: "Gizlilik Politikası",
    sales: "Mesafeli Satış Sözleşmesi",
    returns: "Teslimat ve İade Şartları",
    cookies: "Çerez ayarları",
    language: "Dil",
  },
};

export default function Footer({ lang = "en" }: { lang?: Lang }) {
  const t = COPY[lang];
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
            <p className="body-s mt-4 !max-w-[34ch] !text-text-mut">{t.tagline}</p>
          </div>

          {/* Explore */}
          <nav aria-label={t.explore}>
            <p className="mb-4 font-mono text-[10px] uppercase tracking-meta text-text-mut">
              {t.explore}
            </p>
            <ul className="space-y-2.5">
              {t.links.map((l) => (
                <li key={l.label}>
                  <Link
                    href={localize(lang, l.href)}
                    className="link-underline inline-block font-ui text-[13.5px] text-text/80 transition-colors duration-300 ease-liora hover:text-text"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <nav aria-label={t.contact}>
            <p className="mb-4 font-mono text-[10px] uppercase tracking-meta text-text-mut">
              {t.contact}
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
                    aria-label={`${s.label} (${t.newTab})`}
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
            <nav
              aria-label={t.language}
              className="flex items-center gap-2 font-mono text-[11px] text-text-mut"
            >
              <Link
                href="/"
                hrefLang="en"
                aria-current={lang === "en" ? "true" : undefined}
                className={lang === "en" ? "text-text" : "link-underline hover:text-text"}
              >
                English
              </Link>
              <span aria-hidden="true">·</span>
              <Link
                href="/tr"
                hrefLang="tr"
                aria-current={lang === "tr" ? "true" : undefined}
                className={lang === "tr" ? "text-text" : "link-underline hover:text-text"}
              >
                Türkçe
              </Link>
            </nav>
          </div>
          <nav
            aria-label={t.legal}
            className="flex flex-wrap items-center gap-x-3 gap-y-1.5 font-mono text-[11px] text-text-mut"
          >
            <Link href="/gizlilik" className="link-underline hover:text-text">
              {t.privacy}
            </Link>
            <span aria-hidden="true">·</span>
            <Link
              href="/mesafeli-satis"
              className="link-underline hover:text-text"
            >
              {t.sales}
            </Link>
            <span aria-hidden="true">·</span>
            <Link
              href="/iade-sartlari"
              className="link-underline hover:text-text"
            >
              {t.returns}
            </Link>
            <span aria-hidden="true">·</span>
            <CookieSettingsButton
              label={t.cookies}
              className="link-underline transition-colors duration-300 ease-liora hover:text-text"
            />
          </nav>
        </div>
      </div>
    </footer>
  );
}
