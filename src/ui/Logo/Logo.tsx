import { default as React, FC } from "react";
import styles from "./logo.css";
import img from "@assets/img/pomodorobox-logo.svg";

interface LogoProps {}

export const Logo: FC<LogoProps> = () => {
  return (
    <div className={styles.logo}>
      <img className={styles.pomodoroImg} src={img} alt="pomodoro-logo" />
      <span className={styles.pomodoroTitle}>pomodoro_box</span>
    </div>
  );
};
