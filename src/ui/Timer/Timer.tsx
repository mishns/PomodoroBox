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
    Math.floor(minutesNorm / 10) != 0
      ? minutesNorm.toString()
      : "0" + minutesNorm;
  const secondsStr =
    Math.floor(secondsNorm / 10) != 0
      ? secondsNorm.toString()
      : "0" + secondsNorm;
  return (
    <span className={timerCls}>
      {minutesStr}:{secondsStr}
    </span>
  );
};
