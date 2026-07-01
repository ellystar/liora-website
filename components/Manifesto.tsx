import Reveal from "./Reveal";

const BELIEFS = [
  { a: "We believe fashion is not content.", b: "It is language." },
  { a: "We believe images are not output.", b: "They are memory." },
  { a: "We believe brands don't need more visuals.", b: "They need coherence." },
  { a: "We believe AI is not a threat to craft —", b: "but to chaos." },
];

export default function Manifesto() {
  return (
    <section
      id="manifesto"
      className="relative overflow-hidden bg-ink text-on-dark"
    >
      <div className="halftone-dark pointer-events-none absolute inset-0" />
      <div className="wrap relative py-[clamp(96px,15vw,184px)]">
        <Reveal className="mb-[clamp(40px,6vw,72px)]">
          <p className="meta !text-on-dark-mut">01 · MANIFESTO</p>
        </Reveal>

        <Reveal stagger={0.14} className="space-y-[clamp(20px,3vw,40px)]">
          {BELIEFS.map((line) => (
            <p
              key={line.a}
              className="d2 max-w-[18ch] !font-light text-on-dark-mut md:max-w-[24ch]"
            >
              {line.a}{" "}
              <span className="text-on-dark">{line.b}</span>
            </p>
          ))}
        </Reveal>

        <Reveal delay={0.1} className="mt-[clamp(48px,7vw,88px)] max-w-xl border-l-2 border-oxblood pl-7">
          <p className="quote !text-[clamp(22px,2.8vw,32px)] text-bone">
            Taste cannot be outsourced. But it can be systematized.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
