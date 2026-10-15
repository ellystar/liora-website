import Reveal from "./Reveal";
import type { Lang } from "@/lib/i18n";

const COPY = {
  en: {
    kick: "02 · WHAT WE BUILD",
    h2: { pre: "Every brand has different needs in the ", soul: "age of AI", post: "." },
    h2b: "So should its system.",
    body: "We build a custom visual system for each brand — one that scales its imagery without losing what makes it itself.",
    offers: [
      {
        title: "Visual Systems",
        desc: "On-brand imagery and video systems for catalog, campaign and commerce.",
      },
      {
        title: "Campaign & Commerce",
        desc: "Turning brand imagery into a connected campaign and commerce ecosystem.",
      },
      {
        title: "Creative Residency",
        desc: "An external creative systems team, embedded long-term.",
      },
    ],
  },
  tr: {
    kick: "02 · NE KURUYORUZ",
    h2: { pre: "", soul: "Yapay zekâ çağında", post: " her markanın ihtiyacı farklı." },
    h2b: "Sistemi de öyle olmalı.",
    body: "Her marka için ona özel bir görsel sistem kuruyoruz: görsellerini çoğaltırken markayı kendisi yapan şeyi kaybetmeyen bir sistem.",
    offers: [
      {
        title: "Görsel Sistemler",
        desc: "Katalog, kampanya ve e-ticaret için markanın diline sadık görsel ve video sistemleri.",
      },
      {
        title: "Kampanya ve E-ticaret",
        desc: "Marka görsellerini birbirine bağlı bir kampanya ve e-ticaret ekosistemine dönüştürmek.",
      },
      {
        title: "Yaratıcı Ortaklık",
        desc: "Ekibinizin bir parçası gibi, uzun vadede yanınızda çalışan dışarıdan bir yaratıcı sistemler ekibi.",
      },
    ],
  },
};

export default function WhatWeBuild({ lang = "en" }: { lang?: Lang }) {
  const t = COPY[lang];
  return (
    <section id="build" className="bg-bone-2">
      <div className="wrap py-[clamp(88px,13vw,164px)]">
        <Reveal stagger={0.1} className="mb-[clamp(40px,6vw,72px)] max-w-2xl">
          <p className="meta mb-5">{t.kick}</p>
          <h2 className="d2 text-ink">
            {t.h2.pre}
            <span className="soul">{t.h2.soul}</span>
            {t.h2.post}
            <br />
            {t.h2b}
          </h2>
          <p className="body mt-6 text-text-mut">{t.body}</p>
        </Reveal>

        <Reveal className="grid grid-cols-1 border-t border-stone/70 md:grid-cols-3">
          {t.offers.map((o, i) => (
            <article
              key={o.title}
              className={`group flex flex-col py-9 transition-colors duration-300 ease-liora md:pr-8 ${
                i > 0 ? "border-t border-stone/70 md:border-l md:border-t-0 md:pl-8" : ""
              }`}
            >
              <div className="meta tnum">{String(i + 1).padStart(2, "0")} ·</div>
              <h3 className="d3 mt-4 text-ink">{o.title}</h3>
              <p className="body-s mt-3.5 !max-w-none flex-1">{o.desc}</p>
            </article>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
