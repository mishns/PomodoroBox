import { default as React, FC } from "react";
import styles from "./TasksBlockPage.css";
import { Instruction } from "@ui/Instruction";
import { TaskFormPage } from "@pages/TaskFormPage";
import { TaskListPage } from "@pages/TaskListPage";

export const TasksBlockPage: FC = () => {
  return (
    <div className={styles.TasksBlockPage}>
      <Instruction />
      <TaskFormPage />
      <TaskListPage />
    </div>
  );
};
