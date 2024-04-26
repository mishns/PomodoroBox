import { default as React, FC } from "react";
import styles from "./content.css";
import { HomePage } from "@pages/HomePage";
import { Route, Routes } from "react-router-dom";
import { StatisticsPage } from "@pages/StatisticsPage";
import { generateStat } from "@src/utils/generateStat";

export interface WorkPeriod {
  time: number;
}

export interface PausePeriod {
  time: number;
}

export interface DayStat {
  dateStr: string;
  weekDay: number;
  workPeriods: WorkPeriod[];
  pausePeriods: PausePeriod[];
  timersComplete: number;
}

export type TimersStatistics = Map<string, DayStat>;

// const statistics: TimersStatistics = generateStat(21);
const statistics: TimersStatistics = new Map<string, DayStat>();

const today = new Date();
const todayStr = today.toLocaleDateString();
const todayWeekDay = today.getDay();
statistics.set(todayStr, {
  dateStr: todayStr,
  weekDay: todayWeekDay,
  workPeriods: [{ time: 1500000 * 2 }],
  pausePeriods: [{ time: 1500000 }],
  timersComplete: 2,
});

export const Content: FC = () => {
  return (
    <div className="container">
      <div className={styles.content}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/statistics"
            element={<StatisticsPage daysStat={statistics} />}
          />
        </Routes>
      </div>
    </div>
  );
};
