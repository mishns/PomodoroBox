import { default as React, FC } from "react";
import styles from "./daytotaltime.css";

interface DayTotalTimeProps {
  day: string;
  minutes: number;
}

export const DayTotalTime: FC<DayTotalTimeProps> = ({ day, minutes }) => {
  const hoursNorm = Math.floor(minutes / 60);
  const minutesNorm = minutes % 60;
  return (
    <div className={styles.dayTime}>
      <h2 className={styles.day}>{day}</h2>
      <span>
        Вы&nbsp;работали над задачами в&nbsp;течение{" "}
        <span className={styles.totalTime}>
          {hoursNorm > 0 && <span>{hoursNorm}часов&nbsp;</span>}
          {minutesNorm} минут
        </span>
      </span>
    </div>
  );
};
