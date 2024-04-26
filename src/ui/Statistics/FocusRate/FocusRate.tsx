import { default as React, FC } from "react";
import classNames from "classnames";
import { FocusIcon } from "@ui/icons/FocusIcon";
import styles from "./focusrate.css";

interface FocusRateProps {
  focusRate: number;
  isBlank: boolean;
}

export const FocusRate: FC<FocusRateProps> = ({ focusRate, isBlank }) => {
  const focusRateCls = classNames({
    [`${styles.focusRate}`]: true,
    [`${styles.focusRate_blank}`]: isBlank,
  });
  return (
    <div className={focusRateCls}>
      <div className={styles.dataBlock}>
        <h2 className={styles.header}>Фокус</h2>
        <span className={styles.focusNumber}>{focusRate}%</span>
      </div>
      <div className={styles.focusImg}>
        <FocusIcon isDisabled={isBlank} />
      </div>
    </div>
  );
};
