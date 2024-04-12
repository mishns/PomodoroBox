import { default as React, FC } from "react";
import styles from "./content.css";

interface ContentProps {
  children: React.ReactNode;
}

export const Content: FC<ContentProps> = ({ children }) => {
  return <div className={styles.content}>{children}</div>;
};
