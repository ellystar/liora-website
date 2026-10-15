"use client";

import { useState } from "react";
import Reveal from "./Reveal";
import type { Lang } from "@/lib/i18n";

/**
 * The questions brands actually ask, answered plainly.
 *
 * A disclosure list, but deliberately not a support-desk accordion: no cards,
 * no shadows, no chevrons. A question in display serif, a hairline beneath it,
 * and a "+" drawn from two hairlines that turns into a "−" as it opens. One
 * answer at a time, so it reads like a curated wall label rather than an FAQ.
 *
 * Each answer opens with the answer itself, so a passage still stands alone
 * when it is quoted out of context (search snippets, AI answers). Closed
 * answers stay in the DOM — the panel animates its height, never unmounts —
 * so crawlers and answer engines read all six either way. The FAQPage
 * structured data is generated from this same list, so the markup can never
 * drift from what a visitor reads.
 */
const FAQS_EN = [
  {
    q: "What is Liora Labs?",
    a: "Liora Labs is an AI-native creative systems lab for fashion, beauty and design-led brands. Instead of producing one-off AI images, we design a bespoke visual system for each brand — one that keeps producing on-brand imagery for catalogue, campaign and commerce long after the first delivery.",
  },
  {
    q: "Who do you work with?",
    a: "Fashion, beauty and design-led brands that need to scale their imagery without losing what makes them recognisable. We are independent, based in Turkey and working globally, and we take on a small number of brands at a time.",
  },
  {
    q: "How is this different from just generating images with AI?",
    a: "Anyone can generate one image. The difficulty is the thousandth one still looking like your brand. We build the system underneath it — casting, styling logic, framing and orchestration — so the output stays consistent instead of becoming a lottery of prompts.",
  },
  {
    q: "Does this replace a photoshoot?",
    a: "Often it removes the need for one. For ADV (Orka Holding) we launched a 250-product brand in 72 hours with no photoshoot — three frames per product, roughly 750 final images, produced by a system the brand kept using afterwards.",
  },
  {
    q: "What is Liora Atelier?",
    a: "Liora Atelier is our private platform, where brands create high-quality, on-brand imagery at scale themselves. It is currently in private beta and available by request.",
  },
  {
    q: "How do we start?",
    a: "Write to info@lioralabs.io, or use the form below and tell us what you’re scaling and what you refuse to lose. Every engagement begins with a different constraint, so the first conversation is about that constraint — not a package.",
  },
];

const FAQS_TR = [
  {
    q: "Liora Labs nedir?",
    a: "Liora Labs; moda, güzellik ve tasarım odaklı markalar için yapay zekâ temelli bir yaratıcı sistemler laboratuvarıdır. Tek seferlik yapay zekâ görselleri üretmek yerine her marka için ona özel bir görsel sistem tasarlarız. Bu sistem, ilk teslimattan çok sonra da katalog, kampanya ve e-ticaret için markanın diline sadık görseller üretmeye devam eder.",
  },
  {
    q: "Kimlerle çalışıyorsunuz?",
    a: "Görsellerini çoğaltırken onları tanınır kılan şeyi kaybetmek istemeyen moda, güzellik ve tasarım odaklı markalarla. Bağımsızız, Türkiye merkezliyiz, dünyanın her yerinden markalarla çalışıyoruz ve aynı anda yalnızca az sayıda markayı üstleniyoruz.",
  },
  {
    q: "Bunun yapay zekâyla görsel üretmekten farkı ne?",
    a: "Tek bir görseli herkes üretebilir. Zor olan, bininci görselin de hâlâ markanız gibi görünmesi. Biz bunun altındaki sistemi kuruyoruz: manken seçimi, styling mantığı, kadraj ve kare planı. Böylece sonuç bir prompt piyangosuna dönüşmüyor, tutarlı kalıyor.",
  },
  {
    q: "Bu, fotoğraf çekiminin yerini tutar mı?",
    a: "Çoğu zaman çekime gerek bırakmaz. ADV (Orka Holding) için 250 ürünlük bir markayı tek bir çekim yapmadan 72 saatte yayına aldık: ürün başına üç kare, yaklaşık 750 final görsel. Marka bu sistemi sonrasında da kullanmaya devam etti.",
  },
  {
    q: "Liora Atelier nedir?",
    a: "Liora Atelier, markaların kendi diline sadık, yüksek kaliteli görselleri ölçekli olarak kendilerinin ürettiği özel platformumuz. Şu an kapalı betada ve talep üzerine erişime açık.",
  },
  {
    q: "Nasıl başlıyoruz?",
    a: "info@lioralabs.io adresine yazın ya da aşağıdaki formdan neyi büyüttüğünüzü ve neyi kaybetmek istemediğinizi anlatın. Her iş farklı bir kısıtla başlar; bu yüzden ilk görüşme hazır bir paket üzerine değil, o kısıt üzerine olur.",
  },
];

const FAQS = { en: FAQS_EN, tr: FAQS_TR };

const COPY = {
  en: {
    kick: "06 · ANSWERS",
    h2: { pre: "Questions we’re often ", soul: "asked", post: "." },
    aside: "If yours isn’t here, write to us — we answer everything directly.",
  },
  tr: {
    kick: "06 · SORULAR",
    h2: { pre: "Bize en çok ", soul: "sorulanlar", post: "." },
    aside: "Sorunuz burada yoksa bize yazın; her soruyu doğrudan yanıtlıyoruz.",
  },
};

const faqSchema = (lang: Lang) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  inLanguage: lang,
  mainEntity: FAQS[lang].map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
});

export default function Answers({ lang = "en" }: { lang?: Lang }) {
  const t = COPY[lang];
  // One open at a time; the first is open so the section never reads as empty.
  const [open, setOpen] = useState<number>(0);

  return (
    <section id="answers" className="bg-bone-2">
      <div className="wrap py-[clamp(88px,13vw,164px)]">
        <Reveal
          stagger={0.1}
          className="mb-[clamp(36px,5vw,64px)] flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
        >
          <div className="max-w-xl">
            <p className="meta mb-5">{t.kick}</p>
            <h2 className="d2 text-ink">
              {t.h2.pre}
              <span className="soul">{t.h2.soul}</span>
              {t.h2.post}
            </h2>
          </div>
          <p className="body-s !max-w-sm !text-text-mut">{t.aside}</p>
        </Reveal>

        <Reveal delay={0.05}>
          <ul className="border-t border-stone/70">
            {FAQS[lang].map((f, i) => {
              const isOpen = open === i;
              return (
                <li
                  key={f.q}
                  className={`border-b transition-colors duration-500 ease-liora ${
                    isOpen ? "border-gold/45" : "border-stone/70"
                  }`}
                >
                  <h3>
                    <button
                      type="button"
                      id={`answer-q-${i}`}
                      aria-expanded={isOpen}
                      aria-controls={`answer-p-${i}`}
                      onClick={() => setOpen(isOpen ? -1 : i)}
                      className="group flex w-full items-start justify-between gap-8 py-[clamp(22px,2.8vw,34px)] text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
                    >
                      <span
                        className={`d3 max-w-[30ch] transition-colors duration-500 ease-liora ${
                          isOpen
                            ? "text-ink"
                            : "text-ink/65 group-hover:text-ink"
                        }`}
                      >
                        {f.q}
                      </span>

                      {/* A "+" drawn from two hairlines; the upright stroke
                          turns and fades away, leaving a "−". */}
                      <span
                        aria-hidden="true"
                        className="relative mt-[0.55em] h-3 w-3 shrink-0"
                      >
                        <span
                          className={`absolute left-0 top-1/2 h-px w-3 -translate-y-1/2 transition-colors duration-500 ease-liora ${
                            isOpen ? "bg-gold" : "bg-ink/45 group-hover:bg-gold"
                          }`}
                        />
                        <span
                          className={`absolute left-1/2 top-0 h-3 w-px -translate-x-1/2 transition-[transform,opacity,background-color] duration-500 ease-liora ${
                            isOpen
                              ? "rotate-90 bg-gold opacity-0"
                              : "rotate-0 bg-ink/45 opacity-100 group-hover:bg-gold"
                          }`}
                        />
                      </span>
                    </button>
                  </h3>

                  {/* Height animates via grid rows, so the answer is always in
                      the DOM — only its measured height changes. */}
                  <div
                    id={`answer-p-${i}`}
                    role="region"
                    aria-labelledby={`answer-q-${i}`}
                    className={`grid transition-[grid-template-rows] duration-[600ms] ease-liora ${
                      isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p
                        className={`body !max-w-[64ch] !text-text-mut pb-[clamp(24px,3vw,38px)] transition-[opacity,transform] duration-[600ms] ease-liora ${
                          isOpen
                            ? "translate-y-0 opacity-100"
                            : "-translate-y-1 opacity-0"
                        }`}
                      >
                        {f.a}
                      </p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>

      {/* Mirrors the visible Q&A above — generated from the same source. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(lang)) }}
      />
    </section>
  );
}
