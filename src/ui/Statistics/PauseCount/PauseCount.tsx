import { default as React, FC } from "react";
import classNames from "classnames";
import styles from "./pausecount.css";
import { Icon } from "@common/Icon";
import pauseCountIcon from "@assets/img/pause-count.svg";

interface PauseCountProps {
  pauseCount: number;
  isBlank: boolean;
}

export const PauseCount: FC<PauseCountProps> = ({ pauseCount, isBlank }) => {
  const pauseCountCls = classNames({
    [`${styles.pauseCount}`]: true,
    [`${styles.pauseCount_blank}`]: isBlank,
  });

  const pauseCountIconCls = classNames({
    [`${styles.pauseCountIcon}`]: true,
    [`${styles.pauseCountIcon_disabled}`]: isBlank,
  });

  return (
    <div className={pauseCountCls}>
      <div className={styles.dataBlock}>
        <h2 className={styles.header}>Остановки</h2>
        <span className={styles.pauseNumber}>{pauseCount}</span>
      </div>
      <div className={styles.pauseCountImg}>
        <Icon className={pauseCountIconCls} src={pauseCountIcon} />
      </div>
    </div>
  );
};
