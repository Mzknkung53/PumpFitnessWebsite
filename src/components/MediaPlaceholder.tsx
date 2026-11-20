import styles from "./MediaPlaceholder.module.css";

type Props = {
  label: string;
  className?: string;
  radius?: "md" | "lg" | "xl";
  play?: boolean;
  tall?: boolean;
};

export function MediaPlaceholder({
  label,
  className = "",
  radius = "lg",
  play = false,
  tall = false,
}: Props) {
  return (
    <div
      className={`zoom ${styles.root} ${styles[radius]} ${tall ? styles.tall : ""} ${className}`}
      role="img"
      aria-label={label}
    >
      <div className={`zi ${styles.inner} ${play ? styles.centered : ""}`}>
        {play ? (
          <span className={styles.play} aria-hidden="true">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="8 5 19 12 8 19 8 5" />
            </svg>
          </span>
        ) : null}
        <span className={styles.label}>{label}</span>
      </div>
    </div>
  );
}
