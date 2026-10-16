import Link from "next/link";
import Image from "next/image";
import Reveal from "./Reveal";
import { type Lang, localize } from "@/lib/i18n";

type Work = {
  num: string;
  title: string;
  tag: string;
  art: string; // the card cover image
  reveal?: string; // hover: dissolves the cover into the real work
  revealPos?: string; // object-position for the reveal, when its subject isn't centred
  href?: string; // present = the case study is live and the card is clickable
};

const WORK: Record<Lang, Work[]> = {
  en: [
    {
      num: "01",
      title: "Launching a brand in 72 hours",
      tag: "Visual launch system · ADV",
      art: "/img/adv-1.jpg",
      reveal: "/img/adv-card.jpg",
      href: "/work/adv",
    },
    {
      num: "02",
      title: "Editorial, by the batch",
      tag: "Editorial system · Kiğılı Signature",
      art: "/img/kigili-1.jpg",
      reveal: "/kigili-hero.jpg",
      revealPos: "78% 30%",
      href: "/work/kigili",
    },
    {
      num: "03",
      title: "Rebuilding a catalogue without reshooting it",
      tag: "Catalogue refresh system · DS Damat & Damat Tween",
      art: "/img/damat-3.jpg",
    },
  ],
  tr: [
    {
      num: "01",
      title: "72 saatte bir marka lansmanı",
      tag: "Görsel lansman sistemi · ADV",
      art: "/img/adv-1.jpg",
      reveal: "/img/adv-card.jpg",
      href: "/work/adv",
    },
    {
      num: "02",
      title: "Editoryal, seri hâlinde",
      tag: "Editoryal sistem · Kiğılı Signature",
      art: "/img/kigili-1.jpg",
      reveal: "/kigili-hero.jpg",
      revealPos: "78% 30%",
      href: "/work/kigili",
    },
    {
      num: "03",
      title: "Bir kataloğu yeniden çekmeden yenilemek",
      tag: "Katalog yenileme sistemi · DS Damat & Damat Tween",
      art: "/img/damat-3.jpg",
    },
  ],
};

// Private / in-progress engagements — volume without breaking NDAs.
type Engagement = { year: string; system: string; client: string; status: string; soon: boolean };
const ENGAGEMENTS: Record<Lang, Engagement[]> = {
  en: [
    { year: "2026", system: "Visual Production System", client: "Private denim brand", status: "Coming soon", soon: true },
    { year: "2026", system: "Campaign Infrastructure", client: "Confidential", status: "Coming soon", soon: true },
    { year: "2025", system: "Editorial System", client: "Private retailer", status: "NDA", soon: false },
    { year: "2025", system: "Commerce Visual System", client: "Confidential", status: "NDA", soon: false },
    { year: "2025", system: "Jewellery Visual System", client: "Private jewellery house", status: "NDA", soon: false },
  ],
  tr: [
    { year: "2026", system: "Görsel Üretim Sistemi", client: "Gizli denim markası", status: "Yakında", soon: true },
    { year: "2026", system: "Kampanya Altyapısı", client: "Gizli", status: "Yakında", soon: true },
    { year: "2025", system: "Editoryal Sistem", client: "Gizli perakendeci", status: "NDA", soon: false },
    { year: "2025", system: "E-ticaret Görsel Sistemi", client: "Gizli", status: "NDA", soon: false },
    { year: "2025", system: "Mücevher Görsel Sistemi", client: "Gizli mücevher evi", status: "NDA", soon: false },
  ],
};

const COPY = {
  en: {
    kick: "03 · SELECTED SYSTEMS",
    h2: { pre: "A few systems we’ve ", soul: "built", post: "." },
    aside: "Every engagement begins with a different constraint. The system is always bespoke.",
    read: "Read",
    readAria: "read the case study",
    cover: "cover",
    soon: "Coming soon",
    soonLine: "The story is still being written.",
    cols: ["Year", "System", "Client", "Status"],
    more: "+ 12 additional private engagements.",
    request: "Available upon request",
  },
  tr: {
    kick: "03 · SEÇİLMİŞ SİSTEMLER",
    h2: { pre: "", soul: "Kurduğumuz", post: " sistemlerden birkaçı." },
    aside: "Her iş farklı bir kısıtla başlar. Sistem her zaman markaya özeldir.",
    read: "Oku",
    readAria: "işin hikâyesini okuyun",
    cover: "kapak",
    soon: "Yakında",
    soonLine: "Hikâye hâlâ yazılıyor.",
    cols: ["Yıl", "Sistem", "Müşteri", "Durum"],
    more: "+ 12 gizli iş daha.",
    request: "Talep üzerine paylaşılır",
  },
};

const CARD_SIZES = "(max-width: 640px) 92vw, (max-width: 768px) 46vw, 360px";

export default function FeaturedWork({ lang = "en" }: { lang?: Lang }) {
  const t = COPY[lang];
  return (
    <section id="work" className="bg-ink text-on-dark">
      <div className="wrap py-[clamp(88px,13vw,164px)]">
        {/* header */}
        <Reveal
          stagger={0.1}
          className="mb-[clamp(40px,6vw,72px)] flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
        >
          <div className="max-w-xl">
            <p className="meta mb-5 !text-on-dark-mut">{t.kick}</p>
            <h2 className="d2 text-on-dark">
              {t.h2.pre}
              <span className="soul">{t.h2.soul}</span>
              {t.h2.post}
            </h2>
          </div>
          <p className="body-s !max-w-sm !text-on-dark-mut">{t.aside}</p>
        </Reveal>

        {/* three featured systems */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 md:gap-7">
          {WORK[lang].map((w) => {
            const ready = Boolean(w.href);

            const identity = (
              <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-ink/85 via-ink/20 to-transparent p-5">
                <div className="meta !text-on-dark-mut">{w.num}</div>
                <h3 className="d4 mt-1.5 max-w-[16ch] text-on-dark">{w.title}</h3>
                <p className="mt-2 font-mono text-[10px] uppercase tracking-meta text-on-dark-mut">
                  {w.tag}
                </p>
              </div>
            );

            // live case — an old-master cover that dissolves into the real
            // work on hover, with READ.
            const readyCard = (
              <article className="group/read relative aspect-[4/5] cursor-pointer overflow-hidden rounded-[2px] bg-ink">
                <Image
                  src={w.art}
                  alt={`${w.title} — ${t.cover}`}
                  fill
                  sizes={CARD_SIZES}
                  className="object-cover object-center [filter:saturate(1.02)_contrast(1.02)] transition-opacity duration-[1200ms] ease-[cubic-bezier(0.4,0,0.2,1)] group-hover/read:opacity-0"
                />
                <Image
                  src={w.reveal!}
                  alt=""
                  fill
                  sizes={CARD_SIZES}
                  className="object-cover object-[50%_32%] opacity-0 transition-opacity duration-[1200ms] ease-[cubic-bezier(0.4,0,0.2,1)] group-hover/read:opacity-100"
                  style={w.revealPos ? { objectPosition: w.revealPos } : undefined}
                />
                <div className="pointer-events-none absolute bottom-5 right-5 z-20 flex translate-y-1 items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-on-dark opacity-0 transition duration-500 ease-liora group-hover/read:translate-y-0 group-hover/read:opacity-100">
                  {t.read} <span aria-hidden>→</span>
                </div>
                {identity}
              </article>
            );

            // in preparation — painting stays; hover reveals the line, no link.
            const soonCard = (
              <article className="group/soon relative aspect-[4/5] cursor-default overflow-hidden rounded-[2px] bg-ink">
                <Image
                  src={w.art}
                  alt=""
                  fill
                  sizes={CARD_SIZES}
                  className="object-cover object-center grayscale-[0.5] brightness-[0.5] transition duration-700 ease-liora group-hover/soon:brightness-[0.32]"
                />
                <div className="absolute right-4 top-4 z-10 font-mono text-[9.5px] uppercase tracking-[0.18em] text-gold">
                  {t.soon}
                </div>
                <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center p-6">
                  <p className="max-w-[15ch] translate-y-1 text-balance text-center font-display text-[19px] font-light italic leading-snug text-on-dark opacity-0 transition duration-500 ease-liora group-hover/soon:translate-y-0 group-hover/soon:opacity-100">
                    {t.soonLine}
                  </p>
                </div>
                {identity}
              </article>
            );

            return (
              <Reveal key={w.num} className="group/card">
                {ready ? (
                  <Link
                    href={localize(lang, w.href!)}
                    aria-label={`${w.title} — ${t.readAria}`}
                    className="block rounded-[2px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
                  >
                    {readyCard}
                  </Link>
                ) : (
                  soonCard
                )}
              </Reveal>
            );
          })}
        </div>

        {/* coming soon · private engagements */}
        <Reveal delay={0.05} className="mt-[clamp(64px,9vw,116px)]">
          <div className="grid grid-cols-[48px_1fr_96px] items-center gap-4 border-b border-on-dark/10 pb-4 sm:grid-cols-[72px_1.2fr_1fr_104px] sm:gap-8">
            <span className="meta !text-on-dark-mut">{t.cols[0]}</span>
            <span className="meta !text-on-dark-mut">{t.cols[1]}</span>
            <span className="hidden meta !text-on-dark-mut sm:block">{t.cols[2]}</span>
            <span className="meta justify-self-end !text-on-dark-mut">{t.cols[3]}</span>
          </div>

          <ul>
            {ENGAGEMENTS[lang].map((e, i) => (
              <li
                key={i}
                className="grid grid-cols-[48px_1fr_96px] items-center gap-4 border-b border-on-dark/[0.07] py-[clamp(15px,1.7vw,21px)] transition-colors duration-300 ease-liora hover:bg-on-dark/[0.02] sm:grid-cols-[72px_1.2fr_1fr_104px] sm:gap-8"
              >
                <span className="font-mono text-[12px] tracking-wide text-gold">
                  {e.year}
                </span>
                <span className="font-display text-[clamp(16px,1.9vw,22px)] font-light leading-tight text-on-dark">
                  {e.system}
                </span>
                <span className="hidden font-mono text-[11px] uppercase tracking-[0.1em] text-on-dark-mut sm:block">
                  {e.client}
                </span>
                <span
                  className={`justify-self-end font-mono text-[10px] uppercase tracking-[0.16em] ${
                    e.soon
                      ? "text-gold"
                      : "text-on-dark-mut/70"
                  }`}
                >
                  {e.status}
                </span>
              </li>
            ))}
          </ul>

          <p className="mt-8 max-w-xl">
            <span className="d3 block text-on-dark">{t.more}</span>
            <span className="mt-2 block font-mono text-[11px] uppercase tracking-[0.16em] text-on-dark-mut">
              {t.request}
            </span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
