import { default as React, FC, useState } from "react";
import styles from "./taskoptionsbtn.css";
import { TaskOptionsMenu } from "@ui/TaskOptionsMenu";
import { Task } from "@api/Task";
import { Icon } from "@common/Icon";
import optionsBtnIcon from "@assets/img/options.svg";

interface TaskOptionsBtnProps {
  task: Task;
  onEditClick: () => void;
}

export const TaskOptionsBtn: FC<TaskOptionsBtnProps> = ({
  task,
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
      <Icon className={styles.optionsIcon} src={optionsBtnIcon} />

      <TaskOptionsMenu
        task={task}
        isVisible={menuIsVisible}
        onEditClick={onEditClick}
      />
    </button>
  );
};
