import { default as React, FC } from "react";
import styles from "./plusbutton.css";
import classNames from "classnames";
import { Icon } from "@common/Icon";
import plusButtonIcon from "@assets/img/plus-button.svg";

interface PlusButtonProps {
  isDisabled?: boolean;
  handleClick: () => void;
}

export const PlusButton: FC<PlusButtonProps> = ({
  isDisabled,
  handleClick,
}) => {
  const plusBtnIconCls = classNames({
    [`${styles.plusBtnIcon}`]: true,
    [`${styles.disabled}`]: isDisabled,
  });
  return (
    <button className={styles.plusBtn} onClick={handleClick}>
      <Icon className={plusBtnIconCls} src={plusButtonIcon} />
    </button>
  );
};
