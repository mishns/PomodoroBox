import { default as React, FC } from "react";
import styles from "./TasksBlockPage.css";
import { Instruction } from "@ui/Instruction";
import { TaskFormPage } from "@pages/TaskFormPage";
import { TaskListPage } from "@pages/TaskListPage";
import { Task } from "@api/Task";

interface TasksBlockPageProps {
  taskList: Task[];
  handleNewTask: (title: string) => void;
}

export const TasksBlockPage: FC<TasksBlockPageProps> = ({
  taskList,
  handleNewTask,
}) => {
  return (
    <div className={styles.TasksBlockPage}>
      <Instruction />
      <TaskFormPage handleNewTask={handleNewTask} />
      <TaskListPage taskList={taskList} />
    </div>
  );
};
