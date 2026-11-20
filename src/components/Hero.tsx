"use client";

import { Fragment } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useBranchStatuses } from "@/hooks/useOpenStatus";
import { CountUp } from "./CountUp";
import { MediaPlaceholder } from "./MediaPlaceholder";
import styles from "./Hero.module.css";

export function Hero() {
  const { t, content, lang } = useLanguage();
  const statuses = useBranchStatuses();
  const hero = content.copy.hero;
  const titleWords = t(hero.title).split(" ");
  const dayNumber = Number(hero.floatDayValue.replace(/[^\d.]/g, ""));
  const dayPrefix = hero.floatDayValue.replace(/[\d.,]/g, "");
  const floors = Number(hero.floatFloorsValue);

  return (
    <section id="top" className={styles.section}>
      <div className={styles.bg} aria-hidden="true">
        <span className={`orb ${styles.orbA}`} />
        <span className={`orb ${styles.orbB}`} />
        <span className={styles.dots} />
      </div>

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

          {/* key={lang} replays the word animation when the language changes */}
          <h1 key={lang} className={styles.title}>
            {titleWords.map((word, i) => (
              <Fragment key={`${word}-${i}`}>
                <span
                  className={styles.word}
                  style={{ animationDelay: `${0.12 + i * 0.07}s` }}
                >
                  {word}
                </span>{" "}
              </Fragment>
            ))}
            <span
              className={`${styles.word} ${styles.titleAccent}`}
              style={{ animationDelay: `${0.12 + titleWords.length * 0.07}s` }}
            >
              <span className={styles.accentText}>{t(hero.titleAccent)}</span>
              <svg
                className={styles.swoosh}
                viewBox="0 0 300 14"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path d="M3 10 C 60 3, 140 2, 297 7" />
              </svg>
            </span>
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

        <div className={styles.mediaWrap} data-tilt>
          <div className={styles.heroMedia}>
            <MediaPlaceholder
              label="HERO VIDEO · 15–20s loop, muted autoplay"
              play
              radius="xl"
              className={styles.heroPh}
            />
          </div>

          <div className={styles.floatDay}>
            <span className={styles.floatRing} aria-hidden="true" />
            <span className={styles.floatDayLabel}>{t(hero.floatDay)}</span>
            <CountUp
              value={dayNumber}
              format={(n) => `${dayPrefix}${n}`}
              className={styles.floatDayValue}
            />
          </div>

          <div className={styles.floatFloors}>
            <CountUp
              value={floors}
              duration={1200}
              className={styles.floatFloorsNum}
            />
            <span className={styles.floatFloorsText}>{t(hero.floatFloors)}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
