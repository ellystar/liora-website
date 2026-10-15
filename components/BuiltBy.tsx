import Reveal from "./Reveal";
import type { Lang } from "@/lib/i18n";

const FOUNDERS = [
  {
    name: "Melis Dogan",
    role: { en: "Co-Founder · Creative Director", tr: "Kurucu Ortak · Kreatif Direktör" },
    url: "https://www.linkedin.com/in/melis-dogan/",
  },
  {
    name: "Elif Yildiz",
    role: { en: "Co-Founder · Product Manager", tr: "Kurucu Ortak · Ürün Yöneticisi" },
    url: "https://www.linkedin.com/in/eelifyildiz/",
  },
];

const COPY = {
  en: {
    kick: "05 · Built by",
    lead: ["Liora is built by two women working between ", "design", " and ", "technology", "."],
    body: "We design technology that helps brands move faster without losing their identity, taste or creative direction.",
    meta: "Independent · Based in Turkey · Working globally",
    linkedin: "on LinkedIn",
  },
  tr: {
    kick: "05 · Kuranlar",
    lead: ["Liora'yı ", "tasarım", " ile ", "teknoloji", " arasında çalışan iki kadın kurdu."],
    body: "Markaların kimliğini, zevkini ve yaratıcı yönünü kaybetmeden daha hızlı ilerlemesine yardım eden teknolojiler tasarlıyoruz.",
    meta: "Bağımsız · Türkiye merkezli · Dünyayla çalışıyor",
    linkedin: "LinkedIn'de",
  },
};

/**
 * Built by — left: the statement; right: the two founders as a linked list
 * that mirrors the "On the horizon" row pattern (hairline per row, content
 * left, trailing arrow right). Off-site links use a diagonal arrow.
 */
export default function BuiltBy({ lang = "en" }: { lang?: Lang }) {
  const t = COPY[lang];
  const [a, soul1, b, soul2, c] = t.lead;
  return (
    <section id="built-by" className="bg-oxblood text-bone">
      <div className="wrap grid grid-cols-1 items-center gap-x-16 gap-y-12 py-[clamp(90px,12vw,140px)] md:grid-cols-[0.95fr_1.05fr]">
        {/* Left — the statement */}
        <Reveal stagger={0.12} className="max-w-md">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-bone/60">
            {t.kick}
          </p>
          <p className="d2 mt-[22px] text-bone">
            {a}
            <span className="soul">{soul1}</span>
            {b}
            <span className="soul">{soul2}</span>
            {c}
          </p>
          <p className="body mt-6 text-bone/70">{t.body}</p>
          <p className="mt-11 font-mono text-[11px] uppercase tracking-[0.14em] text-bone/60">
            {t.meta}
          </p>
        </Reveal>

        {/* Right — founders as a linked list */}
        <Reveal as="ul" stagger={0.08} className="border-t border-bone/20">
          {FOUNDERS.map((f) => (
            <li key={f.name}>
              <a
                href={f.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${f.name} ${t.linkedin}`}
                className="group flex items-baseline justify-between gap-6 border-b border-bone/20 py-6"
              >
                <span className="flex flex-wrap items-baseline gap-x-3 gap-y-1 transition-transform duration-300 ease-liora group-hover:translate-x-1.5">
                  <span className="d4 text-bone">{f.name}</span>
                  <span className="font-mono text-[12px] tracking-[0.04em] text-bone/60 transition-colors duration-300 ease-liora group-hover:text-bone/80">
                    {f.role[lang]}
                  </span>
                </span>
                <span
                  aria-hidden="true"
                  className="shrink-0 text-bone/60 transition-[transform,color] duration-300 ease-liora group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-bone"
                >
                  ↗
                </span>
              </a>
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
