import {
  default as React,
  FC,
  createContext,
  useState,
  useRef,
  MutableRefObject,
} from "react";

export function getDateStr(date: Date) {
  return date.toLocaleDateString();
}

export interface Period {
  time: number;
}

export interface DayStat {
  dateStr: string;
  weekDay: number;
  workPeriods: Period[];
  pausePeriods: Period[];
  timersComplete: number;
  tasksComplete: number;
}

export type TimersStatistics = Map<string, DayStat>;

function getBlankDay(date: Date): DayStat {
  const dateStr = getDateStr(date);
  const dateWeekDay = date.getDay();
  const blankDay: DayStat = {
    dateStr: dateStr,
    weekDay: dateWeekDay,
    workPeriods: [],
    pausePeriods: [],
    timersComplete: 0,
    tasksComplete: 0,
  };
  return blankDay;
}

interface StatisticsContextType {
  stat: {
    statistics: TimersStatistics;
    todayStat: DayStat;
    isWorkPeriod: boolean;
    isPausePeriod: boolean;
    handleStartWork: () => void;
    handleFinishWork: () => void;
    handleStartPause: () => void;
    handleFinishPause: () => void;
    handleTimerIsUp: () => void;
    handleTaskIsDone: () => void;
  };
}

export const StatisticsContext = createContext({} as StatisticsContextType);

interface StatisticsContextProps {
  children?: React.ReactNode;
}

export const StatisticsContextProvider: FC<StatisticsContextProps> = ({
  children,
}) => {
  const statistics = useRef<TimersStatistics>(new Map<string, DayStat>());
  const [todayStat, setTodayStat] = useState<DayStat>(getTodayStat);
  const [isWorkPeriod, setIsWorkPeriod] = useState(false);
  const workPeriodDates = useRef<Date[]>([]);
  const [isPausePeriod, setIsPausePeriod] = useState(false);
  const pausePeriodDates = useRef<Date[]>([]);

  function getTodayStat(): DayStat {
    const today: Date = new Date();
    const todayStr: string = getDateStr(today);
    const currDayStat: DayStat | undefined = statistics.current.get(todayStr);
    if (currDayStat) {
      return currDayStat;
    } else {
      const blankDay = getBlankDay(today);
      return blankDay;
    }
  }

  function addNewPeriod(
    periodDates: MutableRefObject<Date[]>,
    periodsKey: "workPeriods" | "pausePeriods",
  ) {
    if (periodDates.current.length === 2) {
      const periodStart = periodDates.current[0];
      const periodFinish = periodDates.current[1];
      const periodTime = periodFinish.getTime() - periodStart.getTime();

      const today: Date = new Date();
      const todayStr: string = getDateStr(today);

      let newDayStat: DayStat = {} as DayStat;
      const currDayStat: DayStat | undefined = statistics.current.get(todayStr);

      if (currDayStat) {
        const periods: Period[] = currDayStat[
          periodsKey as keyof DayStat
        ] as Period[];
        newDayStat = {
          ...currDayStat,
          [periodsKey]: [...periods, { time: periodTime }],
        };
      } else {
        const blankToday = getBlankDay(today);
        newDayStat = {
          ...blankToday,
          [periodsKey]: [{ time: periodTime }],
        };
      }

      statistics.current.set(todayStr, newDayStat);
    }
    periodDates.current = [];
  }

  function handleStartWork() {
    if (isPausePeriod) {
      finishPause();
    }
    if (!isWorkPeriod) {
      workPeriodDates.current.push(new Date());
      setIsPausePeriod(false);
      setIsWorkPeriod(true);
    }
  }

  function handleFinishWork() {
    finishWork();
  }

  function finishWork() {
    workPeriodDates.current.push(new Date());
    addNewPeriod(workPeriodDates, "workPeriods");
    setIsWorkPeriod(false);
  }

  function handleStartPause() {
    if (isWorkPeriod) {
      finishWork();
    }
    if (!isPausePeriod) {
      pausePeriodDates.current.push(new Date());
      setIsWorkPeriod(false);
      setIsPausePeriod(true);
    }
  }

  function handleFinishPause() {
    finishPause();
  }

  function finishPause() {
    pausePeriodDates.current.push(new Date());
    addNewPeriod(pausePeriodDates, "pausePeriods");
    setIsPausePeriod(false);
  }

  function handleTimerIsUp() {
    const today: Date = new Date();
    const todayStr: string = getDateStr(today);

    let newDayStat: DayStat = {} as DayStat;
    const currDayStat: DayStat | undefined = statistics.current.get(todayStr);

    if (currDayStat) {
      newDayStat = { ...currDayStat };
    } else {
      newDayStat = getBlankDay(today);
    }
    newDayStat.timersComplete++;
    statistics.current.set(todayStr, newDayStat);
    setTodayStat(newDayStat);
  }

  function handleTaskIsDone() {
    const today: Date = new Date();
    const todayStr: string = getDateStr(today);

    let newDayStat: DayStat = {} as DayStat;
    const currDayStat: DayStat | undefined = statistics.current.get(todayStr);

    if (currDayStat) {
      newDayStat = { ...currDayStat };
    } else {
      newDayStat = getBlankDay(today);
    }
    newDayStat.tasksComplete++;
    statistics.current.set(todayStr, newDayStat);
    setTodayStat(newDayStat);
  }

  const contextValue: StatisticsContextType = {
    stat: {
      statistics: statistics.current,
      isWorkPeriod: isWorkPeriod,
      isPausePeriod: isPausePeriod,
      todayStat,
      handleStartWork,
      handleFinishWork,
      handleStartPause,
      handleFinishPause,
      handleTimerIsUp,
      handleTaskIsDone,
    },
  };

  return (
    <StatisticsContext.Provider value={contextValue}>
      {children}
    </StatisticsContext.Provider>
  );
};
