import Reveal from "./Reveal";
import ContactForm from "./ContactForm";
import type { Lang } from "@/lib/i18n";

const COPY = {
  en: {
    h3: "Bring us your next chapter.",
    body: "We take on a small number of brands. Tell us what you’re scaling and what you refuse to lose — we’ll tell you whether we’re the right partner for it.",
    direct: "Or write directly —",
  },
  tr: {
    h3: "Markanızın sonraki bölümünü birlikte yazalım.",
    body: "Aynı anda yalnızca az sayıda markayla çalışıyoruz. Neyi büyüttüğünüzü ve neyi kaybetmek istemediğinizi anlatın; bunun için doğru ortak olup olmadığımızı açıkça söyleyelim.",
    direct: "Ya da doğrudan yazın —",
  },
};

export default function Close({ lang = "en" }: { lang?: Lang }) {
  const t = COPY[lang];
  return (
    <section id="contact" className="scroll-mt-24">
      {/* The quiet invitation + form */}
      <div className="bg-ink">
        <div className="wrap grid grid-cols-1 gap-x-16 gap-y-12 py-[clamp(72px,11vw,140px)] md:grid-cols-2">
          <Reveal stagger={0.1} className="max-w-md">
            <h3 className="d2 text-on-dark">{t.h3}</h3>
            <p className="body mt-6 !text-on-dark-mut">{t.body}</p>
            <p className="mt-8 font-mono text-[13px] !text-on-dark-mut">
              {t.direct}{" "}
              <a href="mailto:info@lioralabs.io" className="link-inline">
                info@lioralabs.io
              </a>
            </p>
          </Reveal>

          <Reveal delay={0.05}>
            <ContactForm lang={lang} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
