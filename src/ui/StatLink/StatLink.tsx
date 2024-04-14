import { default as React, FC } from "react";
import styles from "./statlink.css";

export const StatLink: FC = () => {
  return (
    <div className={styles.statLink}>
      <svg
        className={styles.statImg}
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M6 16H10V0H6V16ZM0 16H4V8H0V16ZM12 5V16H16V5H12Z" />
      </svg>
      <span className={styles.statText}>Статистика</span>
    </div>
  );
};
