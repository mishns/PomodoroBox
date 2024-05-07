import { default as React, FC } from "react";
import closeIcon from "@assets/img/close.svg";
import styles from "./alert.css";
import { Icon } from "@common/Icon";
import { Button } from "@common/Button";

interface AlertProps {
  confirmText: string;
  onConfirm: () => void;
}

export const Alert: FC<AlertProps> = ({ confirmText, onConfirm }) => {
  return (
    <div className={styles.alert}>
      <div className={styles.alertWindow}>
        <span className={styles.alertText}>{confirmText}</span>
        <Button onClick={onConfirm}>Продолжить</Button>
        <button className={styles.closeBtn} onClick={onConfirm}>
          <Icon className={styles.closeIcon} src={closeIcon} />
        </button>
      </div>
    </div>
  );
};
