import { default as React, FC } from "react";
import styles from "./content.css";
import { Instruction } from "@ui/Instruction";
import { TaskForm } from "@pages/TaskForm";
import { TaskList } from "@pages/TaskList";
import { HomeBlock } from "@pages/HomeBlock";

export const Content: FC = () => {
  return (
    <div className={styles.content}>
      <HomeBlock />
    </div>
  );
};
