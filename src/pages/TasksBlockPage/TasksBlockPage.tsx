import { default as React, FC, useContext } from "react";
import styles from "./TasksBlockPage.css";
import { Instruction } from "@ui/Instruction";
import { TaskFormPage } from "@pages/TaskFormPage";
import { TaskListPage } from "@pages/TaskListPage";
import { TaskListContext } from "@src/contexts/TaskListContext";

export const TasksBlockPage: FC = () => {
  const { taskListActions } = useContext(TaskListContext);
  return (
    <div className={styles.TasksBlockPage}>
      <Instruction />
      <TaskFormPage handleNewTask={taskListActions.handleNewTask} />
      <TaskListPage />
    </div>
  );
};
