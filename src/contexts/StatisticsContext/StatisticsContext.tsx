import {
  DayStat,
  createDayStat,
  fetchDaysStat,
  Period,
  updateDayStat,
  IdDayStat,
} from "@api/DayStat";
import { queryClient } from "@api/queryClient";
import { getDayUniqueId } from "@src/utils/getDayUniqueId";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  default as React,
  FC,
  createContext,
  useState,
  useRef,
  useEffect,
} from "react";

export type TimersStatistics = Map<string, DayStat>;
interface StatisticsContextType {
  statistics: TimersStatistics;
  todayStat: DayStat;
  isWorkPeriod: boolean;
  isPausePeriod: boolean;
  isDaysStatError: boolean;
  isStatSaveError: boolean;
  handleStartWork: () => void;
  handleFinishWork: () => void;
  handleStartPause: () => void;
  handleFinishPause: () => void;
  handleTimerIsUp: () => void;
  handleTaskIsDone: () => void;
}
export const StatisticsContext = createContext({} as StatisticsContextType);
interface StatisticsContextProps {
  children?: React.ReactNode;
}

export function getDateStr(date: Date) {
  return date.toLocaleDateString();
}

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

function getStatMapFromResponse(
  statArr: DayStat[] | undefined,
): TimersStatistics {
  if (statArr) {
    return new Map(statArr.map(dayStat => [dayStat.dateStr, dayStat]));
  } else {
    return new Map<string, DayStat>();
  }
}

export const StatisticsContextProvider: FC<StatisticsContextProps> = ({
  children,
}) => {
  const { data: daysStat, isError: isDaysStatError } = useQuery(
    {
      queryKey: ["daysStat"],
      queryFn: fetchDaysStat,
      retry: false,
    },
    queryClient,
  );

  const {
    mutateAsync: updateDayMutateAsync,
    isSuccess: isDayUpdateSuccess,
    isError: isDayUpdateError,
  } = useMutation(
    {
      mutationFn: (dayStat: IdDayStat) => updateDayStat(dayStat),
    },
    queryClient,
  );

  const {
    mutate: createDayMutate,
    isSuccess: isCreateDaySuccess,
    isError: isCreateDayError,
  } = useMutation(
    {
      mutationFn: (dayStat: IdDayStat) => {
        return createDayStat(dayStat);
      },
    },
    queryClient,
  );

  const [statistics, setStatistics] = useState<TimersStatistics>(
    getStatMapFromResponse(daysStat),
  );
  const [todayStat, setTodayStat] = useState<DayStat>(getBlankDay(new Date()));
  const todayStatTemp = useRef<DayStat>(todayStat);

  const [isWorkPeriod, setIsWorkPeriod] = useState(false);
  const workPeriodDates = useRef<Date[]>([]);
  const [isPausePeriod, setIsPausePeriod] = useState(false);
  const pausePeriodDates = useRef<Date[]>([]);

  useEffect(() => {
    setStatistics(getStatMapFromResponse(daysStat));
  }, [daysStat]);

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ["daysStat"] });
  }, [isDayUpdateSuccess, isCreateDaySuccess]);

  useEffect(() => {
    const todayStat = statistics.get(getDateStr(new Date()));
    if (todayStat) {
      setTodayStat(todayStat);
    } else {
      setTodayStat(getBlankDay(new Date()));
    }
  }, [statistics]);

  useEffect(() => {
    todayStatTemp.current = todayStat;
  }, [todayStat]);

  function updateTodayStat(dayStatUpdateObj: Partial<Omit<DayStat, "id">>) {
    const newDayStat = { ...todayStatTemp.current, ...dayStatUpdateObj };
    todayStatTemp.current = newDayStat;
    (async () => {
      const id = getDayUniqueId(new Date());
      try {
        await updateDayMutateAsync({ ...newDayStat, id });
      } catch (error: unknown) {
        const knownError = error as Error;
        if (knownError.message === "404" && !isCreateDaySuccess) {
          createDayMutate({ ...newDayStat, id });
        }
      }
    })();
  }

  function updateTodayPeriods(
    periodsKey: Extract<keyof DayStat, "workPeriods" | "pausePeriods">,
    periodTime: number,
  ) {
    const todayPeriods: Period[] = todayStat[periodsKey] as Period[];
    updateTodayStat({
      [periodsKey]: [...todayPeriods, { time: periodTime }],
    });
  }

  function finishWork() {
    workPeriodDates.current.push(new Date());
    if (workPeriodDates.current.length === 2) {
      const workStart = workPeriodDates.current[0];
      const workFinish = workPeriodDates.current[1];
      const periodTime = workFinish.getTime() - workStart.getTime();
      updateTodayPeriods("workPeriods", periodTime);
      pausePeriodDates.current = [];
    }
    setIsWorkPeriod(false);
  }

  function finishPause() {
    pausePeriodDates.current.push(new Date());
    if (pausePeriodDates.current.length === 2) {
      const pauseStart = pausePeriodDates.current[0];
      const pauseFinish = pausePeriodDates.current[1];
      const periodTime = pauseFinish.getTime() - pauseStart.getTime();
      updateTodayPeriods("pausePeriods", periodTime);
      workPeriodDates.current = [];
    }
    setIsPausePeriod(false);
  }

  function handleTimerIsUp() {
    const todayTimers = todayStat.timersComplete;
    updateTodayStat({ timersComplete: todayTimers + 1 });
  }

  function handleTaskIsDone() {
    const todayTasks = todayStat.tasksComplete;
    updateTodayStat({ tasksComplete: todayTasks + 1 });
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

  const contextValue: StatisticsContextType = {
    statistics,
    todayStat,
    isWorkPeriod,
    isPausePeriod,
    isDaysStatError,
    isStatSaveError: isDayUpdateError && isCreateDayError,
    handleStartWork,
    handleFinishWork,
    handleStartPause,
    handleFinishPause,
    handleTimerIsUp,
    handleTaskIsDone,
  };

  return (
    <StatisticsContext.Provider value={contextValue}>
      {children}
    </StatisticsContext.Provider>
  );
};
