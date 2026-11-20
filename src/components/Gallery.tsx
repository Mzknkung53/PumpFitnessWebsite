"use client";

import { useLanguage } from "@/context/LanguageContext";
import { MediaPlaceholder } from "./MediaPlaceholder";
import styles from "./Gallery.module.css";

export function Gallery() {
  const { t, content } = useLanguage();
  const copy = content.copy.gallery;
  const igHref =
    copy.instagram.startsWith("[") ? "#gallery" : copy.instagram;

  return (
    <section id="gallery" className={styles.section}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.header}>
          <div className={styles.headerCopy} data-reveal>
            <span className="eyebrow">{t(copy.eyebrow)}</span>
            <h2 className="section-title">{t(copy.title)}</h2>
          </div>
          <a
            href={igHref}
            className={`btn btn-ghost ${styles.ig}`}
            data-reveal
            style={{ "--d": 1 } as React.CSSProperties}
          >
            Instagram {copy.instagram}
          </a>
        </div>

        <div className={styles.grid}>
          {copy.items.map((item, i) => (
            <div
              key={item.label}
              className={styles.cell}
              data-reveal="scale"
              style={{ "--d": i % 4 } as React.CSSProperties}
            >
              <MediaPlaceholder
                label={`${item.type.toUpperCase()} · ${item.label}`}
                radius="lg"
                play={item.type === "video"}
                tall
                className={styles.item}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
