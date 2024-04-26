import { default as React, FC } from "react";
import { IconProps } from "@ui/icons/IconProps";
import classNames from "classnames";
import commonStyles from "../icon.css";
import styles from "./pausecounticon.css";

export const PauseCountIcon: FC<IconProps> = ({ isDisabled }) => {
  const iconCls = classNames({
    [`${commonStyles.icon}`]: true,
    [`${commonStyles.icon_disabled}`]: isDisabled,
    [`${styles.icon}`]: true,
    [`${styles.icon_disabled}`]: isDisabled,
  });

  return (
    <svg
      className={iconCls}
      width="100%"
      height="100%"
      viewBox="0 0 129 129"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M64.3158 118.632C94.3136 118.632 118.632 94.3136 118.632 64.3158C118.632 34.318 94.3136 10 64.3158 10C34.318 10 10 34.318 10 64.3158C10 94.3136 34.318 118.632 64.3158 118.632Z"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M28 27L102 101"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
