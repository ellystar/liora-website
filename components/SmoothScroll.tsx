"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Smooth, editorial scrolling (Lenis) driven by the GSAP ticker and synced to
 * ScrollTrigger so pinned / scrub sections stay frame-accurate.
 *
 * Motion is the institution's manner: slow, deliberate, quiet. When the visitor
 * asks for reduced motion we step aside entirely and let the browser scroll.
 */
export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Start every page at the top. Lenis keeps its scroll position across client
  // navigations, which otherwise drops you mid-page. Hash links keep their
  // in-page target.
  useEffect(() => {
    if (window.location.hash) return;
    const lenis = (window as unknown as { lenis?: Lenis }).lenis;
    if (lenis) lenis.scrollTo(0, { immediate: true, force: true });
    else window.scrollTo(0, 0);
  }, [pathname]);

  // Deter casual image grabbing: block right-click-save and drag on <img>.
  // Friction, not protection — DevTools, the network tab and screenshots can
  // always reach a rendered asset. Text right-click is left untouched (the
  // guard only fires when the event target is an image).
  useEffect(() => {
    const guard = (e: Event) => {
      if (e.target instanceof HTMLImageElement) e.preventDefault();
    };
    document.addEventListener("contextmenu", guard);
    document.addEventListener("dragstart", guard);
    return () => {
      document.removeEventListener("contextmenu", guard);
      document.removeEventListener("dragstart", guard);
    };
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReduced) {
      // No smoothing — keep ScrollTrigger working off native scroll.
      ScrollTrigger.refresh();
      return;
    }

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.4,
    });

    lenis.on("scroll", ScrollTrigger.update);

    // Expose the instance (anchor links / debugging can drive it directly).
    (window as unknown as { lenis?: Lenis }).lenis = lenis;

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    // Recalculate triggers once fonts/images settle.
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);

    return () => {
      gsap.ticker.remove(raf);
      window.removeEventListener("load", refresh);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
