import { default as React, FC } from "react";
import styles from "./settingslink.css";
import { Link } from "react-router-dom";
import { Icon } from "@common/Icon";
import settingsIcon from "@assets/img/settings.svg";

export const SettingsLink: FC = () => {
  return (
    <Link className={styles.settingsLink} to={"/settings"}>
      <Icon className={styles.settingsIcon} src={settingsIcon} />
    </Link>
  );
};
