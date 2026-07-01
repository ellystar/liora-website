import Reveal from "./Reveal";

const OFFERS = [
  {
    num: "01 ·",
    title: "Visual Systems",
    desc: "On-brand imagery and video systems for catalog, campaign and commerce.",
  },
  {
    num: "02 ·",
    title: "Campaign & Commerce",
    desc: "Turning brand imagery into a connected campaign and commerce ecosystem.",
  },
  {
    num: "03 ·",
    title: "Creative Residency",
    desc: "An external creative systems team, embedded long-term.",
  },
];

export default function WhatWeBuild() {
  return (
    <section id="build" className="bg-bone-2">
      <div className="wrap py-[clamp(88px,13vw,164px)]">
        <Reveal stagger={0.1} className="mb-[clamp(40px,6vw,72px)] max-w-2xl">
          <p className="meta mb-5">02 · WHAT WE BUILD</p>
          <h2 className="d2 text-ink">
            Every brand has different needs in the{" "}
            <span className="soul">age of AI</span>.
            <br />
            So should its system.
          </h2>
          <p className="body mt-6 text-text-mut">
            We build a custom visual system for each brand — one that scales its
            imagery without losing what makes it itself.
          </p>
        </Reveal>

        <Reveal className="grid grid-cols-1 border-t border-stone/70 md:grid-cols-3">
          {OFFERS.map((o, i) => (
            <article
              key={o.num}
              className={`group flex flex-col py-9 transition-colors duration-300 ease-liora md:pr-8 ${
                i > 0 ? "border-t border-stone/70 md:border-l md:border-t-0 md:pl-8" : ""
              }`}
            >
              <div className="meta tnum">{o.num}</div>
              <h3 className="d3 mt-4 text-ink">{o.title}</h3>
              <p className="body-s mt-3.5 !max-w-none flex-1">{o.desc}</p>
            </article>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
