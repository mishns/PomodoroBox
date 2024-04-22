import { default as React, FC } from "react";
import pomodoroImg from "@assets/img/pomodorobox-logo.svg";
import styles from "./timerscomplete.css";

interface TimersCompleteProps {
  timersCount: number;
}

export const TimersComplete: FC<TimersCompleteProps> = ({ timersCount }) => {
  return (
    <div className={styles.timersComplete}>
      <div className={styles.mainBlock}>
        <img className={styles.pomodoroImg} src={pomodoroImg} />
        <span className={styles.pomodoroCount}>x {timersCount}</span>
      </div>
      <div className={styles.secondaryBlock}>
        <span className={styles.pomodoroCountStr}>{timersCount} помидора</span>
      </div>
    </div>
  );
};
