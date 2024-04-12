import { default as React, FC } from "react";
import styles from "./content.css";
import { Instruction } from "@ui/Instruction";
import { TaskForm } from "@pages/TaskForm";

export const Content: FC = () => {
  return (
    <div className={styles.content}>
      <Instruction />
      <TaskForm />
    </div>
  );
};
