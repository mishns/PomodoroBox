import { default as React, FC, useState } from "react";
import styles from "./homepage.css";
import { TasksBlockPage } from "@pages/TasksBlockPage";
import { TimerPage } from "@pages/TimerPage";
import { Task } from "@api/Task";

const tasks: Task[] = [
  { id: 1, taskTitle: "Сверстать", timersCounter: 2 },
  { id: 2, taskTitle: "Доделать!", timersCounter: 1 },
];

export const HomePage: FC = () => {
  const [taskList, setTaskList] = useState<Task[]>(tasks);
  const [currTask] = useState<Task>(tasks[0]);
  const tasksDone = 0;

  function createNewTask(taskTitle: string) {
    const newTask: Task = { id: 3, taskTitle, timersCounter: 1 };
    const newTaskList = [...taskList, newTask];
    setTaskList(newTaskList);
  }

  function handleNewTask(taskTitle: string) {
    createNewTask(taskTitle);
  }

  return (
    <div className={styles.homePage}>
      <TasksBlockPage taskList={taskList} handleNewTask={handleNewTask} />
      <TimerPage currTask={currTask} tasksDone={tasksDone} />
    </div>
  );
};
