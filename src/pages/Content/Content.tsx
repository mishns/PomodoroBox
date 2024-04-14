import { default as React, FC } from "react";
import styles from "./content.css";
import { HomeBlock } from "@pages/HomeBlock";
import { TimerPage } from "@pages/TimerPage";

export const Content: FC = () => {
  return (
    <div className={styles.content}>
      <HomeBlock />
      <TimerPage taskTitle="Сверстать сайт" taskCounter={1} timerCounter={2} />
    </div>
  );
};
