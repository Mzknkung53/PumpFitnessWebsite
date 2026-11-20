"use client";

import { useLayoutEffect, useRef, useState, type CSSProperties } from "react";

/**
 * Measures the active tab inside a tab list so a single "pill" element can
 * glide between tabs. Works when tabs wrap onto several rows (phones).
 * The active tab must carry aria-selected="true".
 */
export function useSlidingIndicator<T extends HTMLElement>(deps: unknown[]) {
  const listRef = useRef<T>(null);
  const [style, setStyle] = useState<CSSProperties>({ opacity: 0 });
  const ready = useRef(false);

  useLayoutEffect(() => {
    const list = listRef.current;
    if (!list) return;

    const measure = () => {
      const active = list.querySelector<HTMLElement>('[aria-selected="true"]');
      if (!active) return;
      setStyle({
        opacity: 1,
        width: active.offsetWidth,
        height: active.offsetHeight,
        transform: `translate(${active.offsetLeft}px, ${active.offsetTop}px)`,
        // Jump into place on first paint, glide afterwards.
        transition: ready.current ? undefined : "none",
      });
      ready.current = true;
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(list);
    list.querySelectorAll("[role=tab]").forEach((tab) => ro.observe(tab));
    document.fonts?.ready.then(measure).catch(() => {});
    return () => ro.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return { listRef, indicatorStyle: style };
}
