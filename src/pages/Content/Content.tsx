import { default as React, FC, useEffect, useContext, memo } from "react";
import styles from "./content.css";
import { HomePage } from "@pages/HomePage";
import { Route, Routes, useLocation } from "react-router-dom";
import { StatisticsPage } from "@pages/StatisticsPage";
import { StatisticsContext } from "@contexts/StatisticsContext";

export const Content: FC = () => {
  const { stat } = useContext(StatisticsContext);

  const location = useLocation();
  useEffect(() => {
    if (stat.isWorkPeriod) {
      stat.handleFinishWork();
    }
    if (stat.isPausePeriod) {
      stat.handleFinishPause();
    }
  }, [location.pathname]);

  const MemoStatisticsPage = memo(StatisticsPage);

  return (
    <div className="container">
      <div className={styles.content}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/statistics" element={<MemoStatisticsPage />} />
        </Routes>
      </div>
    </div>
  );
};
