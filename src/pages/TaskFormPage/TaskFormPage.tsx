import { default as React, FC } from "react";
import styles from "./TaskFormPage.css";
import { Button } from "@ui/Button";

export const TaskFormPage: FC = () => {
  return (
    <form className={styles.TaskFormPage}>
      <input
        type="text"
        className={styles.taskInput}
        placeholder="Название задачи"
      />
      <Button type="submit">Добавить</Button>
    </form>
  );
};
