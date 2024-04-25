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

const statistics: TimersStatistics = generateStat(21);

export const Content: FC = () => {
  return (
    <div className={styles.content}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/statistics"
          element={<StatisticsPage daysStat={statistics} />}
        />
      </Routes>
    </div>
  );
};
