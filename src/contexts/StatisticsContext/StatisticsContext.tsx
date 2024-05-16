import {
  DayStat,
  fetchCreateDayStat,
  fetchDaysStat,
  Period,
  fetchUpdateDayStat,
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
      mutationFn: (dayStat: IdDayStat) => fetchUpdateDayStat(dayStat),
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
        return fetchCreateDayStat(dayStat);
      },
    },
    queryClient,
  );

  const [statistics, setStatistics] = useState<TimersStatistics>(
    getStatMapFromResponse(daysStat),
  );
  const [todayStat, setTodayStat] = useState<DayStat>(getBlankDay(new Date()));
  const todayStatTemp = useRef<DayStat>(todayStat);
  const workStart = useRef<Date | null>(null);
  const pauseStart = useRef<Date | null>(null);

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
    if (!isDaysStatError) {
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
  }

  function updateTodayPeriods(
    periodsKey: Extract<keyof DayStat, "workPeriods" | "pausePeriods">,
    periodTime: number,
  ) {
    const todayPeriods: Period[] = todayStatTemp.current[
      periodsKey
    ] as Period[];
    updateTodayStat({
      [periodsKey]: [...todayPeriods, { time: periodTime }],
    });
  }

  function handleTimerIsUp() {
    const todayTimers = todayStatTemp.current.timersComplete;
    updateTodayStat({ timersComplete: todayTimers + 1 });
  }

  function handleTaskIsDone() {
    const todayTasks = todayStatTemp.current.tasksComplete;
    updateTodayStat({ tasksComplete: todayTasks + 1 });
  }

  function handleStartWork() {
    workStart.current = new Date();
  }

  function handleFinishWork() {
    if (workStart.current) {
      const workFinish = new Date();
      const periodTime = workFinish.getTime() - workStart.current.getTime();
      updateTodayPeriods("workPeriods", periodTime);
      workStart.current = null;
    }
  }

  function handleStartPause() {
    pauseStart.current = new Date();
  }

  function handleFinishPause() {
    if (pauseStart.current) {
      const pauseFinish = new Date();
      const periodTime = pauseFinish.getTime() - pauseStart.current.getTime();
      updateTodayPeriods("pausePeriods", periodTime);
      pauseStart.current = null;
    }
  }

  const contextValue: StatisticsContextType = {
    statistics,
    todayStat,
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
