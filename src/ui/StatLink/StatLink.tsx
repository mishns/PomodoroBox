import { default as React, FC } from "react";
import styles from "./statlink.css";
import { Link } from "react-router-dom";
import { Icon } from "@common/Icon";
import statIcon from "@assets/img/statistics.svg";

export const StatLink: FC = () => {
  return (
    <Link className={styles.statLink} to="/statistics">
      <Icon className={styles.statIcon} src={statIcon} />
      <span className={styles.statText}>Статистика</span>
    </Link>
  );
};
