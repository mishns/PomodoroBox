import { default as React, FC } from "react";
import styles from "./darkmodetoggle.css";
import useDarkMode from "use-dark-mode";

export const DarkModeToggle: FC = () => {
  const darkMode = useDarkMode(false, { element: document.documentElement });

  return (
    <button className={styles.darkModeToggle} onClick={darkMode.toggle}>
      <svg
        className={styles.darkModeIcon}
        xmlns="http://www.w3.org/2000/svg"
        width="14"
        height="14"
        viewBox="-3 -2 18 18"
        version="1.1"
      >
        <g id="surface1">
          <path
            fill="#FFF"
            d="M 5.25 0.242188 C 5.425781 0.457031 5.453125 0.753906 5.320312 0.992188 C 4.8125 1.921875 4.550781 2.964844 4.550781 4.023438 C 4.550781 7.539062 7.421875 10.390625 10.953125 10.390625 C 11.417969 10.386719 11.863281 10.339844 12.296875 10.25 C 12.566406 10.191406 12.84375 10.300781 13.003906 10.523438 C 13.175781 10.761719 13.164062 11.082031 12.976562 11.308594 C 11.589844 13.015625 9.503906 14.003906 7.300781 14 C 3.265625 14 0 10.75 0 6.746094 C 0 3.734375 1.851562 1.148438 4.484375 0.0507812 C 4.753906 -0.0625 5.066406 0.015625 5.25 0.242188 M 4.25 1.148438 C 2.1875 2.253906 0.898438 4.40625 0.898438 6.746094 C 0.898438 10.265625 3.765625 13.113281 7.300781 13.113281 C 9.011719 13.117188 10.652344 12.433594 11.855469 11.222656 C 11.558594 11.257812 11.261719 11.277344 10.953125 11.277344 C 6.921875 11.277344 3.65625 8.027344 3.65625 4.023438 C 3.65625 3 3.867188 2.027344 4.25 1.148438 "
          />
        </g>
      </svg>
    </button>
  );
};
