import { default as React, FC } from "react";
import styles from "./daybar.css";
import classNames from "classnames";

interface DayBarProps {
  value: number;
  weekDay: number;
  dayName: string;
  isActive: boolean;
  onBarClick: (weekDay: number) => void;
}

export const DayBar: FC<DayBarProps> = ({
  value,
  weekDay,
  dayName,
  isActive,
  onBarClick,
}) => {
  const dayBarCls = classNames({
    [`${styles.dayBar}`]: true,
    [`${styles.dayBar_active}`]: isActive,
    [`${styles.dayBar_zero}`]: value === 0,
  });

  return (
    <div className={dayBarCls} onClick={() => onBarClick(weekDay)}>
      <div className={styles.bar} style={{ height: value | 5 }}></div>
      <div className={styles.day}>{dayName}</div>
    </div>
  );
};
