import { default as React, FC } from "react";
import styles from "./button.css";
import classNames from "classnames";

interface ButtonProps {
  type?: "button" | "submit" | "reset";
  isNegative?: boolean;
  isNonActive?: boolean;
  isDisabled?: boolean;
  className?: string;
  children?: React.ReactNode;
  onClick?: () => void;
}

export const Button: FC<ButtonProps> = ({
  type = "button",
  isNegative = false,
  isDisabled = false,
  className,
  children,
  onClick = () => {},
}) => {
  const btnCls = classNames({
    [`${styles.button}`]: true,
    [`${styles.negative}`]: isNegative && !isDisabled,
    [`${styles.disabled}`]: isDisabled,
    [`${className}`]: true,
  });

  function handleClick() {
    if (!isDisabled) {
      onClick();
    }
  }

  return (
    <button type={type} className={btnCls} onClick={handleClick}>
      {children}
    </button>
  );
};
