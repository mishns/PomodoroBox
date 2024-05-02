import { default as React, FC } from "react";
import styles from "./timer.css";
import classNames from "classnames";

interface TimerProps {
  seconds: number;
  isPause: boolean;
  isInit: boolean;
  isBreak: boolean;
}

export const Timer: FC<TimerProps> = ({
  seconds,
  isPause,
  isInit,
  isBreak,
}) => {
  const timerCls = classNames({
    [`${styles.timer}`]: true,
    [`${styles.pause}`]: isPause && !isInit && !isBreak,
    [`${styles.break}`]: isBreak && !isPause,
  });

  const minutesNorm = Math.floor(seconds / 60);
  const secondsNorm = Math.floor(seconds % 60);

  const minutesStr =
    minutesNorm >= 10 ? minutesNorm.toString() : "0" + minutesNorm;
  const secondsStr =
    secondsNorm >= 10 ? secondsNorm.toString() : "0" + secondsNorm;

  return (
    <div className={timerCls}>
      {minutesStr}
      <div className={styles.separator} key={seconds}>
        <span className={styles.sep}>:</span>
      </div>
      {secondsStr}
    </div>
  );
};
