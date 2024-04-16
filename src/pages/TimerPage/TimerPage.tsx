import { default as React, FC, useState, useEffect, useRef } from "react";
import styles from "./timerpage.css";
import { Timer } from "@ui/Timer";
import { PlusButton } from "@ui/PlusButton";
import { Button } from "@ui/Button";
import { Task } from "@api/Task";

const SECONDS_IN_MINUTE = 60;
const POMODORO_SECONDS = 25 * SECONDS_IN_MINUTE;
const BREAK_SECONDS = 5 * SECONDS_IN_MINUTE;
const PLUS_SECONDS = 1 * SECONDS_IN_MINUTE;

interface TimerPageProps {
  currTask: Task;
  tasksDone: number;
  isBreak?: boolean;
  onTimerIsUp: () => void;
}

export const TimerPage: FC<TimerPageProps> = ({
  currTask: { taskTitle, timersCounter: currTaskTimers },
  tasksDone,
  isBreak,
  onTimerIsUp,
}) => {
  const [seconds, setSeconds] = useState<number>(POMODORO_SECONDS);
  const [isPause, setIsPause] = useState<boolean>(true);
  const [isInit, setIsInit] = useState<boolean>(true);
  const plusRef = useRef<boolean>(false);
  const timerId = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    timerId.current = setInterval(() => {
      if (!isPause) {
        setSeconds(seconds => seconds - 1);
      } else {
        if (timerId.current) {
          clearInterval(timerId.current);
        }
      }
    }, 1000);

    return () => {
      if (timerId.current) {
        clearInterval(timerId.current);
      }
    };
  }, [isPause, plusRef.current]);

  useEffect(() => {
    if (seconds <= 0) {
      resetTimer();
    }
  });

  function resetTimer() {
    if (!isBreak) {
      setSeconds(POMODORO_SECONDS);
    } else {
      setSeconds(BREAK_SECONDS);
    }
    setIsInit(true);
    setIsPause(true);
    onTimerIsUp();
  }

  function handleStartClick() {
    setIsInit(false);
    setIsPause(false);
  }

  function handlePauseClick() {
    setIsPause(true);
  }

  function handleDoneClick() {
    resetTimer();
  }

  function handlePlusClick() {
    setSeconds(seconds + PLUS_SECONDS);
    plusRef.current = !plusRef.current;
  }

  let posBtnText: string = "Старт";
  let posBtnHandleClick: () => void = handleStartClick;
  if (isPause && !isInit) {
    posBtnText = "Продожить";
    posBtnHandleClick = handleStartClick;
  }
  if (!isPause) {
    posBtnText = "Пауза";
    posBtnHandleClick = handlePauseClick;
  }

  let negBtnText: string = "Стоп";
  if (isPause && !isInit) {
    negBtnText = "Сделано";
  }

  return (
    <div className={styles.timerPage}>
      <div className={styles.header}>
        <span className={styles.taskTitle}>{taskTitle}</span>
        <span className={styles.currTaskTimers}>Помидор {currTaskTimers}</span>
      </div>

      <div className={styles.main}>
        <div className={styles.timerBlock}>
          <Timer seconds={seconds} isPause={isPause} isInit={isInit} />
          <PlusButton handleClick={handlePlusClick} />
        </div>

        <div className={styles.taskBlock}>
          <span className={styles.taskCounter}>
            Задача {tasksDone + 1}&nbsp;-&nbsp;
          </span>
          <span className={styles.taskTitle}>{taskTitle}</span>
        </div>

        <div className={styles.buttonsBlock}>
          <Button className={styles.button} onClick={posBtnHandleClick}>
            {posBtnText}
          </Button>
          <Button
            className={styles.button}
            onClick={handleDoneClick}
            isDisabled={isInit}
            isNegative
          >
            {negBtnText}
          </Button>
        </div>
      </div>
    </div>
  );
};
