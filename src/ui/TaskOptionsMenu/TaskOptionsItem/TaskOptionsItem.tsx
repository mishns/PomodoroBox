import { default as React, FC } from "react";
import styles from "./taskoptionsitem.css";

interface TaskOptionsItemProps {
  text: string;
  icon: undefined;
  onClick: () => void;
}

export const TaskOptionsItem: FC<TaskOptionsItemProps> = ({
  text,
  icon,
  onClick,
}) => {
  function handleClick() {
    onClick();
  }

  return (
    <span className={styles.menuItem} onClick={handleClick}>
      <img className={styles.optionIcon} src={icon} />
      {text}
    </span>
  );
};
