import { default as React, FC } from "react";
import styles from "./logo.css";
import logoImg from "@assets/img/pomodorobox-logo.svg";
import { Link } from "react-router-dom";

export const Logo: FC = () => {
  return (
    <Link className={styles.logo} to="/">
      <img className={styles.pomodoroImg} src={logoImg} alt="pomodoro-logo" />
      <span className={styles.pomodoroTitle}>pomodoro_box</span>
    </Link>
  );
};
