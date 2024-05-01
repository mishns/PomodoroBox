import { default as React, FC } from "react";
import classNames from "classnames";
import styles from "./focusrate.css";
import { Icon } from "@common/Icon";
import focusIcon from "@assets/img/focus.svg";

interface FocusRateProps {
  focusRate: number;
  isBlank: boolean;
}

export const FocusRate: FC<FocusRateProps> = ({ focusRate, isBlank }) => {
  const focusRateCls = classNames({
    [`${styles.focusRate}`]: true,
    [`${styles.focusRate_blank}`]: isBlank,
  });

  const focusImgCls = classNames({
    [`${styles.focusImg}`]: true,
    [`${styles.focusImg_disabled}`]: isBlank,
  });

  return (
    <div className={focusRateCls}>
      <div className={styles.dataBlock}>
        <h2 className={styles.header}>Фокус</h2>
        <span className={styles.focusNumber}>{focusRate}%</span>
      </div>
      <Icon className={focusImgCls} src={focusIcon} />
    </div>
  );
};
