import { default as React, FC } from "react";
import styles from "./content.css";
import { TasksBlockPage } from "@pages/TasksBlockPage";
import { TimerPage } from "@pages/TimerPage";

export const Content: FC = () => {
  return (
    <div className={styles.content}>
      <TasksBlockPage />
      <TimerPage taskTitle="Сверстать сайт" taskCounter={1} timerCounter={2} />
    </div>
  );
};
