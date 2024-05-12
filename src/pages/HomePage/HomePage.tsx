import { default as React, FC } from "react";
import styles from "./homepage.css";
import { TasksBlockPage } from "@pages/TasksBlockPage";
import { TimerPage } from "@pages/TimerPage";

export const HomePage: FC = () => {
  return (
    <div className={styles.homePage}>
      <TasksBlockPage />
      <TimerPage />
    </div>
  );
};
