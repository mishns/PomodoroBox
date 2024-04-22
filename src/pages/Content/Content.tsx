import { default as React, FC } from "react";
import styles from "./content.css";
import { HomePage } from "@pages/HomePage";
import { Route, Routes } from "react-router-dom";
import { StatisticsPage } from "@pages/StatisticsPage";

export interface WorkPeriod {
  time: number;
}

export interface PausePeriod {
  time: number;
}

export type TimersStatistics = Map<
  string,
  {
    workPeriods: WorkPeriod[];
    pausePeriods: PausePeriod[];
    timersComplete: number;
  }
>;

const statistics: TimersStatistics = new Map([
  [
    "today",
    {
      workPeriods: [{ time: 5 }],
      pausePeriods: [{ time: 6 }],
      timersComplete: 7,
    },
  ],
]);

export const Content: FC = () => {
  return (
    <div className={styles.content}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/statistics"
          element={<StatisticsPage data={statistics} />}
        />
      </Routes>
    </div>
  );
};
