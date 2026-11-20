"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import styles from "./BackToTop.module.css";

const R = 22;
const C = 2 * Math.PI * R;

export function BackToTop() {
  const { t, content } = useLanguage();
  const [show, setShow] = useState(false);
  const ringRef = useRef<SVGCircleElement>(null);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setShow(y > window.innerHeight * 0.8);
      const p = max > 0 ? Math.min(1, y / max) : 0;
      ringRef.current?.style.setProperty("stroke-dashoffset", String(C * (1 - p)));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <a
      href="#top"
      className={`${styles.btn} ${show ? styles.show : ""}`}
      aria-label={t(content.copy.footer.backTop)}
      tabIndex={show ? 0 : -1}
    >
      <svg className={styles.ring} viewBox="0 0 52 52" aria-hidden="true">
        <circle cx="26" cy="26" r={R} className={styles.track} />
        <circle
          ref={ringRef}
          cx="26"
          cy="26"
          r={R}
          className={styles.bar}
          strokeDasharray={C}
          strokeDashoffset={C}
        />
      </svg>
      <svg
        className={styles.arrow}
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M12 19V5M6 11l6-6 6 6" />
      </svg>
    </a>
  );
}
