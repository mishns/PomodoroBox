import { default as React, FC } from "react";
import classNames from "classnames";
import styles from "./daybar.css";

interface DayBarProps {
  minutes: number;
  weekDay: number;
  dayName: string;
  isActive: boolean;
  onBarClick: (weekDay: number) => void;
}

export const DayBar: FC<DayBarProps> = ({
  minutes,
  weekDay,
  dayName,
  isActive,
  onBarClick,
}) => {
  const dayBarCls = classNames({
    [`${styles.dayBar}`]: true,
    [`${styles.dayBar_active}`]: isActive,
    [`${styles.dayBar_zero}`]: minutes === 0,
  });

  const maxHeight: number = 420;
  const minHeight: number = 5;

  const maxMinutes: number = 125;
  const minutesPercent: number = minutes / maxMinutes;

  const height = Math.floor(minutesPercent * maxHeight);
  const barHeight = Math.max(Math.min(height, maxHeight), minHeight);

  return (
    <div className={dayBarCls} onClick={() => onBarClick(weekDay)}>
      <div className={styles.bar} style={{ minHeight: barHeight }}></div>
      <div className={styles.day}>{dayName}</div>
    </div>
  );
};
