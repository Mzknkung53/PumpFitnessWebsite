"use client";

import { useLanguage } from "@/context/LanguageContext";
import { MediaPlaceholder } from "./MediaPlaceholder";
import styles from "./Equipment.module.css";

const ICONS: Record<string, string> = {
  air: "M12 3v2M12 19v2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M3 12h2M19 12h2M5.6 18.4l1.4-1.4M17 7l1.4-1.4M8 12a4 4 0 1 0 8 0 4 4 0 0 0-8 0",
  drop: "M12 3s6 7 6 11a6 6 0 1 1-12 0c0-4 6-11 6-11z",
  dumbbell:
    "M6 9v6M18 9v6M3 10.5v3M21 10.5v3M6 12h12M3 12h3M18 12h3",
};

export function Equipment() {
  const { t, content } = useLanguage();
  const copy = content.copy.equipment;

  return (
    <section id="equipment" className={styles.section}>
      <div className={`container ${styles.grid}`}>
        <div className={styles.media} data-reveal="left">
          <MediaPlaceholder
            label="VIDEO · Machine walkthrough, 5 floors (30–60s)"
            radius="xl"
            className={styles.video}
          />
          <button
            type="button"
            className={`btn ${styles.playBtn}`}
            aria-label="Play equipment video"
          >
            <span className={styles.playPing} aria-hidden="true" />
            <svg
              width="26"
              height="26"
              viewBox="0 0 24 24"
              fill="var(--on-accent)"
              aria-hidden="true"
            >
              <polygon points="8 5 19 12 8 19 8 5" />
            </svg>
          </button>
        </div>

        <div className={styles.copy}>
          <span className="eyebrow" data-reveal="right">
            {t(copy.eyebrow)}
          </span>
          <h2 className="section-title" data-reveal="right" style={{ "--d": 1 } as React.CSSProperties}>
            {t(copy.title)}
          </h2>
          <p className={styles.sub} data-reveal="right" style={{ "--d": 2 } as React.CSSProperties}>
            {t(copy.sub)}
          </p>

          <div className={styles.features}>
            {copy.features.map((feature, i) => (
              <div
                key={feature.icon}
                className={`lift ${styles.feature}`}
                data-reveal
                data-spotlight
                style={{ "--d": i + 3 } as React.CSSProperties}
              >
                <div className={styles.iconTile}>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="var(--accent-ink)"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d={ICONS[feature.icon] ?? ICONS.dumbbell} />
                  </svg>
                </div>
                <span className={styles.featureTitle}>{t(feature.title)}</span>
                <span className={styles.featureDesc}>{t(feature.desc)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
