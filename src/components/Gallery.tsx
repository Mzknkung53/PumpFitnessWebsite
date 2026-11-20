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
          <div className={styles.headerCopy}>
            <span className="eyebrow">{t(copy.eyebrow)}</span>
            <h2 className="section-title">{t(copy.title)}</h2>
          </div>
          <a href={igHref} className={`btn btn-ghost ${styles.ig}`}>
            Instagram {copy.instagram}
          </a>
        </div>

        <div className={styles.grid}>
          {copy.items.map((item) => (
            <MediaPlaceholder
              key={item.label}
              label={`${item.type.toUpperCase()} · ${item.label}`}
              radius="lg"
              play={item.type === "video"}
              tall
              className={styles.item}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
