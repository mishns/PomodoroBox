import {
  default as React,
  FC,
  useState,
  useEffect,
  useRef,
  useContext,
} from "react";
import styles from "./timerpage.css";
import { Timer } from "@ui/Timer";
import { PlusButton } from "@ui/PlusButton";
import { Button } from "@ui/Button";
import classNames from "classnames";
import { TaskListContext } from "@src/contexts/TaskListContext";
import { StatisticsContext } from "@contexts/StatisticsContext";

const SECONDS_IN_MINUTE = 60;
const WORK_SECONDS = 25 * SECONDS_IN_MINUTE;
const BREAK_SECONDS = 5 * SECONDS_IN_MINUTE;
const LONG_BREAK_SECONDS = 30 * SECONDS_IN_MINUTE;
const PLUS_SECONDS = 1 * SECONDS_IN_MINUTE;
const TIMERS_UNTIL_LONG_BREAK = 4;

interface TimerPageProps {
  tasksDone: number;
  onTimerIsUp: () => void;
}

export const TimerPage: FC<TimerPageProps> = ({ tasksDone, onTimerIsUp }) => {
  const [seconds, setSeconds] = useState<number>(WORK_SECONDS);
  const workTimersPassed = useRef<number>(0);
  const [isInit, setIsInit] = useState<boolean>(true);
  const [isPause, setIsPause] = useState<boolean>(true);
  const [isBreak, setIsBreak] = useState<boolean>(false);
  const plusRef = useRef<boolean>(false);
  const timerId = useRef<NodeJS.Timeout | null>(null);
  const { currTask } = useContext(TaskListContext);
  const { stat } = useContext(StatisticsContext);

  useEffect(() => {
    timerId.current = setInterval(() => {
      if (!isPause) {
        setSeconds(seconds => seconds - 1);
      }
    }, 1000);

    return () => {
      if (timerId.current) {
        clearInterval(timerId.current);
      }
    };
  }, [isPause, plusRef.current]);

  useEffect(() => {
    if (seconds <= 0 && !isBreak) {
      workTimersPassed.current += 1;
      onTimerIsUp();
      resetTimer();
    }
  });

  function resetTimer() {
    if (!isBreak) {
      setIsBreak(true);
      if (
        workTimersPassed.current > 0 &&
        workTimersPassed.current % TIMERS_UNTIL_LONG_BREAK === 0
      ) {
        setSeconds(LONG_BREAK_SECONDS);
      } else {
        setSeconds(BREAK_SECONDS);
      }
    }

    if (isBreak) {
      setIsBreak(false);
      setSeconds(WORK_SECONDS);
    }

    setIsInit(true);
    setIsPause(true);
  }

  function handleStartClick() {
    setIsInit(false);
    setIsPause(false);
    if (!isBreak) {
      stat.handleStartWork();
    }
  }

  function handlePauseClick() {
    setIsPause(true);
    if (!isBreak) {
      stat.handleStartPause();
    }
  }

  function handleDoneClick() {
    if (!isBreak) {
      workTimersPassed.current += 1;
      onTimerIsUp();
      stat.handleFinishWork();
    }
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
  if (isBreak) {
    negBtnText = "Пропустить";
  }

  const headerCls = classNames({
    [`${styles.header}`]: true,
    [`${styles.header_pause}`]: isPause && !isInit,
    [`${styles.header_break}`]: isBreak,
  });

  return (
    <div className={styles.timerPage}>
      <div className={headerCls}>
        <span className={styles.title}>{currTask.title}</span>
        <span className={styles.currTaskTimers}>
          Помидор {workTimersPassed.current + 1}
        </span>
      </div>

      <div className={styles.main}>
        <div className={styles.timerBlock}>
          <Timer
            seconds={seconds}
            isPause={isPause}
            isInit={isInit}
            isBreak={isBreak}
          />
          <PlusButton handleClick={handlePlusClick} />
        </div>

        <div className={styles.taskBlock}>
          <span className={styles.taskCounter}>
            Задача {tasksDone + 1}&nbsp;-&nbsp;
          </span>
          <span className={styles.title}>{currTask.title}</span>
        </div>

        <div className={styles.buttonsBlock}>
          <Button
            className={styles.button}
            onClick={posBtnHandleClick}
            isDisabled={currTask.id === -1}
          >
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
