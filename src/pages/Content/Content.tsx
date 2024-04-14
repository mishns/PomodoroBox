import { default as React, FC } from "react";
import styles from "./content.css";
import { HomeBlock } from "@pages/HomeBlock";

export const Content: FC = () => {
  return (
    <div className={styles.content}>
      <HomeBlock />
    </div>
  );
};
