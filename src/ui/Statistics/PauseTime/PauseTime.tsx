import { default as React, FC } from "react";
import styles from "./pausetime.css";
import pauseTimeImg from "@assets/img/pause-time.svg";

interface PauseTimeProps {
  pauseTime: number;
}

export const PauseTime: FC<PauseTimeProps> = ({ pauseTime }) => {
  return (
    <div className={styles.pauseTime}>
      <div className={styles.dataBlock}>
        <h2 className={styles.header}>Время на паузе</h2>
        <span className={styles.pauseNumber}>{pauseTime}м</span>
      </div>
      <img src={pauseTimeImg} />
    </div>
  );
};
