"use client";

import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { formatBaht, getPassPrice } from "@/lib/format";
import type { PassId } from "@/lib/types";
import styles from "./Prices.module.css";

export function Prices() {
  const { t, content } = useLanguage();
  const [pass, setPass] = useState<PassId>("day");
  const copy = content.copy.passes;
  const activeTab = copy.tabs.find((tab) => tab.id === pass)!;

  return (
    <section id="passes" className={styles.section}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.header}>
          <span className="eyebrow">{t(copy.eyebrow)}</span>
          <h2 className="section-title">{t(copy.title)}</h2>
          <p className={styles.sub}>{t(copy.sub)}</p>
        </div>

        <div
          role="tablist"
          aria-label="Pass length"
          className={styles.tabs}
        >
          {copy.tabs.map((tab) => {
            const active = tab.id === pass;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={active}
                className={`${styles.tab} ${active ? styles.tabActive : ""}`}
                onClick={() => setPass(tab.id)}
              >
                {t(tab.label)}
              </button>
            );
          })}
        </div>

        <p key={pass} className={`fade ${styles.note}`}>
          {t(activeTab.note)}
        </p>

        <div className={styles.cards}>
          {content.branches.map((branch, index) => {
            const price = getPassPrice(branch.prices, pass);
            const available = price != null;
            const dark = index === 1;
            const showEq = available && activeTab.months > 1;
            const eq =
              showEq && price != null
                ? t(copy.perMonthEquivalent).replace(
                    "{price}",
                    formatBaht(Math.round(price / activeTab.months)),
                  )
                : null;

            return (
              <div
                key={branch.id}
                className={`lift ${styles.card} ${dark ? styles.cardDark : ""}`}
              >
                <div className={styles.cardHead}>
                  <div>
                    <span className={styles.cardName}>{branch.name}</span>
                    <span className={styles.cardArea}>{t(branch.area)}</span>
                  </div>
                  {dark ? (
                    <span className={styles.badge}>{t(copy.badgeBig)}</span>
                  ) : null}
                </div>

                {available ? (
                  <div key={`${branch.id}-${pass}`} className={`fade ${styles.priceBlock}`}>
                    <div className={styles.priceRow}>
                      <span
                        className={styles.price}
                        style={{ color: dark ? "var(--accent)" : undefined }}
                      >
                        {formatBaht(price!)}
                      </span>
                      <span className={styles.unit}>{t(activeTab.unit)}</span>
                    </div>
                    {eq ? <span className={styles.eq}>{eq}</span> : null}
                  </div>
                ) : (
                  <div key={`${branch.id}-${pass}-na`} className={`fade ${styles.unavailable}`}>
                    <span className={styles.notOffered}>{t(copy.notOffered)}</span>
                    <span className={styles.notOfferedSub}>
                      {t(copy.notOfferedSub)}
                    </span>
                  </div>
                )}

                <a
                  href={branch.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`btn ${styles.visit} ${dark ? styles.visitDark : styles.visitLight}`}
                >
                  {t(copy.visit)}
                </a>
              </div>
            );
          })}
        </div>

        <div className={styles.pt}>
          <div className={styles.ptCopy}>
            <span className="eyebrow">{t(copy.personalTraining.eyebrow)}</span>
            <span className={styles.ptTitle}>
              {t(copy.personalTraining.title)}
            </span>
            <span className={styles.ptSub}>
              {t(copy.personalTraining.sub)}
            </span>
          </div>
          <div className={styles.ptGrid}>
            {content.personalTraining.packages.map((pkg) => {
              const label =
                pkg.sessions === 1
                  ? t(copy.personalTraining.single)
                  : `${pkg.sessions} sessions`;
              const per =
                pkg.sessions === 1
                  ? null
                  : t(copy.personalTraining.perSession).replace(
                      "{price}",
                      formatBaht(Math.round(pkg.price / pkg.sessions)),
                    );
              return (
                <div
                  key={pkg.sessions}
                  className={`lift ${styles.ptCard} ${pkg.sessions === 10 ? styles.ptFeatured : ""}`}
                >
                  <span className={styles.ptLabel}>{label}</span>
                  <span className={styles.ptPrice}>{formatBaht(pkg.price)}</span>
                  {per ? <span className={styles.ptPer}>{per}</span> : null}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
