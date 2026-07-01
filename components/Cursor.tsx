"use client";

import { useEffect, useRef } from "react";

/**
 * A quiet companion cursor — a small hollow ring that follows the pointer with
 * a soft lag and gently grows (turning gold) over interactive elements. The
 * native cursor stays; this is a whisper, not a takeover. Never shown on touch
 * devices or when reduced motion is requested.
 */
const INTERACTIVE =
  "a[href], button, [role='button'], input, textarea, select, summary, .cursor-pointer";

export default function Cursor() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;

    const ring = ref.current;
    if (!ring) return;

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let rx = x;
    let ry = y;
    let scale = 1;
    let target = 1;
    let shown = false;
    let raf = 0;

    const move = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
      if (!shown) {
        shown = true;
        ring.style.opacity = "1";
      }
    };
    const over = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest?.(INTERACTIVE)) {
        target = 1.8;
        ring.classList.add("is-active");
      }
    };
    const out = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest?.(INTERACTIVE)) {
        target = 1;
        ring.classList.remove("is-active");
      }
    };
    const leave = () => {
      shown = false;
      ring.style.opacity = "0";
    };

    const loop = () => {
      rx += (x - rx) * 0.2;
      ry += (y - ry) * 0.2;
      scale += (target - scale) * 0.18;
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0) scale(${scale})`;
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", move, { passive: true });
    document.addEventListener("mouseover", over, { passive: true });
    document.addEventListener("mouseout", out, { passive: true });
    document.addEventListener("mouseleave", leave);
    loop();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", over);
      document.removeEventListener("mouseout", out);
      document.removeEventListener("mouseleave", leave);
    };
  }, []);

  return <div ref={ref} aria-hidden className="liora-cursor" />;
}
