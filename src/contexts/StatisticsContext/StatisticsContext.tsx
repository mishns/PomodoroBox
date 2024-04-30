import {
  default as React,
  FC,
  createContext,
  useState,
  useRef,
  MutableRefObject,
} from "react";

function getDateStr(date: Date) {
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
  };
  return blankDay;
}

interface StatisticsContextType {
  stat: {
    statistics: TimersStatistics;
    isWorkPeriod: boolean;
    isPausePeriod: boolean;
    handleStartWork: () => void;
    handleFinishWork: () => void;
    handleStartPause: () => void;
    handleFinishPause: () => void;
    handleTimerIsUp: () => void;
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
  const [isWorkPeriod, setIsWorkPeriod] = useState(false);
  const workPeriodDates = useRef<Date[]>([]);
  const [isPausePeriod, setIsPausePeriod] = useState(false);
  const pausePeriodDates = useRef<Date[]>([]);

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
      newDayStat.timersComplete++;
    } else {
      newDayStat = getBlankDay(today);
    }
    statistics.current.set(todayStr, newDayStat);
  }

  const contextValue: StatisticsContextType = {
    stat: {
      statistics: statistics.current,
      isWorkPeriod: isWorkPeriod,
      isPausePeriod: isPausePeriod,
      handleStartWork,
      handleFinishWork,
      handleStartPause,
      handleFinishPause,
      handleTimerIsUp,
    },
  };

  return (
    <StatisticsContext.Provider value={contextValue}>
      {children}
    </StatisticsContext.Provider>
  );
};
