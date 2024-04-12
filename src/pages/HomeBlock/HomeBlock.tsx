import { default as React, FC } from "react";
import styles from "./homeblock.css";
import { Instruction } from "@ui/Instruction";
import { TaskForm } from "@pages/TaskForm";
import { TaskList } from "@pages/TaskList";

interface HomeBlockProps {}

export const HomeBlock: FC<HomeBlockProps> = () => {
  return (
    <div className={styles.homeBlock}>
      <Instruction />
      <TaskForm />
      <TaskList />
    </div>
  );
};
