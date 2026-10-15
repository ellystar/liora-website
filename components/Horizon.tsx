import Image from "next/image";
import Reveal from "./Reveal";
import type { Lang } from "@/lib/i18n";

const COPY = {
  en: {
    h2: { pre: "The systems, now a ", soul: "platform", post: "." },
    body: "Alongside our custom systems work, we built Liora Atelier — a private platform where brands create high-quality, on-brand imagery at scale. Currently in private beta, available by request.",
    beta: "Private beta",
    request: "Request access",
    alt: "The Liora Atelier platform — a laptop on stone steps showing an editorial brand website",
    caption: "Liora Atelier — currently used by selected brands.",
  },
  tr: {
    h2: { pre: "Sistemler, artık bir ", soul: "platform", post: "." },
    body: "Markalara özel sistemler kurarken Liora Atelier'i de geliştirdik: markaların kendi diline sadık, yüksek kaliteli görselleri ölçekli olarak ürettiği özel bir platform. Şu an kapalı betada, talep üzerine erişime açık.",
    beta: "Kapalı beta",
    request: "Erişim isteyin",
    alt: "Liora Atelier platformu — taş basamaklar üzerinde, editoryal bir marka sitesi açık duran bir dizüstü bilgisayar",
    caption: "Liora Atelier — şu an seçili markalar tarafından kullanılıyor.",
  },
};

export default function Horizon({ lang = "en" }: { lang?: Lang }) {
  const t = COPY[lang];
  return (
    <section id="horizon" className="bg-bone">
      <div className="wrap grid grid-cols-1 items-center gap-x-16 gap-y-14 py-[clamp(88px,13vw,164px)] md:grid-cols-[0.95fr_1.05fr]">
        <Reveal stagger={0.1} className="max-w-md">
          <p className="meta mb-5">04 · LIORA ATELIER</p>
          <h2 className="d2 text-ink">
            {t.h2.pre}
            <span className="soul">{t.h2.soul}</span>
            {t.h2.post}
          </h2>
          <p className="body mt-8 text-text-mut">{t.body}</p>
          <div className="mt-10 border-t border-stone/60 pt-6">
            <p className="font-mono text-[11.5px] uppercase tracking-meta text-text-mut">
              {t.beta}
            </p>
            <a
              href="https://atelier.lioralabs.io/login"
              target="_blank"
              rel="noopener noreferrer"
              className="group/req mt-6 inline-flex w-fit items-center gap-1.5 border-b border-gold pb-0.5 font-ui text-[14px] text-ink transition-colors duration-300 ease-liora hover:text-gold"
            >
            {t.request}
            <span
              aria-hidden="true"
              className="transition-transform duration-300 ease-liora group-hover/req:translate-x-1"
            >
              →
            </span>
            </a>
          </div>
        </Reveal>

        {/* Single, unframed product image — no stroke/border, never cropped.
            Image + caption grouped as one figure so the caption aligns to the
            image's left edge instead of the column edge. */}
        <Reveal delay={0.05}>
          <figure className="mx-auto w-full max-w-[420px]">
            <div
              className="relative w-full overflow-hidden rounded-[2px]"
              style={{ aspectRatio: "1122 / 1402" }}
            >
              <Image
                src="/placeholder.jpg"
                alt={t.alt}
                fill
                sizes="(max-width: 768px) 92vw, 420px"
                className="object-cover object-center"
              />
            </div>
            <figcaption className="meta mt-3">{t.caption}</figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
