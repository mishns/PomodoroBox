import { default as React, FC, useContext, useRef } from "react";
import styles from "./homepage.css";
import { TasksBlockPage } from "@pages/TasksBlockPage";
import { TimerPage } from "@pages/TimerPage";
import { TaskListContext } from "@src/contexts/TaskListContext";

export const HomePage: FC = () => {
  const { currTask, taskListActions } = useContext(TaskListContext);
  const tasksDone = useRef<number>(0);

  function handleTimerIsUp() {
    if (currTask.timersCounter <= 1) {
      taskListActions.handleTaskDelete(currTask.id);
      tasksDone.current++;
    } else {
      taskListActions.handleTaskTimersMinus(currTask.id);
    }
  }

  return (
    <div className={styles.homePage}>
      <TasksBlockPage />
      <TimerPage tasksDone={tasksDone.current} onTimerIsUp={handleTimerIsUp} />
    </div>
  );
};
