import { default as React, FC } from "react";
import { PauseTimeIcon } from "@ui/icons/PauseTimeIcon";
import classNames from "classnames";
import styles from "./pausetime.css";

interface PauseTimeProps {
  hours: number;
  minutes: number;
  isBlank: boolean;
}

export const PauseTime: FC<PauseTimeProps> = ({ hours, minutes, isBlank }) => {
  const pauseTimeCls = classNames({
    [`${styles.pauseTime}`]: true,
    [`${styles.pauseTime_blank}`]: isBlank,
  });

  return (
    <div className={pauseTimeCls}>
      <div className={styles.dataBlock}>
        <h2 className={styles.header}>Время на паузе</h2>
        <span className={styles.pauseNumber}>
          {hours > 0 && <span>{hours}ч&nbsp;</span>}
          {minutes}м
        </span>
      </div>
      <div className={styles.pauseTimeImg}>
        <PauseTimeIcon isDisabled={isBlank} />
      </div>
    </div>
  );
};
