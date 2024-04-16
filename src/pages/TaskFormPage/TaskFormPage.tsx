import { default as React, FC } from "react";
import styles from "./TaskFormPage.css";
import { Button } from "@ui/Button";
import { useForm } from "react-hook-form";

interface TaskFormPageProps {
  handleNewTask: (taskTitle: string) => void;
}

export const TaskFormPage: FC<TaskFormPageProps> = ({ handleNewTask }) => {
  const { register, handleSubmit } = useForm();

  return (
    <form
      className={styles.taskFormPage}
      onSubmit={handleSubmit(({ taskTitle }) => {
        handleNewTask(taskTitle);
      })}
    >
      <input
        type="text"
        className={styles.taskInput}
        placeholder="Название задачи"
        {...register("taskTitle")}
      />
      <Button type="submit">Добавить</Button>
    </form>
  );
};
