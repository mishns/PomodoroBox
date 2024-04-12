import { default as React, FC } from "react";
import styles from "./logo.css";
import logoImg from "@assets/img/pomodorobox-logo.svg";

export const Logo: FC = () => {
  return (
    <div className={styles.logo}>
      <img className={styles.pomodoroImg} src={logoImg} alt="pomodoro-logo" />
      <span className={styles.pomodoroTitle}>pomodoro_box</span>
    </div>
  );
};
