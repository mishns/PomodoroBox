import { default as React, FC } from "react";
import styles from "./header.css";
import { Logo } from "@ui/Logo";
import { StatLink } from "@ui/StatLink";

export const Header: FC = () => {
  return (
    <header className={styles.header}>
      <Logo />
      <StatLink />
    </header>
  );
};
