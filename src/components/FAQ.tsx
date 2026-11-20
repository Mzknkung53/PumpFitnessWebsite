"use client";

import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import styles from "./FAQ.module.css";

export function FAQ() {
  const { t, content } = useLanguage();
  const copy = content.copy.faq;
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.header} data-reveal>
          <span className="eyebrow">{t(copy.eyebrow)}</span>
          <h2 className="section-title">{t(copy.title)}</h2>
        </div>

        <div className={styles.list}>
          {copy.items.map((item, index) => {
            const open = openIndex === index;
            return (
              <div
                key={item.q.en}
                className={`${styles.item} ${open ? styles.itemOpen : ""}`}
                data-reveal
                style={{ "--d": index + 1 } as React.CSSProperties}
              >
                <button
                  type="button"
                  id={`faq-q-${index}`}
                  aria-expanded={open}
                  aria-controls={`faq-a-${index}`}
                  className={styles.trigger}
                  onClick={() => setOpenIndex(open ? -1 : index)}
                >
                  <span>{t(item.q)}</span>
                  <span
                    className={`${styles.icon} ${open ? styles.iconOpen : ""}`}
                    aria-hidden="true"
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.6"
                    >
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </span>
                </button>
                <div
                  id={`faq-a-${index}`}
                  role="region"
                  aria-labelledby={`faq-q-${index}`}
                  className={styles.panel}
                  inert={!open}
                >
                  <div className={styles.panelInner}>
                    <p className={styles.answer}>{t(item.a)}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
