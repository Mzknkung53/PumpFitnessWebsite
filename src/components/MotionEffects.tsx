"use client";

import { useEffect } from "react";

/**
 * Page-wide motion helpers, mounted once:
 *  - [data-reveal]     → gets [data-inview] when it scrolls into view (CSS animates it in)
 *  - [data-spotlight]  → a soft orange glow follows the pointer (--mx / --my)
 *  - [data-tilt]       → gentle 3D tilt toward the pointer (mouse/pen only)
 *
 * Attributes are set with setAttribute rather than className so React re-renders
 * (e.g. switching language) never wipe them out.
 */
export function MotionEffects() {
  useEffect(() => {
    // ── Scroll reveal ──────────────────────────────────────────────
    const reveal = (el: Element) => el.setAttribute("data-inview", "");
    let io: IntersectionObserver | null = null;

    if ("IntersectionObserver" in window) {
      io = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              reveal(entry.target);
              io?.unobserve(entry.target);
            }
          }
        },
        { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
      );
    }

    const watch = (scope: ParentNode) => {
      scope
        .querySelectorAll("[data-reveal]:not([data-inview])")
        .forEach((el) => (io ? io.observe(el) : reveal(el)));
    };
    watch(document);

    // Pick up elements React mounts later (tab panels, language switch, …).
    const mo = new MutationObserver((records) => {
      for (const r of records) {
        r.addedNodes.forEach((node) => {
          if (!(node instanceof Element)) return;
          if (node.matches("[data-reveal]:not([data-inview])")) {
            io ? io.observe(node) : reveal(node);
          }
          watch(node);
        });
      }
    });
    mo.observe(document.body, { childList: true, subtree: true });

    // ── Spotlight + tilt (fine pointers only) ──────────────────────
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const calmMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let raf = 0;
    let lastEvent: PointerEvent | null = null;
    let tilted: HTMLElement | null = null;

    const resetTilt = () => {
      if (tilted) {
        tilted.style.removeProperty("--rx");
        tilted.style.removeProperty("--ry");
        tilted = null;
      }
    };

    const frame = () => {
      raf = 0;
      const e = lastEvent;
      if (!e || !(e.target instanceof Element)) return;

      const spot = e.target.closest<HTMLElement>("[data-spotlight]");
      if (spot) {
        const r = spot.getBoundingClientRect();
        spot.style.setProperty("--mx", `${e.clientX - r.left}px`);
        spot.style.setProperty("--my", `${e.clientY - r.top}px`);
      }

      const tilt = calmMotion.matches
        ? null
        : e.target.closest<HTMLElement>("[data-tilt]");
      if (tilt !== tilted) resetTilt();
      if (tilt) {
        const r = tilt.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        tilt.style.setProperty("--ry", `${(px * 8).toFixed(2)}deg`);
        tilt.style.setProperty("--rx", `${(-py * 8).toFixed(2)}deg`);
        tilted = tilt;
      }
    };

    const onMove = (e: PointerEvent) => {
      if (!finePointer.matches || e.pointerType === "touch") return;
      lastEvent = e;
      if (!raf) raf = requestAnimationFrame(frame);
    };

    document.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", resetTilt);

    return () => {
      io?.disconnect();
      mo.disconnect();
      document.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", resetTilt);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return null;
}
