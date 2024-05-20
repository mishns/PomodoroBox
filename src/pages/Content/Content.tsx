import { default as React, FC, memo } from "react";
import styles from "./content.css";
import { HomePage } from "@pages/HomePage";
import { Route, Routes } from "react-router-dom";
import { StatisticsPage } from "@pages/StatisticsPage";
import { SettingsPage } from "@pages/SettingsPage";

export const Content: FC = () => {
  const MemoStatisticsPage = memo(StatisticsPage);

  return (
    <div className="container">
      <div className={styles.content}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/statistics" element={<MemoStatisticsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
      </div>
    </div>
  );
};
