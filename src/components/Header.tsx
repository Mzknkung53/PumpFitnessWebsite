"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import styles from "./Header.module.css";

const SECTIONS = ["branches", "passes", "equipment", "faq"] as const;
type SectionId = (typeof SECTIONS)[number];

export function Header() {
  const { lang, setLang, t, content } = useLanguage();
  const { nav, brandSub } = content.copy;
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState<SectionId | null>(null);
  const progressRef = useRef<HTMLSpanElement>(null);

  const links: { id: SectionId; label: string }[] = [
    { id: "branches", label: t(nav.branches) },
    { id: "passes", label: t(nav.prices) },
    { id: "equipment", label: t(nav.equipment) },
    { id: "faq", label: t(nav.faq) },
  ];

  // Shrink header + drive the reading-progress bar.
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setScrolled(y > 12);
      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${max > 0 ? Math.min(1, y / max) : 0})`;
      }
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  // Highlight the nav link for the section currently on screen.
  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    const visible = new Map<string, number>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          visible.set(e.target.id, e.isIntersecting ? e.intersectionRatio : 0);
        }
        let best: SectionId | null = null;
        let bestRatio = 0;
        for (const id of SECTIONS) {
          const r = visible.get(id) ?? 0;
          if (r > bestRatio) {
            best = id;
            bestRatio = r;
          }
        }
        setActive(best);
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: [0, 0.01, 0.5, 1] },
    );
    SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  // Close the mobile menu with Escape or when the viewport grows past the breakpoint.
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    const mq = window.matchMedia("(min-width: 1025px)");
    const onMq = () => mq.matches && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    mq.addEventListener("change", onMq);
    return () => {
      window.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onMq);
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header
      className={`${styles.header} ${scrolled ? styles.scrolled : ""} ${menuOpen ? styles.menuIsOpen : ""}`}
    >
      <div className={`container ${styles.inner}`}>
        <a href="#top" className={styles.brand} onClick={closeMenu}>
          <Image
            src="/images/logo/pump-fitness-2.0.png"
            alt="Pump Fitness"
            width={152}
            height={54}
            priority
            className={styles.logo}
          />
          <span className={styles.brandSub}>{t(brandSub)}</span>
        </a>

        <nav aria-label="Main" className={styles.nav}>
          {links.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className={`${styles.navLink} ${active === link.id ? styles.navActive : ""}`}
              aria-current={active === link.id ? "true" : undefined}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className={styles.actions}>
          <div role="group" aria-label="Language" className={styles.langToggle}>
            <span
              className={`${styles.langThumb} ${lang === "th" ? styles.langThumbTh : ""}`}
              aria-hidden="true"
            />
            <button
              type="button"
              aria-pressed={lang === "en"}
              className={`${styles.langBtn} ${lang === "en" ? styles.langActive : ""}`}
              onClick={() => setLang("en")}
            >
              EN
            </button>
            <button
              type="button"
              aria-pressed={lang === "th"}
              className={`${styles.langBtn} ${lang === "th" ? styles.langActive : ""}`}
              onClick={() => setLang("th")}
            >
              ไทย
            </button>
          </div>

          <a href="#passes" className={`btn btn-primary ${styles.cta}`}>
            {t(nav.cta)}
          </a>

          <button
            type="button"
            className={styles.burger}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span className={styles.burgerBox} aria-hidden="true">
              <span />
              <span />
              <span />
            </span>
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        className={styles.mobileMenu}
        aria-hidden={!menuOpen}
        inert={!menuOpen}
      >
        <div className={styles.mobileInner}>
          {links.map((link, i) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className={`${styles.mobileLink} ${active === link.id ? styles.mobileLinkActive : ""}`}
              style={{ "--i": i } as React.CSSProperties}
              onClick={closeMenu}
            >
              <span>{link.label}</span>
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.4"
                aria-hidden="true"
              >
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
          ))}
          <a
            href="#passes"
            className={`btn btn-primary ${styles.mobileCta}`}
            style={{ "--i": links.length } as React.CSSProperties}
            onClick={closeMenu}
          >
            {t(nav.cta)}
          </a>
        </div>
      </div>

      <span className={styles.progress} ref={progressRef} aria-hidden="true" />
    </header>
  );
}
