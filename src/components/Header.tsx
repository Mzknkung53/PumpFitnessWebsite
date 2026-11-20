"use client";

import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import styles from "./Header.module.css";

export function Header() {
  const { lang, setLang, t, content } = useLanguage();
  const { nav, brandSub } = content.copy;

  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <a href="#top" className={styles.brand}>
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
          <a href="#branches" className={styles.navLink}>
            {t(nav.branches)}
          </a>
          <a href="#passes" className={styles.navLink}>
            {t(nav.prices)}
          </a>
          <a href="#equipment" className={styles.navLink}>
            {t(nav.equipment)}
          </a>
          <a href="#faq" className={styles.navLink}>
            {t(nav.faq)}
          </a>

          <div
            role="group"
            aria-label="Language"
            className={styles.langToggle}
          >
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
        </nav>
      </div>
    </header>
  );
}
