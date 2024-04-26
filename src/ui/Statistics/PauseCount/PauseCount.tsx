import { default as React, FC } from "react";
import { PauseCountIcon } from "@ui/icons/PauseCountIcon";
import classNames from "classnames";
import styles from "./pausecount.css";

interface PauseCountProps {
  pauseCount: number;
  isBlank: boolean;
}

export const PauseCount: FC<PauseCountProps> = ({ pauseCount, isBlank }) => {
  const pauseCountCls = classNames({
    [`${styles.pauseCount}`]: true,
    [`${styles.pauseCount_blank}`]: isBlank,
  });

  return (
    <div className={pauseCountCls}>
      <div className={styles.dataBlock}>
        <h2 className={styles.header}>Остановки</h2>
        <span className={styles.pauseNumber}>{pauseCount}</span>
      </div>
      <div className={styles.pauseCountImg}>
        <PauseCountIcon isDisabled={isBlank} />
      </div>
    </div>
  );
};
