import { default as React, FC } from "react";
import styles from "./headerpage.css";
import { Logo } from "@ui/Logo";
import { StatLink } from "@ui/StatLink";

export const HeaderPage: FC = () => {
  return (
    <header className={styles.header}>
      <Logo />
      <StatLink />
    </header>
  );
};
