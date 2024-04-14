import { default as React, FC } from "react";
import styles from "./content.css";
import { HomeBlock } from "@pages/HomeBlock";
import { Timer } from "@ui/Timer";

export const Content: FC = () => {
  return (
    <div className={styles.content}>
      <HomeBlock />
      <Timer minutes={25} seconds={5} isPause />
    </div>
  );
};
