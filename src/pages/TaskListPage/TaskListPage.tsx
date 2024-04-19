import { default as React, FC, useContext } from "react";
import styles from "./TaskListPage.css";
import { TaskItem } from "@ui/TaskItem";
import { TaskListContext } from "@src/contexts/TaskListContext";

export const TaskListPage: FC = () => {
  const { taskList } = useContext(TaskListContext);
  const totalTime =
    taskList.reduce((total, item) => total + item.timersCounter, 0) * 25;
  const hours = Math.floor(totalTime / 60);
  const minutes = totalTime % 60;

  return (
    <div className={styles.TaskListPage}>
      {taskList.map(item => (
        <TaskItem key={item.id} currTask={item} />
      ))}
      <span className={styles.totalTime}>{`${hours} час ${minutes} мин`}</span>
    </div>
  );
};
