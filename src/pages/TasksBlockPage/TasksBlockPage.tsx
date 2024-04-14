import { default as React, FC } from "react";
import styles from "./TasksBlockPage.css";
import { Instruction } from "@ui/Instruction";
import { TaskFormPage } from "@pages/TaskFormPage";
import { TaskListPage } from "@pages/TaskListPage";

interface TasksBlockPageProps {}

export const TasksBlockPage: FC<TasksBlockPageProps> = () => {
  return (
    <div className={styles.TasksBlockPage}>
      <Instruction />
      <TaskFormPage />
      <TaskListPage />
    </div>
  );
};
