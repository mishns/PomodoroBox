import { default as React, FC, useState, useRef, useEffect } from "react";
import {
  DayStat,
  PausePeriod,
  TimersStatistics,
  WorkPeriod,
} from "@pages/Content";
import { DayTotalTime } from "@ui/Statistics/DayTotalTime";
import { TimersComplete } from "@ui/Statistics/TimersComplete";
import { WeekChart } from "@ui/Statistics/WeekChart";
import { FocusRate } from "@ui/Statistics/FocusRate";
import { PauseTime } from "@ui/Statistics/PauseTime";
import { PauseCount } from "@ui/Statistics/PauseCount";
import { Dropdown, DropdownOptionList } from "@ui/Dropdown";
import styles from "./statisticspage.css";
import { minusOneDay } from "@src/utils";
import { getFullRuWeekDayStr, getWeekDayFromStr } from "@constants/*";

function calcMinutes(time: number): number {
  const minutes = Math.floor(time / 60000);
  return minutes;
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
  const focus = Math.floor((pauseTime / workTime) * 100);
  return Math.min(focus, 100);
}

function getBlankWeekDayStat(date: Date): WeekDayStat {
  const dateStr = date.toLocaleDateString();
  const weekDay = date.getDay();
  return {
    dateStr,
    weekDay,
    workPeriods: [],
    pausePeriods: [],
    timersComplete: 0,
    isBlank: true,
  };
}

function getBlankWeekStat(date: Date) {
  const weekStat: WeekStat = new Map<number, WeekDayStat>();

  const currDay: Date = new Date(date.getTime());
  while (currDay.getDay() != 0) {
    const weekDay: number = currDay.getDay();
    weekStat.set(weekDay, getBlankWeekDayStat(currDay));
    currDay.setDate(currDay.getDate() - 1);
  }

  currDay.setDate(date.getDay() + 1);

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
  workPeriods: WorkPeriod[];
  pausePeriods: PausePeriod[];
  timersComplete: number;
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
        currSearchDate.toLocaleDateString(),
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

interface StatisticsPageProps {
  daysStat: TimersStatistics;
}

export const StatisticsPage: FC<StatisticsPageProps> = ({ daysStat }) => {
  console.log(calcMinutes(60000000));

  const weeksStat = useRef<WeekStat[]>(getWeeksStat(daysStat));

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
  const dayPauseTime = calcDayPauseTime(currWeekDayStat);
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
            minutes={calcMinutes(dayWorkTime)}
          />
          <TimersComplete timersCount={dayTimersComplete} />
        </div>
        <WeekChart weekStat={currWeek} onBarClick={handleBarClick} />
      </div>

      <div className={styles.focusRates}>
        <FocusRate focusRate={dayFocus} />
        <PauseTime pauseTime={calcMinutes(dayPauseTime)} />
        <PauseCount pauseCount={dayPauseCount} />
      </div>
    </div>
  );
};
