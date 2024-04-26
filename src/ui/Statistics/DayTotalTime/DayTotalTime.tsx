import { default as React, FC } from "react";
import styles from "./daytotaltime.css";

interface DayTotalTimeProps {
  day: string;
  hours: number;
  minutes: number;
  isBlank: boolean;
}

export const DayTotalTime: FC<DayTotalTimeProps> = ({
  day,
  hours,
  minutes,
  isBlank,
}) => {
  return (
    <div className={styles.dayTime}>
      <h2 className={styles.day}>{day}</h2>
      {isBlank && <span className={styles.totalTime_blank}>Нет данных</span>}
      {!isBlank && (
        <span>
          Вы&nbsp;работали над задачами в&nbsp;течение{" "}
          <span className={styles.totalTime}>
            {hours > 0 && <span>{hours} часов&nbsp;</span>}
            {minutes} минут
          </span>
        </span>
      )}
    </div>
  );
};
