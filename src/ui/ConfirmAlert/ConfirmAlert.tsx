import { default as React, FC } from "react";
import closeIcon from "@assets/img/close.svg";
import styles from "./confirmAction.css";

interface ConfirmActionProps {
  confirmText: string;
  confirmBtnText: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmAction: FC<ConfirmActionProps> = ({
  confirmText,
  confirmBtnText,
  onConfirm,
  onCancel,
}) => {
  return (
    <div className={styles.confirmAction}>
      <div className={styles.confirmWindow}>
        <span className={styles.confirmText}>{confirmText}</span>
        <button className={styles.confirmBtn} onClick={onConfirm}>
          {confirmBtnText}
        </button>
        <button className={styles.cancelBtn} onClick={onCancel}>
          Отмена
        </button>
        <button className={styles.closeBtn} onClick={onCancel}>
          <img src={closeIcon} />
        </button>
      </div>
    </div>
  );
};
