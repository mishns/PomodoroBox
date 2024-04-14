import { default as React, FC } from "react";
import styles from "./content.css";
import { HomePage } from "@pages/HomePage";

export const Content: FC = () => {
  return (
    <div className={styles.content}>
      <HomePage />
    </div>
  );
};
