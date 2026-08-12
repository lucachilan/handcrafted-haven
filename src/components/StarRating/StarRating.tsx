import styles from "./StarRating.module.css";

interface StarRatingProps {
  value?: number;
  max?: number;
  showValue?: boolean;
}

const STAR_PATH =
  "M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27z";

export default function StarRating({
  value = 0,
  max = 5,
  showValue = false,
}: StarRatingProps) {
  const clamped = Math.max(0, Math.min(max, value));
  const label = `${clamped.toFixed(1)} out of ${max} stars`;

  return (
    <span className={styles.rating} role="img" aria-label={label} title={label}>
      {Array.from({ length: max }, (_, i) => {
        const fillPct = Math.round(Math.max(0, Math.min(1, clamped - i)) * 100);
        return (
          <span className={styles.star} key={i} aria-hidden="true">
            <svg viewBox="0 0 24 24" className={styles.svg}>
              <path d={STAR_PATH} className={styles.empty} />
            </svg>
            <span className={styles.fillWrap} style={{ width: `${fillPct}%` }}>
              <svg viewBox="0 0 24 24" className={styles.svg}>
                <path d={STAR_PATH} className={styles.filled} />
              </svg>
            </span>
          </span>
        );
      })}
      {showValue && (
        <span className={styles.value}>{clamped.toFixed(1)}</span>
      )}
    </span>
  );
}