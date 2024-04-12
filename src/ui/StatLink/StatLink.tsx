import { default as React, FC } from "react";
import styles from "./statlink.css";
import statImg from "@assets/img/statistics.svg";

export const StatLink: FC = () => {
  return (
    <div className={styles.statLink}>
      <img className={styles.statImg} src={statImg} alt="" />
      <span className={styles.statText}>Статистика</span>
    </div>
  );
};
