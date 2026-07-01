"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Aesthetic Intelligence — the closing signature. Left-aligned, like the site.
 *
 * Motion (restored from the original): on desktop the section PINS — it holds
 * in place — and as you keep scrolling the SECOND sentence opens (fades + rises)
 * while the first dims back. Same pinned scrub as the torn-seam original; only
 * the image is gone. The full synced version (image tears open in sync) is saved
 * at components/Signature.synced.tsx.bak — restore it once a fitting image exists.
 */
export default function Signature() {
  const section = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const line2 = useRef<HTMLSpanElement>(null);
  const line1 = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Reveal fully, no motion.
    if (reduced) {
      gsap.set(line2.current, { opacity: 1, y: 0 });
      return;
    }

    const mm = gsap.matchMedia();

    // Desktop — pin the stage; as you keep scrolling, the 2nd sentence opens
    // and the 1st settles back.
    mm.add("(min-width: 768px)", () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section.current,
          start: "top top",
          end: "+=50%",
          scrub: 1,
          pin: stage.current,
          anticipatePin: 1,
        },
      });
      tl.fromTo(
        line2.current,
        { opacity: 0, y: 22 },
        { opacity: 1, y: 0, ease: "power2.out" },
        0
      ).fromTo(
        line1.current,
        { opacity: 1 },
        { opacity: 0.42, ease: "none" },
        0
      );
    });

    // Mobile — same reveal, no pin (gentler on small screens).
    mm.add("(max-width: 767px)", () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section.current,
          start: "top 72%",
          end: "bottom 68%",
          scrub: 1,
        },
      });
      tl.fromTo(
        line2.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0 },
        0
      );
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={section} id="signature" className="bg-bone">
      <div
        ref={stage}
        className="wrap flex min-h-screen items-center py-[clamp(64px,8vw,104px)]"
      >
        <div className="max-w-2xl">
          <h2 className="d1 !text-[clamp(34px,5vw,62px)] text-ink">
            <span ref={line1} className="block">
              AI can generate visuals.
            </span>
            <span ref={line2} className="mt-[0.45em] block">
              Only aesthetic intelligence can{" "}
              <span className="soul text-oxblood">preserve</span> a brand.
            </span>
          </h2>
        </div>
      </div>
    </section>
  );
}
