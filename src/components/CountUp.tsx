"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  value: number;
  format?: (n: number) => string;
  duration?: number;
  className?: string;
  style?: React.CSSProperties;
};

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

/**
 * Counts from 0 up to `value` the first time it scrolls into view, then tweens
 * from the old number to the new one whenever `value` changes.
 */
export function CountUp({
  value,
  format = (n) => n.toLocaleString("en-US"),
  duration = 900,
  className,
  style,
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const [shown, setShown] = useState(value);
  const [started, setStarted] = useState(false);
  const fromRef = useRef(0);
  const shownRef = useRef(value);

  // Wait until visible before the first count.
  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) {
      setStarted(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          io.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    const from = fromRef.current;
    if (from === value) {
      setShown(value);
      return;
    }
    let raf = 0;
    const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / duration);
      const next = Math.round(from + (value - from) * easeOutCubic(p));
      shownRef.current = next;
      setShown(next);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      // If interrupted, the next tween continues from where this one stopped.
      fromRef.current = shownRef.current;
    };
  }, [value, started, duration]);

  // Remember the settled value as the start point for the next change.
  useEffect(() => {
    if (started && shown === value) fromRef.current = value;
  }, [shown, value, started]);

  return (
    <span ref={ref} className={className} style={style}>
      {format(started ? shown : value)}
    </span>
  );
}
