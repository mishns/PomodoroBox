import {
  default as React,
  FC,
  useState,
  useRef,
  useEffect,
  useContext,
} from "react";
import {
  DayStat,
  getDateStr,
  Period,
  TimersStatistics,
} from "@src/contexts/StatisticsContext";
import { DayTotalTime } from "@ui/Statistics/DayTotalTime";
import { TimersComplete } from "@ui/Statistics/TimersComplete";
import { WeekChart } from "@ui/Statistics/WeekChart";
import { FocusRate } from "@ui/Statistics/FocusRate";
import { PauseTime } from "@ui/Statistics/PauseTime";
import { PauseCount } from "@ui/Statistics/PauseCount";
import { Dropdown, DropdownOptionList } from "@common/Dropdown";
import { minusOneDay } from "@src/utils";
import { getFullRuWeekDayStr, getWeekDayFromStr } from "@constants/*";
import styles from "./statisticspage.css";
import { plusOneDay } from "@src/utils/plusOneDay";
import { StatisticsContext } from "@src/contexts/StatisticsContext";

function calcHoursMinutesFromMs(ms: number) {
  const hours = Math.floor((ms / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((ms / (1000 * 60)) % 60);
  return { hours, minutes };
}

function calcDayWorkTime(weekDayStat: WeekDayStat): number {
  const totalWorkTime = weekDayStat.workPeriods
    .map(period => period.time)
    .reduce((totalTime, time) => totalTime + time, 0);
  return totalWorkTime;
}

function calcDayPauseTime(weekDayStat: WeekDayStat): number {
  const totalPauseTime = weekDayStat.pausePeriods
    .map(period => period.time)
    .reduce((totalTime, time) => totalTime + time, 0);
  return totalPauseTime;
}

function calcFocus(workTime: number, pauseTime: number): number {
  if (workTime === 0) {
    return 0;
  }
  const focus = Math.floor((workTime / (workTime + pauseTime)) * 100);
  return Math.max(focus, 0);
}

function getBlankWeekDayStat(date: Date): WeekDayStat {
  const dateStr = getDateStr(date);
  const weekDay = date.getDay();
  return {
    dateStr,
    weekDay,
    workPeriods: [],
    pausePeriods: [],
    timersComplete: 0,
    tasksComplete: 0,
    isBlank: true,
  };
}

function getBlankWeekStat(date: Date) {
  const weekStat: WeekStat = new Map<number, WeekDayStat>();

  let currDay: Date = new Date(date);

  while (currDay.getDay() != 0) {
    const weekDay: number = currDay.getDay();
    weekStat.set(weekDay, getBlankWeekDayStat(currDay));
    currDay.setDate(currDay.getDate() - 1);
  }

  currDay = new Date(date);
  plusOneDay(currDay);

  while (currDay.getDay() != 1) {
    const weekDay: number = currDay.getDay();
    weekStat.set(weekDay, getBlankWeekDayStat(currDay));
    currDay.setDate(currDay.getDate() + 1);
  }

  return weekStat;
}

export type WeekDayStat = {
  dateStr: string;
  weekDay: number;
  workPeriods: Period[];
  pausePeriods: Period[];
  timersComplete: number;
  tasksComplete: number;
  isBlank: boolean;
};

export type WeekStat = Map<number, WeekDayStat>;

function getWeeksStat(statMap: TimersStatistics): WeekStat[] {
  const weekStatArr: WeekStat[] = [];
  const currSearchDate = new Date();

  for (let week = 0; week < 3; week++) {
    let weekStat: WeekStat = new Map<number, WeekDayStat>();
    if (week === 0) {
      weekStat = getBlankWeekStat(currSearchDate);
    }

    for (let day = 0; day < 7; day++) {
      const dayStat: DayStat | undefined = statMap.get(
        getDateStr(currSearchDate),
      );
      if (dayStat) {
        weekStat.set(dayStat.weekDay, { ...dayStat, isBlank: false });
      } else {
        const blankDayStat = getBlankWeekDayStat(currSearchDate);
        weekStat.set(blankDayStat.weekDay, blankDayStat);
      }

      minusOneDay(currSearchDate);
      //check if curr date is sunday
      if (currSearchDate.getDay() === 0) {
        break;
      }
    }
    weekStatArr.push(weekStat);
  }

  return weekStatArr;
}

export const StatisticsPage: FC = () => {
  const {
    stat: { statistics },
  } = useContext(StatisticsContext);
  const weeksStat = useRef<WeekStat[]>(getWeeksStat(statistics));
  const [currWeek, setCurrWeek] = useState<WeekStat>(weeksStat.current[0]);
  const [currWeekDayStat, setCurrWeekDayStat] = useState<WeekDayStat>(
    weeksStat.current[0].get(getWeekDayFromStr("Понедельник"))!,
  );

  useEffect(() => {
    const weekDay: number = getWeekDayFromStr("Понедельник");
    setCurrWeekDayStat(currWeek!.get(weekDay)!);
  }, [currWeek]);

  function handleCurrentWeekSelect() {
    setCurrWeek(weeksStat.current[0]);
  }
  function handlePrevWeekSelect() {
    setCurrWeek(weeksStat.current[1]);
  }
  function handleThirdWeekSelect() {
    setCurrWeek(weeksStat.current[2]);
  }

  function handleBarClick(weekDay: number) {
    setCurrWeekDayStat(currWeek.get(weekDay)!);
  }

  const dropdownOptionList: DropdownOptionList = [
    { optionName: "Эта неделя", onOptionSelect: handleCurrentWeekSelect },
    { optionName: "Прошедшая неделя", onOptionSelect: handlePrevWeekSelect },
    { optionName: "2 недели назад", onOptionSelect: handleThirdWeekSelect },
  ];

  const dayWorkTime = calcDayWorkTime(currWeekDayStat);
  const { hours: dayWorkTimeHours, minutes: dayWorkTimeMinutes } =
    calcHoursMinutesFromMs(dayWorkTime);
  const dayPauseTime = calcDayPauseTime(currWeekDayStat);
  const { hours: dayPauseTimeHours, minutes: dayPauseTimeMinutes } =
    calcHoursMinutesFromMs(dayPauseTime);
  const dayFocus = calcFocus(dayWorkTime, dayPauseTime);
  const dayPauseCount = currWeekDayStat.pausePeriods.length;
  const dayTimersComplete = currWeekDayStat.timersComplete;

  return (
    <div className={styles.statisticsPage}>
      <div className={styles.headerBlock}>
        <h1 className={styles.header}>Ваша активность</h1>
        <Dropdown
          optionList={dropdownOptionList}
          initValue={dropdownOptionList[0].optionName}
        />
      </div>

      <div className={styles.activityBlock}>
        <div className={styles.dayActivity}>
          <DayTotalTime
            day={getFullRuWeekDayStr(currWeekDayStat)}
            hours={dayWorkTimeHours}
            minutes={dayWorkTimeMinutes}
            isBlank={currWeekDayStat.isBlank}
          />
          <TimersComplete
            timersCount={dayTimersComplete}
            isBlank={currWeekDayStat.isBlank}
          />
        </div>
        <WeekChart
          weekStat={currWeek}
          weekDay={currWeekDayStat.weekDay}
          onBarClick={handleBarClick}
        />
      </div>

      <div className={styles.focusRates}>
        <FocusRate focusRate={dayFocus} isBlank={currWeekDayStat.isBlank} />
        <PauseTime
          hours={dayPauseTimeHours}
          minutes={dayPauseTimeMinutes}
          isBlank={currWeekDayStat.isBlank}
        />
        <PauseCount
          pauseCount={dayPauseCount}
          isBlank={currWeekDayStat.isBlank}
        />
      </div>
    </div>
  );
};
