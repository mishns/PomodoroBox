import { default as React, FC } from "react";
import styles from "./content.css";
import { HomePage } from "@pages/HomePage";
import { Route, Routes } from "react-router-dom";
import { StatisticsPage } from "@pages/StatisticsPage";

export const Content: FC = () => {
  return (
    <div className={styles.content}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/statistics" element={<StatisticsPage data={{}} />} />
      </Routes>
    </div>
  );
};
