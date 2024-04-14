import { default as React, FC } from "react";
import styles from "./timer.css";
import classNames from "classnames";

interface TimerProps {
  minutes: number;
  seconds: number;
  isPause?: boolean;
}

export const Timer: FC<TimerProps> = ({ minutes, seconds, isPause }) => {
  const timerCls = classNames({
    [`${styles.timer}`]: true,
    [`${styles.pause}`]: isPause,
  });

  const minutesStr =
    Math.floor(minutes / 10) != 0 ? minutes.toString() : "0" + minutes;
  const secondsStr =
    Math.floor(seconds / 10) != 0 ? seconds.toString() : "0" + seconds;
  return (
    <span className={timerCls}>
      {minutesStr}:{secondsStr}
    </span>
  );
};
