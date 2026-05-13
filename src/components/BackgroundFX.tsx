"use client";

import { useEffect, useRef } from "react";

function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export default function BackgroundFX() {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const node = rootRef.current;
    if (!node) return;

    let rafId = 0;
    let targetX = 50;
    let targetY = 40;
    let currentX = 50;
    let currentY = 40;

    function onPointerMove(event: PointerEvent) {
      targetX = (event.clientX / window.innerWidth) * 100;
      targetY = (event.clientY / window.innerHeight) * 100;
      if (!rafId) rafId = requestAnimationFrame(tick);
    }

    function tick() {
      rafId = 0;
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;
      if (node) {
        node.style.setProperty("--mx", `${currentX}%`);
        node.style.setProperty("--my", `${currentY}%`);
      }
      if (Math.abs(targetX - currentX) > 0.1 || Math.abs(targetY - currentY) > 0.1) {
        rafId = requestAnimationFrame(tick);
      }
    }

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div ref={rootRef} className="lp-bgFx" aria-hidden="true">
      <span className="lp-orb lp-orb-a" />
      <span className="lp-orb lp-orb-b" />
      <span className="lp-orb lp-orb-c" />
      <span className="lp-grid" />
    </div>
  );
}
