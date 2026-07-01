import Reveal from "./Reveal";

export default function Tension() {
  return (
    <section
      id="tension"
      className="relative overflow-hidden bg-ink text-on-dark"
    >
      <div className="halftone-dark pointer-events-none absolute inset-0" />
      <div className="wrap relative grid grid-cols-1 items-center gap-x-16 gap-y-12 py-[clamp(96px,14vw,176px)] md:grid-cols-[1.1fr_0.9fr]">
        <div>
          <Reveal stagger={0.12} className="max-w-xl">
            <p className="meta mb-7 !text-on-dark-mut">01 · WHAT WE BELIEVE</p>
            <h2 className="d2 text-on-dark">
              More content shouldn’t mean less{" "}
              <span className="soul">identity</span>.
            </h2>
            <p className="body-l mt-8 !text-on-dark-mut">
              AI makes it possible to generate anything. But without direction,
              systems and taste, more is not better — it’s just more.
            </p>
          </Reveal>

          <Reveal delay={0.1} className="mt-10 max-w-md border-l-2 border-oxblood pl-7">
            <p className="quote !text-[clamp(20px,2.4vw,28px)] !text-on-dark-mut">
              Everyone has the same tools now.
              <br />
              <span className="text-bone">Taste is the differentiator.</span>
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.15} className="relative">
          <div className="relative mx-auto aspect-[1597/2000] w-full max-w-[420px] overflow-hidden rounded-[2px] border border-white/10">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/figure-02.jpg"
              alt="Rows of near-identical classical sculpture heads, one in sharp focus standing apart from the rest"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
