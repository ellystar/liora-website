"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  /** Animate direct children in sequence instead of the wrapper itself. */
  stagger?: number;
  /** Seconds before the reveal begins once in view. */
  delay?: number;
  /** Travel distance in px. */
  y?: number;
  /** Render element. Defaults to a div. */
  as?: "div" | "section" | "header" | "footer" | "ul" | "li";
};

/**
 * The one motion the whole site repeats: a quiet rise into place.
 * opacity 0 -> 1, a short translate, a calm settle. Never bouncy, never loud.
 */
export default function Reveal({
  children,
  className = "",
  stagger,
  delay = 0,
  y = 22,
  as: Tag = "div",
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const targets = stagger ? Array.from(el.children) : el;

    if (prefersReduced) {
      gsap.set(targets, { opacity: 1, y: 0 });
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.set(targets, { opacity: 0, y });
      ScrollTrigger.create({
        trigger: el,
        start: "top 86%",
        once: true,
        onEnter: () =>
          gsap.to(targets, {
            opacity: 1,
            y: 0,
            duration: 0.85,
            ease: "power3.out",
            delay,
            stagger: stagger ?? 0,
          }),
      });
    }, el);

    return () => ctx.revert();
  }, [delay, y, stagger]);

  const Comp = Tag as React.ElementType;
  return (
    <Comp ref={ref} className={className}>
      {children}
    </Comp>
  );
}
