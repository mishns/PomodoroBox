import { default as React, FC } from "react";
import styles from "./weekchart.css";

interface WeekChartProps {}

export const WeekChart: FC<WeekChartProps> = () => {
  return (
    <div className={styles.weekChart}>
      <div className={styles.days}></div>
    </div>
  );
};
