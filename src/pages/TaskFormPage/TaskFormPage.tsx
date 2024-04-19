import { default as React, FC } from "react";
import styles from "./TaskFormPage.css";
import { Button } from "@ui/Button";
import { useForm } from "react-hook-form";

interface TaskFormPageProps {
  handleNewTask: (title: string) => void;
}

export const TaskFormPage: FC<TaskFormPageProps> = ({ handleNewTask }) => {
  const { register, handleSubmit } = useForm();

  return (
    <form
      className={styles.taskFormPage}
      onSubmit={handleSubmit(({ title }) => {
        handleNewTask(title);
      })}
    >
      <input
        type="text"
        className={styles.taskInput}
        placeholder="Название задачи"
        {...register("title")}
      />
      <Button type="submit">Добавить</Button>
    </form>
  );
};
