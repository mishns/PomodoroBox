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

function calcMinutes(ms: number): number {
  const minutes: number = Math.floor(ms / (1000 * 60));
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
  weekDay: number;
  onBarClick: (weekDay: number) => void;
}

export const WeekChart: FC<WeekChartProps> = ({
  weekStat,
  weekDay,
  onBarClick,
}) => {
  const [dayStatArr, setDayStatArr] = useState<WeekDayStat[]>(
    fillDayStatArr(weekStat),
  );
  const [currWeekDay, setCurrWeekDay] = useState(weekDay);

  useEffect(() => {
    setDayStatArr(fillDayStatArr(weekStat));
  }, [weekStat]);

  useEffect(() => {
    setCurrWeekDay(weekDay);
  }, [weekDay]);

  function handleDayBarClick(weekDay: number) {
    setCurrWeekDay(weekDay);
    onBarClick(weekDay);
  }

  const timeMarks = ["25 мин", "50 мин", "1 ч 15 мин", "1 ч 40 мин"];

  return (
    <div className={styles.weekChart}>
      <div className={styles.chartMarks}>
        <div className={styles.space}></div>

        {timeMarks.reverse().map((timeMark, index) => (
          <div className={styles.division} key={index}>
            <div className={styles.mark}>
              <hr className={styles.line} />
              <div className={styles.markValue}>{timeMark}</div>
            </div>
            <div className={styles.space}></div>
          </div>
        ))}
      </div>

      <div className={styles.weekColumns}>
        {dayStatArr.map(weekDayStat => (
          <DayBar
            key={weekDayStat.weekDay}
            minutes={calcMinutes(calcDayWorkTime(weekDayStat))}
            weekDay={weekDayStat.weekDay}
            dayName={getShortRuWeekDayStr(weekDayStat)}
            isActive={weekDayStat.weekDay === currWeekDay}
            onBarClick={handleDayBarClick}
          />
        ))}
      </div>
      <div className={styles.chartFooter}></div>
    </div>
  );
};
