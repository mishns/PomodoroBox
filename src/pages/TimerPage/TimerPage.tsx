import { default as React, FC } from "react";
import styles from "./timerpage.css";
import { Timer } from "@ui/Timer";
import { PlusButton } from "@ui/PlusButton";
import { Button } from "@ui/Button";
import { Task } from "@api/Task";

interface TimerPageProps {
  currTask: Task;
  tasksDone: number;
}

export const TimerPage: FC<TimerPageProps> = ({
  currTask: { taskTitle, timerCounter },
  tasksDone,
}) => {
  return (
    <div className={styles.timerPage}>
      <div className={styles.header}>
        <span className={styles.taskTitle}>{taskTitle}</span>
        <span className={styles.timerCounter}>Помидор {timerCounter}</span>
      </div>

      <div className={styles.main}>
        <div className={styles.timerBlock}>
          <Timer minutes={25} seconds={4} />
          <PlusButton />
        </div>

        <div className={styles.taskBlock}>
          <span className={styles.taskCounter}>
            Задача {tasksDone + 1}&nbsp;-&nbsp;
          </span>
          <span className={styles.taskTitle}>{taskTitle}</span>
        </div>

        <div className={styles.buttonsBlock}>
          <Button className={styles.button}>Пауза</Button>
          <Button className={styles.button} isNegative isDisabled>
            Стоп
          </Button>
        </div>
      </div>
    </div>
  );
};
