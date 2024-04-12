import { default as React, FC } from "react";
import styles from "./container.css";

interface ContainerProps {
  children?: React.ReactNode;
}

export const Container: FC<ContainerProps> = ({ children }) => {
  return <div className={styles.container}>{children}</div>;
};
