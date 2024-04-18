import { default as React, FC } from "react";
import styles from "./TaskListPage.css";
import { TaskItem } from "@ui/TaskItem";
import { Task } from "@api/Task";

interface TaskListPageProps {
  taskList: Task[];
}

export const TaskListPage: FC<TaskListPageProps> = ({ taskList }) => {
  const totalTime =
    taskList.reduce((total, item) => total + item.timersCounter, 0) * 25;
  const hours = Math.floor(totalTime / 60);
  const minutes = totalTime % 60;

  return (
    <div className={styles.TaskListPage}>
      {taskList.map(item => (
        <TaskItem
          key={item.id}
          taskId={item.id}
          counter={item.timersCounter}
          title={item.taskTitle}
        />
      ))}
      <span className={styles.totalTime}>{`${hours} час ${minutes} мин`}</span>
    </div>
  );
};
