"use client";

import { useLanguage } from "@/context/LanguageContext";
import styles from "./Cta.module.css";

export function Cta() {
  const { t, content } = useLanguage();
  const copy = content.copy.cta;

  return (
    <section className={styles.section}>
      <div className={styles.band}>
        <div className={styles.copy}>
          <h2 className={styles.title}>
            {t(copy.title)}
            <span className={styles.dot}>.</span>
          </h2>
          <p className={styles.sub}>{t(copy.sub)}</p>
        </div>

        <div className={styles.links}>
          {content.branches.map((branch) => (
            <a
              key={branch.id}
              href={branch.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`btn ${styles.link}`}
            >
              <span className={styles.linkText}>
                <span>{branch.name}</span>
                <span className={styles.linkArea}>{t(branch.area)}</span>
              </span>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                aria-hidden="true"
              >
                <path d="M7 17L17 7M9 7h8v8" />
              </svg>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
