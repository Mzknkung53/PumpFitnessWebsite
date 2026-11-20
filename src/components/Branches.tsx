"use client";

import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useBranchStatuses } from "@/hooks/useOpenStatus";
import { formatBaht } from "@/lib/format";
import { bangkokDayOfWeek } from "@/lib/openNow";
import type { BranchId } from "@/lib/types";
import { MediaPlaceholder } from "./MediaPlaceholder";
import styles from "./Branches.module.css";

export function Branches() {
  const { t, content, lang } = useLanguage();
  const statuses = useBranchStatuses();
  const [selected, setSelected] = useState<BranchId>("chiang-mai-gate");
  const copy = content.copy.branches;
  const branch = content.branches.find((b) => b.id === selected)!;
  const today = bangkokDayOfWeek();
  const st = statuses[branch.id];

  return (
    <section id="branches" className={styles.section}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.header}>
          <div className={styles.headerCopy}>
            <span className="eyebrow">{t(copy.eyebrow)}</span>
            <h2 className="section-title">{t(copy.title)}</h2>
          </div>
          <p className={styles.sub}>{t(copy.sub)}</p>
        </div>

        <div
          role="tablist"
          aria-label="Branches"
          className={styles.tablist}
        >
          {content.branches.map((item) => {
            const active = item.id === selected;
            const itemSt = statuses[item.id];
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={active}
                className={`${styles.tab} ${active ? styles.tabActive : ""}`}
                onClick={() => setSelected(item.id)}
              >
                <span className={styles.tabText}>
                  <span className={styles.tabTag}>{t(item.tag)}</span>
                  <span className={styles.tabName}>{item.name}</span>
                  <span className={styles.tabArea}>{t(item.area)}</span>
                </span>
                <span
                  className={`${styles.tabChip} ${active ? styles.tabChipActive : ""}`}
                >
                  <span
                    className={itemSt?.dotClass}
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: 999,
                      background: itemSt?.open
                        ? "var(--status-open)"
                        : "var(--status-closed)",
                    }}
                  />
                  {itemSt?.short}
                </span>
              </button>
            );
          })}
        </div>

        <div
          role="tabpanel"
          key={branch.id}
          className={`fade ${styles.panel}`}
        >
          <div className={styles.gallery}>
            <div className={styles.mainShot}>
              <MediaPlaceholder
                label={`PHOTO · ${branch.photos[0]}`}
                radius="lg"
              />
            </div>
            <div className={styles.sideShot}>
              <MediaPlaceholder
                label={`PHOTO · ${branch.photos[1]}`}
                radius="md"
              />
            </div>
            <div className={styles.sideShot}>
              <MediaPlaceholder
                label={`PHOTO · ${branch.photos[2]}`}
                radius="md"
              />
            </div>
          </div>

          <div className={styles.info}>
            <div className={styles.infoTop}>
              <h3 className={styles.branchName}>{branch.name}</h3>
              <p className={styles.blurb}>{t(branch.blurb)}</p>
            </div>

            <div className={styles.highlights}>
              {branch.highlights[lang].map((h) => (
                <span key={h} className={styles.highlight}>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="var(--accent-ink)"
                    strokeWidth="3"
                    aria-hidden="true"
                  >
                    <path d="M4 12.5l5 5L20 6.5" />
                  </svg>
                  {h}
                </span>
              ))}
            </div>

            <div className={styles.meta}>
              <div className={styles.hoursBlock}>
                <span className={styles.metaLabel}>{t(copy.hours)}</span>
                {branch.hours.map((hr) => {
                  const isToday = hr.days.includes(today);
                  return (
                    <div
                      key={hr.en}
                      className={`${styles.hourRow} ${isToday ? styles.hourToday : ""}`}
                    >
                      <span>
                        {lang === "th" ? hr.th : hr.en}
                        {isToday ? ` · ${t(content.status.today)}` : ""}
                      </span>
                      <span className={styles.hourTime}>{hr.time}</span>
                    </div>
                  );
                })}
                {st ? (
                  <p className={styles.liveStatus}>
                    <span
                      className={st.dotClass}
                      style={{
                        width: 8,
                        height: 8,
                        borderRadius: 999,
                        display: "inline-block",
                        background: st.open
                          ? "var(--status-open)"
                          : "var(--status-closed)",
                        marginRight: 8,
                      }}
                    />
                    {st.label}
                  </p>
                ) : null}
              </div>

              <div className={styles.addressBlock}>
                <span className={styles.metaLabel}>{t(copy.address)}</span>
                <span>{t(branch.address)}</span>
                <span className={`${styles.metaLabel} ${styles.phoneLabel}`}>
                  {t(copy.phone)}
                </span>
                <span className={styles.phone}>{branch.phone}</span>
              </div>
            </div>

            <div className={styles.priceBar}>
              <div className={styles.priceText}>
                <span className={styles.dayPrice}>
                  {formatBaht(branch.prices.day)}
                </span>
                <span className={styles.priceMeta}>
                  {t(copy.perDay)} · {formatBaht(branch.prices.month)}{" "}
                  {t(copy.perMonth)}
                </span>
              </div>
              <a
                href={branch.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`btn btn-primary ${styles.mapsBtn}`}
              >
                <svg
                  width="17"
                  height="17"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  aria-hidden="true"
                >
                  <path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z" />
                  <circle cx="12" cy="9.5" r="2.5" />
                </svg>
                {t(copy.maps)}
              </a>
              <a
                href={branch.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`btn btn-ghost ${styles.reviewsBtn}`}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="var(--star)"
                  stroke="none"
                  aria-hidden="true"
                >
                  <path d="M12 3l2.7 5.6 6.1.8-4.5 4.2 1.1 6.1L12 16.8 6.6 19.7l1.1-6.1L3.2 9.4l6.1-.8z" />
                </svg>
                {t(copy.reviews)}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
