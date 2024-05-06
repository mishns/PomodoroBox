import { default as React, FC } from "react";
import styles from "./darkmodetoggle.css";
import useDarkMode from "use-dark-mode";
import { Icon } from "@common/Icon";
import moonIcon from "@assets/img/moon.svg";

export const DarkModeToggle: FC = () => {
  const darkMode = useDarkMode(false, { element: document.documentElement });

  return (
    <button className={styles.darkModeToggle} onClick={darkMode.toggle}>
      <Icon className={styles.darkModeIcon} src={moonIcon} />
    </button>
  );
};
