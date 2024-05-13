import {
  default as React,
  FC,
  useState,
  useEffect,
  useRef,
  useContext,
} from "react";
import styles from "./timerpage.css";
import notifSound from "@src/audio/notification-sound.mp3";
import { Timer } from "@ui/Timer";
import { PlusButton } from "@ui/PlusButton";
import { Button } from "@common/Button";
import classNames from "classnames";
import { TaskListContext } from "@src/contexts/TaskListContext";
import { StatisticsContext } from "@contexts/StatisticsContext";
import { SettingsContext } from "@contexts/SettingsContext";
import { SECONDS_IN_MINUTE } from "@constants/*";
import { Alert } from "@common/Alert";
import useLocalStorageState from "use-local-storage-state";

const PLUS_SECONDS = 1 * SECONDS_IN_MINUTE;

export const TimerPage: FC = () => {
  const { currTask, taskListActions } = useContext(TaskListContext);
  const stat = useContext(StatisticsContext);
  const { todayStat } = stat;
  const settings = useContext(SettingsContext);
  const [timersRemain, setTimersRemain] = useState(currTask.timersCount);

  const [seconds, setSeconds] = useLocalStorageState<number>("seconds", {
    defaultValue: settings.workSeconds,
  });
  const [isInit, setIsInit] = useLocalStorageState<boolean>("isInit", {
    defaultValue: true,
  });
  const [isPause, setIsPause] = useState<boolean>(true);
  const [isBreak, setIsBreak] = useLocalStorageState<boolean>("isBreak", {
    defaultValue: false,
  });
  const [isUserDistracted, setIsUserDistracted] = useLocalStorageState<boolean>(
    "isUserDistracted",
    { defaultValue: false },
  );
  const [isAtAlert, setIsAtAlert] = useState<boolean>(false);

  const plusRef = useRef<boolean>(false);
  const timerId = useRef<NodeJS.Timeout | null>(null);
  const notifPlayerRef = useRef<HTMLAudioElement>(null);

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
    if (seconds < 0) {
      resetTimer();
      if (!isBreak) {
        taskListActions.handleTimerIsUp();
        if (!isUserDistracted) {
          stat.handleTimerIsUp();
        }
        if (timersRemain <= 1) {
          stat.handleTaskIsDone();
        }
      }
      if (settings.isNotifOn) {
        playNotifSound();
        setIsAtAlert(true);
      }
    }
  });

  useEffect(() => {
    setTimersRemain(currTask.timersCount);
  }, [currTask.timersCount]);

  function resetTimer() {
    if (!isBreak) {
      setIsBreak(true);
      if (
        todayStat.timersComplete > 0 &&
        todayStat.timersComplete % settings.timersUntilLongBreak === 0
      ) {
        setSeconds(settings.longBreakSeconds);
      } else {
        setSeconds(settings.breakSeconds);
      }
    }

    if (isBreak) {
      setIsBreak(false);
      setSeconds(settings.workSeconds);
    }

    setIsInit(true);
    setIsPause(true);
    setIsUserDistracted(false);
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
    setIsUserDistracted(true);
    if (!isBreak) {
      stat.handleStartPause();
    }
  }

  function handleDoneClick() {
    if (!isBreak) {
      taskListActions.handleTimerIsUp();
      stat.handleFinishWork();
      if (timersRemain <= 1) {
        stat.handleTaskIsDone();
      }
    }
    resetTimer();
  }

  function handlePlusClick() {
    setSeconds(seconds + PLUS_SECONDS);
    plusRef.current = plusRef!.current;
  }

  function playNotifSound() {
    if (notifPlayerRef.current) {
      notifPlayerRef.current.play();
    }
  }

  function handleAlertConfirm() {
    setIsAtAlert(false);
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
          Помидор {todayStat.timersComplete + 1}
        </span>
      </div>

      <div className={styles.mainBlock}>
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
            Задача {todayStat.tasksComplete + 1}&nbsp;-&nbsp;
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

      <audio ref={notifPlayerRef} src={notifSound} />
      {isAtAlert && (
        <Alert
          confirmText={
            !isBreak ? "Время перерыва истекло" : "Время работы истекло"
          }
          onConfirm={handleAlertConfirm}
        />
      )}
      {stat.isStatSaveError && (
        <span className={styles.errorMessage}>
          Ошибка сохранения статистики
        </span>
      )}
    </div>
  );
};
