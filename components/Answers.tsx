import Reveal from "./Reveal";

/**
 * The questions brands actually ask, answered plainly.
 *
 * Deliberately typographic — no accordions, no cards, no chevrons. A question
 * on the left, its answer on the right, separated by hairlines: the same DNA as
 * the engagements list in Selected Systems.
 *
 * Each answer opens with the answer itself, so a passage can stand alone when
 * it is quoted out of context (search snippets, AI answers). The FAQPage
 * structured data below is generated from this same list, so the markup can
 * never drift from what a visitor reads.
 */
const FAQS = [
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

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function Answers() {
  return (
    <section id="answers" className="bg-bone-2">
      <div className="wrap py-[clamp(88px,13vw,164px)]">
        <Reveal
          stagger={0.1}
          className="mb-[clamp(36px,5vw,64px)] flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
        >
          <div className="max-w-xl">
            <p className="meta mb-5">06 · ANSWERS</p>
            <h2 className="d2 text-ink">
              Questions we&rsquo;re often <span className="soul">asked</span>.
            </h2>
          </div>
          <p className="body-s !max-w-sm !text-text-mut">
            If yours isn&rsquo;t here, write to us — we answer everything
            directly.
          </p>
        </Reveal>

        <Reveal delay={0.05}>
          <dl className="border-t border-stone/70">
            {FAQS.map((f) => (
              <div
                key={f.q}
                className="grid grid-cols-1 gap-x-12 gap-y-3 border-b border-stone/70 py-[clamp(26px,3.4vw,42px)] md:grid-cols-[0.9fr_1.1fr]"
              >
                <dt className="d3 max-w-[24ch] text-ink">{f.q}</dt>
                <dd className="body !max-w-none !text-text-mut">{f.a}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>

      {/* Mirrors the visible Q&A above — generated from the same source. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </section>
  );
}
