import { default as React, FC, useState } from "react";
import styles from "./taskoptionsbtn.css";
import { TaskOptionsMenu } from "@ui/TaskOptionsMenu";
import { Task } from "@api/Task";

interface TaskOptionsBtnProps {
  currTask: Task;
  onEditClick: () => void;
}

export const TaskOptionsBtn: FC<TaskOptionsBtnProps> = ({
  currTask,
  onEditClick,
}) => {
  const [menuIsVisible, setMenuIsVisible] = useState<boolean>(false);
  function handleClick() {
    setMenuIsVisible(!menuIsVisible);
  }

  function handleBlur() {
    setMenuIsVisible(false);
  }

  return (
    <button
      className={styles.taskOptionsBtn}
      onClick={handleClick}
      onBlur={handleBlur}
    >
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

      <TaskOptionsMenu
        currTask={currTask}
        isVisible={menuIsVisible}
        onEditClick={onEditClick}
      />
    </button>
  );
};
