import { default as React, FC } from "react";
import styles from "./TaskListPage.css";
import { TaskItem } from "@ui/TaskItem";

const taskList = [
  { id: 1, counter: 1, title: "Сделать" },
  { id: 2, counter: 2, title: "Доделать" },
];

const totalTime =
  taskList.reduce((total, item) => total + item.counter, 0) * 25;
const hours = Math.floor(totalTime / 60);
const minutes = totalTime % 60;

export const TaskListPage: FC = () => {
  return (
    <div className={styles.TaskListPage}>
      {taskList.map(item => (
        <TaskItem key={item.id} counter={item.counter} title={item.title} />
      ))}
      <span className={styles.totalTime}>{`${hours} час ${minutes} мин`}</span>
    </div>
  );
};
