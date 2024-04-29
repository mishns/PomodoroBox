import { default as React, FC } from "react";
import closeIcon from "@assets/img/close.svg";
import styles from "./confirmAction.css";

interface ConfirmActionProps {
  confirmText: string;
  confirmBtnText: string;
  onConfirm: (response: boolean) => void;
}

export const ConfirmAction: FC<ConfirmActionProps> = ({
  confirmText,
  confirmBtnText,
  onConfirm,
}) => {
  return (
    <div className={styles.confirmAction}>
      <div className={styles.confirmWindow}>
        <span className={styles.confirmText}>{confirmText}</span>
        <button className={styles.confirmBtn} onClick={() => onConfirm(true)}>
          {confirmBtnText}
        </button>
        <button className={styles.cancelBtn} onClick={() => onConfirm(false)}>
          Отмена
        </button>
        <button className={styles.closeBtn} onClick={() => onConfirm(false)}>
          <img src={closeIcon} />
        </button>
      </div>
    </div>
  );
};
