import { default as React, FC } from "react";
import focusImg from "@assets/img/focus.svg";
import styles from "./focusrate.css";

interface FocusRateProps {
  focusRate: number;
}

export const FocusRate: FC<FocusRateProps> = ({ focusRate }) => {
  return (
    <div className={styles.focusRate}>
      <div className={styles.dataBlock}>
        <h2 className={styles.header}>Фокус</h2>
        <span className={styles.focusNumber}>{focusRate}%</span>
      </div>
      <img className={styles.focusImg} src={focusImg} />
    </div>
  );
};
