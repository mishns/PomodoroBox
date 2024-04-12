import { default as React, FC } from "react";
import styles from "./content.css";
import { Button } from "@ui/Button";

export const Content: FC = () => {
  return (
    <div className={styles.content}>
      <Button>Удалить</Button>
    </div>
  );
};
