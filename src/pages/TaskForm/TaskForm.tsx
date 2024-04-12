import { default as React, FC } from "react";
import styles from "./taskform.css";
import { Button } from "@ui/Button";

export const TaskForm: FC = () => {
  return (
    <form className={styles.taskForm}>
      <input
        type="text"
        className={styles.taskInput}
        placeholder="Название задачи"
      />
      <Button type="submit">Добавить</Button>
    </form>
  );
};
