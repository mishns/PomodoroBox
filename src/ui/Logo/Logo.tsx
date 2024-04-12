import { default as React, FC } from "react";
import styles from "./logo.css";

interface LogoProps {}

export const Logo: FC<LogoProps> = () => {
  return <div className={styles.logo}></div>;
};
