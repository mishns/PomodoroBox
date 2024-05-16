import { default as React, FC, useState, useEffect, useContext } from "react";
import { TimersStatistics } from "@src/contexts/StatisticsContext";
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
import { DayStat, Period } from "@api/DayStat";
import { getDayUniqueId } from "@src/utils/getDayUniqueId";

export type WeekDayStat = {
  id: number;
  date: Date;
  weekDay: number;
  workPeriods: Period[];
  pausePeriods: Period[];
  timersComplete: number;
  tasksComplete: number;
  isBlank: boolean;
};

export type WeekStat = Map<number, WeekDayStat>;

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
  return {
    id: getDayUniqueId(date),
    date,
    weekDay: date.getDay(),
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
    currDay = minusOneDay(currDay);
  }

  currDay = new Date(date);
  currDay = plusOneDay(currDay);

  while (currDay.getDay() != 1) {
    const weekDay: number = currDay.getDay();
    weekStat.set(weekDay, getBlankWeekDayStat(currDay));
    currDay = plusOneDay(currDay);
  }

  return weekStat;
}

function getWeeksStat(statMap: TimersStatistics): WeekStat[] {
  const weekStatArr: WeekStat[] = [];
  let currSearchDate = new Date();

  for (let week = 0; week < 3; week++) {
    let weekStat: WeekStat = new Map<number, WeekDayStat>();
    if (week === 0) {
      weekStat = getBlankWeekStat(currSearchDate);
    }

    for (let day = 0; day < 7; day++) {
      const dayStat: DayStat | undefined = statMap.get(
        getDayUniqueId(currSearchDate),
      );
      if (dayStat) {
        weekStat.set(dayStat.date.getDay(), {
          ...dayStat,
          weekDay: dayStat.date.getDay(),
          isBlank: false,
        });
      } else {
        const blankDayStat = getBlankWeekDayStat(currSearchDate);
        weekStat.set(blankDayStat.date.getDay(), blankDayStat);
      }

      currSearchDate = minusOneDay(currSearchDate);
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
  const stat = useContext(StatisticsContext);
  const [weeksStat, setWeeksStat] = useState<WeekStat[]>(
    getWeeksStat(stat.statistics),
  );
  const [currWeek, setCurrWeek] = useState<WeekStat>(weeksStat[0]);
  const [currWeekDayStat, setCurrWeekDayStat] = useState<WeekDayStat>(
    weeksStat[0].get(getWeekDayFromStr("Понедельник"))!,
  );

  useEffect(() => {
    setWeeksStat(getWeeksStat(stat.statistics));
  }, [stat.statistics]);

  useEffect(() => {
    setCurrWeek(weeksStat[0]);
  }, [weeksStat]);

  useEffect(() => {
    const weekDay: number = getWeekDayFromStr("Понедельник");
    setCurrWeekDayStat(currWeek!.get(weekDay)!);
  }, [currWeek]);

  function handleCurrentWeekSelect() {
    setCurrWeek(weeksStat[0]);
  }
  function handlePrevWeekSelect() {
    setCurrWeek(weeksStat[1]);
  }
  function handleThirdWeekSelect() {
    setCurrWeek(weeksStat[2]);
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
        {stat.isDaysStatError && (
          <span className={styles.errorMessage}>
            Ошибка загрузки статистики
          </span>
        )}
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
          weekDay={currWeekDayStat.date.getDay()}
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
