/**
 * Hero — ported 1:1 from the finished liora-hero.html reference.
 * 50/50 split, full uncropped composite bleeding up behind the transparent nav,
 * CSS-only staggered entrance. Styles live in globals.css (.hero / .btn).
 */

import Image from "next/image";
import { type Lang, mailto } from "@/lib/i18n";

const COPY = {
  en: {
    l1: "Technology is learning how to create.",
    l2: { pre: "We are learning to ", soul: "preserve", post: " what matters." },
    sub: "We build AI-native creative systems for fashion and beauty brands.",
    slogan: "Scale without losing soul.",
    cta: "Get in touch",
    atelier: "Explore the Atelier",
    alt: "A contemporary model's face torn along a paper seam into Botticelli's Venus painting - the seam is the reveal.",
  },
  tr: {
    l1: "Teknoloji yaratmayı öğreniyor.",
    l2: { pre: "Biz de önemli olanı ", soul: "korumayı", post: " öğreniyoruz." },
    sub: "Moda ve güzellik markaları için yapay zekâ temelli yaratıcı sistemler kuruyoruz.",
    slogan: "Büyürken ruhunu kaybetme.",
    cta: "İletişime geçin",
    atelier: "Atelier'i keşfedin",
    alt: "Günümüz bir modelin yüzü, kâğıt bir dikiş boyunca yırtılarak Botticelli'nin Venüs tablosuna açılıyor; yırtık, keşfin kendisi.",
  },
};

export default function Hero({ lang = "en" }: { lang?: Lang }) {
  const t = COPY[lang];
  return (
    <header id="top" className="hero">
      <div className="hero-text">
        <h1>
          <span className="l1">{t.l1}</span>
          <span className="l2">
            {t.l2.pre}
            <span className="soul">{t.l2.soul}</span>
            {t.l2.post}
          </span>
        </h1>
        <p className="sub">{t.sub}</p>
        <p className="slogan">{t.slogan}</p>
        <div className="cta">
          <a className="btn" href={mailto(lang)}>
            {t.cta} <span className="ar">&rarr;</span>
          </a>
          <a
            className="btn ghost"
            href="https://atelier.lioralabs.io/login"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t.atelier} <span className="ar">&rarr;</span>
          </a>
        </div>
      </div>
      <div className="hero-media">
        <Image src="/hero.jpg" alt={t.alt} fill priority sizes="(max-width: 900px) 100vw, 60vw" />
      </div>
    </header>
  );
}
