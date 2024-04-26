import { default as React, FC } from "react";
import pomodoroImg from "@assets/img/pomodorobox-logo.svg";
import liveTomatoImg from "@assets/img/live-tomato.svg";
import styles from "./timerscomplete.css";

interface TimersCompleteProps {
  timersCount: number;
  isBlank: boolean;
}

export const TimersComplete: FC<TimersCompleteProps> = ({
  timersCount,
  isBlank,
}) => {
  return (
    <div className={styles.timersComplete}>
      {isBlank && (
        <img className={styles.blankPomodoroImg} src={liveTomatoImg} />
      )}
      {!isBlank && (
        <div className={styles.dataBlock}>
          <div className={styles.mainBlock}>
            <img className={styles.pomodoroImg} src={pomodoroImg} />
            <span className={styles.pomodoroCount}>x {timersCount}</span>
          </div>
          <div className={styles.secondaryBlock}>
            <span className={styles.pomodoroCountStr}>
              {timersCount} помидора
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
