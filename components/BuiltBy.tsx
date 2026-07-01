import Reveal from "./Reveal";

const FOUNDERS = [
  {
    name: "Melis Dogan",
    role: "Co-Founder · Creative Director",
    url: "https://www.linkedin.com/in/melis-dogan/",
  },
  {
    name: "Elif Yildiz",
    role: "Co-Founder · Product Manager",
    url: "https://www.linkedin.com/in/eelifyildiz/",
  },
];

/**
 * Built by — left: the statement; right: the two founders as a linked list
 * that mirrors the "On the horizon" row pattern (hairline per row, content
 * left, trailing arrow right). Off-site links use a diagonal arrow.
 */
export default function BuiltBy() {
  return (
    <section id="built-by" className="bg-oxblood text-bone">
      <div className="wrap grid grid-cols-1 items-center gap-x-16 gap-y-12 py-[clamp(90px,12vw,140px)] md:grid-cols-[0.95fr_1.05fr]">
        {/* Left — the statement */}
        <Reveal stagger={0.12} className="max-w-md">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-bone/60">
            05 · Built by
          </p>
          <p className="d2 mt-[22px] text-bone">
            Liora is built by two women working between{" "}
            <span className="soul">design</span> and{" "}
            <span className="soul">technology</span>.
          </p>
          <p className="body mt-6 text-bone/70">
            We design technology that helps brands move faster without losing
            their identity, taste or creative direction.
          </p>
          <p className="mt-11 font-mono text-[11px] uppercase tracking-[0.14em] text-bone/60">
            Independent · Based in Turkey · Working globally
          </p>
        </Reveal>

        {/* Right — founders as a linked list */}
        <Reveal as="ul" stagger={0.08} className="border-t border-bone/20">
          {FOUNDERS.map((f) => (
            <li key={f.name}>
              <a
                href={f.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${f.name} on LinkedIn`}
                className="group flex items-baseline justify-between gap-6 border-b border-bone/20 py-6"
              >
                <span className="flex flex-wrap items-baseline gap-x-3 gap-y-1 transition-transform duration-300 ease-liora group-hover:translate-x-1.5">
                  <span className="d4 text-bone">{f.name}</span>
                  <span className="font-mono text-[12px] tracking-[0.04em] text-bone/60 transition-colors duration-300 ease-liora group-hover:text-bone/80">
                    {f.role}
                  </span>
                </span>
                <span
                  aria-hidden="true"
                  className="shrink-0 text-bone/60 transition-[transform,color] duration-300 ease-liora group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-bone"
                >
                  ↗
                </span>
              </a>
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
