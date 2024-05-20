import { default as React, FC } from "react";
import closeIcon from "@assets/img/close.svg";
import styles from "./confirmAction.css";
import { Icon } from "@common/Icon";
import { Button } from "@common/Button";

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
        <Button className={styles.confirmBtn} onClick={onConfirm} isNegative>
          {confirmBtnText}
        </Button>
        <button className={styles.cancelBtn} onClick={onCancel}>
          Отмена
        </button>
        <button className={styles.closeBtn} onClick={onCancel}>
          <Icon className={styles.closeIcon} src={closeIcon} />
        </button>
      </div>
    </div>
  );
};
