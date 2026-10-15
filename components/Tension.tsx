import Image from "next/image";
import Reveal from "./Reveal";
import type { Lang } from "@/lib/i18n";

const COPY = {
  en: {
    kick: "01 · WHAT WE BELIEVE",
    h2: { pre: "More content shouldn’t mean less ", soul: "identity", post: "." },
    body: "AI makes it possible to generate anything. But without direction, systems and taste, more is not better — it’s just more.",
    quote1: "Everyone has the same tools now.",
    quote2: "Taste is the differentiator.",
    alt: "Rows of near-identical classical sculpture heads, one in sharp focus standing apart from the rest",
  },
  tr: {
    kick: "01 · NEYE İNANIYORUZ",
    h2: { pre: "Daha çok içerik, daha az ", soul: "kimlik", post: " demek olmamalı." },
    body: "Yapay zekâ her şeyi üretmeyi mümkün kılıyor. Ama yön, sistem ve zevk olmadan daha fazlası daha iyi değildir — yalnızca daha fazladır.",
    quote1: "Artık herkesin elinde aynı araçlar var.",
    quote2: "Farkı yaratan, zevk.",
    alt: "Birbirinin neredeyse aynısı klasik heykel başları; biri net, diğerlerinden ayrışıyor",
  },
};

export default function Tension({ lang = "en" }: { lang?: Lang }) {
  const t = COPY[lang];
  return (
    <section
      id="tension"
      className="relative overflow-hidden bg-ink text-on-dark"
    >
      <div className="halftone-dark pointer-events-none absolute inset-0" />
      <div className="wrap relative grid grid-cols-1 items-center gap-x-16 gap-y-12 py-[clamp(96px,14vw,176px)] md:grid-cols-[1.1fr_0.9fr]">
        <div>
          <Reveal stagger={0.12} className="max-w-xl">
            <p className="meta mb-7 !text-on-dark-mut">{t.kick}</p>
            <h2 className="d2 text-on-dark">
              {t.h2.pre}
              <span className="soul">{t.h2.soul}</span>
              {t.h2.post}
            </h2>
            <p className="body-l mt-8 !text-on-dark-mut">{t.body}</p>
          </Reveal>

          <Reveal delay={0.1} className="mt-10 max-w-md border-l-2 border-oxblood pl-7">
            <p className="quote !text-[clamp(20px,2.4vw,28px)] !text-on-dark-mut">
              {t.quote1}
              <br />
              <span className="text-bone">{t.quote2}</span>
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.15} className="relative">
          <div className="relative mx-auto aspect-[1597/2000] w-full max-w-[420px] overflow-hidden rounded-[2px] border border-white/10">
            <Image
              src="/figure-02.jpg"
              alt={t.alt}
              fill
              sizes="(max-width: 768px) 92vw, 420px"
              className="object-cover"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
