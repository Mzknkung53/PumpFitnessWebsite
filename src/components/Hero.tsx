"use client";

import { useLanguage } from "@/context/LanguageContext";
import { useBranchStatuses } from "@/hooks/useOpenStatus";
import { MediaPlaceholder } from "./MediaPlaceholder";
import styles from "./Hero.module.css";

export function Hero() {
  const { t, content } = useLanguage();
  const statuses = useBranchStatuses();
  const hero = content.copy.hero;

  return (
    <section id="top" className={styles.section}>
      <div className={`container ${styles.grid}`}>
        <div className={styles.copy}>
          <span className={`rise ${styles.eyebrowPill}`}>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--accent)"
              strokeWidth="2.2"
              aria-hidden="true"
            >
              <path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z" />
              <circle cx="12" cy="9.5" r="2.5" />
            </svg>
            {t(hero.eyebrow)}
          </span>

          <h1 className={`rise d1 ${styles.title}`}>
            {t(hero.title)}{" "}
            <span className={styles.titleAccent}>{t(hero.titleAccent)}</span>
          </h1>

          <p className={`rise d2 ${styles.sub}`}>{t(hero.sub)}</p>

          <div className={`rise d3 ${styles.actions}`}>
            <a href="#branches" className={`btn btn-primary ${styles.ctaMain}`}>
              {t(hero.cta1)}
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
            <a href="#passes" className={`btn btn-ghost ${styles.ctaGhost}`}>
              {t(hero.cta2)}
            </a>
          </div>

          <div className={`rise d3 ${styles.statusRow}`}>
            {content.branches.map((branch) => {
              const st = statuses[branch.id];
              return (
                <div key={branch.id} className={styles.statusChip}>
                  <span
                    className={st?.dotClass}
                    style={{
                      width: 9,
                      height: 9,
                      borderRadius: 999,
                      background: st?.open
                        ? "var(--status-open)"
                        : "var(--status-closed)",
                      flex: "none",
                    }}
                  />
                  <span className={styles.statusName}>{branch.short}</span>
                  <span className={styles.statusLabel}>{st?.label}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className={styles.mediaWrap}>
          <div className={styles.heroMedia}>
            <MediaPlaceholder
              label="HERO VIDEO · 15–20s loop, muted autoplay"
              play
              radius="xl"
              className={styles.heroPh}
            />
          </div>

          <div className={`float ${styles.floatDay}`}>
            <span className={styles.floatDayLabel}>{t(hero.floatDay)}</span>
            <span className={styles.floatDayValue}>{hero.floatDayValue}</span>
          </div>

          <div className={`float2 ${styles.floatFloors}`}>
            <span className={styles.floatFloorsNum}>
              {hero.floatFloorsValue}
            </span>
            <span className={styles.floatFloorsText}>{t(hero.floatFloors)}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
