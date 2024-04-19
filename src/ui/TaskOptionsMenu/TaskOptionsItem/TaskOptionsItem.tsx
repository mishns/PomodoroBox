import { default as React, FC } from "react";
import styles from "./taskoptionsitem.css";

interface TaskOptionsItemProps {
  text: string;
  icon: React.ReactElement;
  onClick: () => void;
}

export const TaskOptionsItem: FC<TaskOptionsItemProps> = ({
  text,
  icon,
  onClick,
}) => {
  return (
    <span className={styles.menuItem} onClick={onClick}>
      {icon}
      {text}
    </span>
  );
};
