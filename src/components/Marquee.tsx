"use client";

import { useLanguage } from "@/context/LanguageContext";
import styles from "./Marquee.module.css";

export function Marquee() {
  const { content } = useLanguage();
  const items = [...content.copy.marquee, ...content.copy.marquee];

  return (
    <section aria-label="Equipment list" className={`mq-wrap ${styles.section}`}>
      <div className="marquee">
        {items.map((name, i) => (
          <span key={`${name}-${i}`} className={styles.item}>
            <span className={styles.dot} aria-hidden="true" />
            {name}
          </span>
        ))}
      </div>
    </section>
  );
}
