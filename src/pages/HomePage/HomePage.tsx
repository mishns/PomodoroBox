import { default as React, FC, useState, useContext } from "react";
import styles from "./homepage.css";
import { TasksBlockPage } from "@pages/TasksBlockPage";
import { TimerPage } from "@pages/TimerPage";
import { Task } from "@api/Task";
import { TaskListContext } from "@src/contexts/TaskListContext";

export const HomePage: FC = () => {
  // const [taskList, setTaskList] = useState<Task[]>(tasks);
  const { taskList, taskListActions } = useContext(TaskListContext);
  const [currTask] = useState<Task>(taskList[0]);
  const tasksDone = 0;

  return (
    <div className={styles.homePage}>
      <TasksBlockPage
        taskList={taskList}
        handleNewTask={taskListActions.handleNewTask}
      />
      <TimerPage currTask={currTask} tasksDone={tasksDone} />
    </div>
  );
};
