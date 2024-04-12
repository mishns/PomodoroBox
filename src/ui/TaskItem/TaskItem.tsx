import { default as React, FC } from "react";
import styles from "./taskitem.css";

interface TaskItemProps {
  counter: number;
  title: string;
}

export const TaskItem: FC<TaskItemProps> = ({ counter, title }) => {
  return (
    <li className={styles.taskItem}>
      <div className={styles.counter}>{counter}</div>
      <span className={styles.title}>{title}</span>
      <button className={styles.taskOptions}>
        <svg
          width="26"
          height="6"
          viewBox="0 0 26 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="3" cy="3" r="3" fill="#C4C4C4" />
          <circle cx="13" cy="3" r="3" fill="#C4C4C4" />
          <circle cx="23" cy="3" r="3" fill="#C4C4C4" />
        </svg>
      </button>
    </li>
  );
};
