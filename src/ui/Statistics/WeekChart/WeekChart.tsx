import { default as React, FC, useState, useEffect } from "react";
import styles from "./weekchart.css";
import { DayBar } from "@ui/Statistics/WeekChart/DayBar";
import { WeekDayStat, WeekStat } from "@pages/StatisticsPage";
import { getShortRuWeekDayStr } from "@constants/*";

function calcDayWorkTime(weekDayStat: WeekDayStat): number {
  const totalWorkTime = weekDayStat.workPeriods
    .map(period => period.time)
    .reduce((totalTime, time) => totalTime + time, 0);
  return totalWorkTime;
}

function calcMinutes(time: number): number {
  const minutes: number = Math.floor((time / (1000 * 60)) % 60);
  return minutes;
}

function fillDayStatArr(weekStat: WeekStat): WeekDayStat[] {
  const weekDays: number[] = [1, 2, 3, 4, 5, 6, 0];
  const weekDayStatArr: WeekDayStat[] = [];
  for (const day of weekDays) {
    weekDayStatArr.push(weekStat.get(day)!);
  }
  return weekDayStatArr;
}

interface WeekChartProps {
  weekStat: WeekStat;
  onBarClick: (weekDay: number) => void;
}

export const WeekChart: FC<WeekChartProps> = ({ weekStat, onBarClick }) => {
  const [dayStatArr, setDayStatArr] = useState<WeekDayStat[]>(
    fillDayStatArr(weekStat),
  );

  useEffect(() => {
    setDayStatArr(fillDayStatArr(weekStat));
  }, [weekStat]);

  function handleDayBarClick(weekDay: number) {
    onBarClick(weekDay);
  }

  return (
    <div className={styles.weekChart}>
      <div className={styles.weekColumns}>
        {dayStatArr.map(weekDayStat => (
          <DayBar
            key={weekDayStat.weekDay}
            value={calcMinutes(calcDayWorkTime(weekDayStat))}
            weekDay={weekDayStat.weekDay}
            dayName={getShortRuWeekDayStr(weekDayStat)}
            isActive={!weekDayStat.isBlank}
            onBarClick={handleDayBarClick}
          />
        ))}
      </div>
      <div className={styles.chartFooter}></div>
    </div>
  );
};
