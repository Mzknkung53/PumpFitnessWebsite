"use client";

import { useLanguage } from "@/context/LanguageContext";
import styles from "./Reviews.module.css";

export function Reviews() {
  const { t, content } = useLanguage();
  const copy = content.copy.reviews;

  return (
    <section id="reviews" className={styles.section}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.header} data-reveal>
          <span className="eyebrow">{t(copy.eyebrow)}</span>
          <h2 className="section-title">{t(copy.title)}</h2>
        </div>

        <div className={styles.grid}>
          {copy.items.map((item, index) => {
            const isPlaceholder = item.kind === "placeholder";
            const showStar =
              isPlaceholder ||
              item.kind === "summary" ||
              item.source.toLowerCase().includes("google");
            const className = `lift ${styles.card} ${isPlaceholder ? styles.placeholder : ""}`;
            const motion = {
              "data-reveal": "",
              "data-spotlight": "",
              style: { "--d": (index % 3) + 1 } as React.CSSProperties,
            };
            const body = (
              <>
                <span className={styles.source}>
                  {showStar ? (
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 24 24"
                      fill="var(--star)"
                      aria-hidden="true"
                    >
                      <path d="M12 3l2.7 5.6 6.1.8-4.5 4.2 1.1 6.1L12 16.8 6.6 19.7l1.1-6.1L3.2 9.4l6.1-.8z" />
                    </svg>
                  ) : null}
                  {item.source}
                </span>
                <p
                  className={`${styles.text} ${isPlaceholder ? styles.textMuted : ""}`}
                >
                  {t(item.text)}
                </p>
              </>
            );

            if (item.url) {
              return (
                <a
                  key={item.source}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={className}
                  {...motion}
                >
                  {body}
                </a>
              );
            }

            return (
              <div key={item.source} className={className} {...motion}>
                {body}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
