import { default as React, FC } from "react";
import pauseCountImg from "@assets/img/pause-count.svg";
import styles from "./pausecount.css";

interface PauseCountProps {
  pauseCount: number;
}

export const PauseCount: FC<PauseCountProps> = ({ pauseCount }) => {
  return (
    <div className={styles.pauseCount}>
      <div className={styles.dataBlock}>
        <h2 className={styles.header}>Остановки</h2>
        <span className={styles.pauseNumber}>{pauseCount}</span>
      </div>
      <img src={pauseCountImg} />
    </div>
  );
};
