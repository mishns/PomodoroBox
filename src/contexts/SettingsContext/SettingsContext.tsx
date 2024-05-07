import { default as React, FC, createContext, useState } from "react";
import { SECONDS_IN_MINUTE } from "@constants/*";

// const WORK_SECONDS = 25 * SECONDS_IN_MINUTE;
const WORK_SECONDS = 2;
const BREAK_SECONDS = 5 * SECONDS_IN_MINUTE;
const LONG_BREAK_SECONDS = 30 * SECONDS_IN_MINUTE;
const TIMERS_UNTIL_LONG_BREAK = 4;
const IS_NOTIFICATIONS_ON = true;

interface SettingsContextI {
  workSeconds: number;
  breakSeconds: number;
  longBreakSeconds: number;
  timersUntilLongBreak: number;
  isNotifOn: boolean;
  handleSetWorkSeconds: (seconds: number) => void;
  handleSetBreakSeconds: (seconds: number) => void;
  handleSetLongBreakSeconds: (seconds: number) => void;
  handleSetTimersUntilLongBreak: (timersNum: number) => void;
  handleSetIsNotifOn: (isOn: boolean) => void;
  handleReset: () => void;
}

export const SettingsContext = createContext({} as SettingsContextI);

interface SettingsContextProps {
  children?: React.ReactNode;
}

export const SettingsContextProvider: FC<SettingsContextProps> = ({
  children,
}) => {
  const [workSeconds, setWorkSeconds] = useState(WORK_SECONDS);
  const [breakSeconds, setBreakSeconds] = useState(BREAK_SECONDS);
  const [longBreakSeconds, setLongBreakSeconds] = useState(LONG_BREAK_SECONDS);
  const [timersUntilLongBreak, setTimersUntilLongBreak] = useState(
    TIMERS_UNTIL_LONG_BREAK,
  );
  const [isNotifOn, setIsNotifOn] = useState(true);

  function handleSetWorkSeconds(seconds: number) {
    setWorkSeconds(Math.max(SECONDS_IN_MINUTE, seconds));
  }
  function handleSetBreakSeconds(seconds: number) {
    setBreakSeconds(Math.max(SECONDS_IN_MINUTE, seconds));
  }
  function handleSetLongBreakSeconds(seconds: number) {
    setLongBreakSeconds(Math.max(SECONDS_IN_MINUTE, seconds));
  }
  function handleSetTimersUntilLongBreak(timersNum: number) {
    setTimersUntilLongBreak(Math.max(0, timersNum));
  }
  function handleSetIsNotifOn(isOn: boolean) {
    setIsNotifOn(isOn);
  }

  function handleReset() {
    setWorkSeconds(WORK_SECONDS);
    setBreakSeconds(BREAK_SECONDS);
    setLongBreakSeconds(LONG_BREAK_SECONDS);
    setTimersUntilLongBreak(TIMERS_UNTIL_LONG_BREAK);
    setIsNotifOn(IS_NOTIFICATIONS_ON);
  }

  const settingsContextValue: SettingsContextI = {
    workSeconds,
    breakSeconds,
    longBreakSeconds,
    timersUntilLongBreak,
    isNotifOn,
    handleSetWorkSeconds,
    handleSetBreakSeconds,
    handleSetLongBreakSeconds,
    handleSetTimersUntilLongBreak,
    handleSetIsNotifOn,
    handleReset,
  };

  return (
    <SettingsContext.Provider value={settingsContextValue}>
      {children}
    </SettingsContext.Provider>
  );
};
