"use client";

import { useState } from "react";
import Reveal from "./Reveal";

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
          <ul className="border-t border-stone/70">
            {FAQS.map((f, i) => {
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </section>
  );
}
