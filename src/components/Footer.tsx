"use client";

import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import styles from "./Footer.module.css";

function socialHref(value: string): string {
  return value.startsWith("[") ? "#top" : value;
}

export function Footer() {
  const { t, content } = useLanguage();
  const copy = content.copy.footer;
  const mapsLabel = t(content.copy.branches.maps);

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.grid}>
          <div className={styles.brand}>
            <Image
              src="/images/logo/pump-fitness-2.0.png"
              alt="Pump Fitness"
              width={288}
              height={104}
              className={styles.logo}
            />
            <span className={styles.tagline}>{t(copy.tagline)}</span>
          </div>

          {content.branches.map((branch) => (
            <div key={branch.id} className={styles.col}>
              <span className={styles.colTitle}>{branch.name}</span>
              <span className={styles.address}>{t(branch.address)}</span>
              <a
                href={branch.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.mapLink}
              >
                {mapsLabel}
              </a>
            </div>
          ))}

          <div className={styles.col}>
            <span className={styles.colTitle}>{t(copy.follow)}</span>
            <a href={socialHref(copy.social.facebook)} className={styles.social}>
              Facebook {copy.social.facebook}
            </a>
            <a
              href={socialHref(copy.social.instagram)}
              className={styles.social}
            >
              Instagram {copy.social.instagram}
            </a>
            <a href={socialHref(copy.social.line)} className={styles.social}>
              LINE {copy.social.line}
            </a>
          </div>
        </div>

        <div className={styles.bottom}>
          <span>{copy.copyright}</span>
          <a href="#top" className={styles.backTop}>
            {t(copy.backTop)}
          </a>
        </div>
      </div>
    </footer>
  );
}
