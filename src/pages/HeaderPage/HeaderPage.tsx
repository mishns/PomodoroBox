import { default as React, FC } from "react";
import styles from "./headerpage.css";
import { Logo } from "@ui/Logo";
import { StatLink } from "@ui/StatLink";
import classNames from "classnames";

const headerCls = classNames({
  container: true,
  [`${styles.headerContainer}`]: true,
});

export const HeaderPage: FC = () => {
  return (
    <header className={styles.header}>
      <div className={headerCls}>
        <Logo />
        <StatLink />
      </div>
    </header>
  );
};
