import { default as React, FC } from "react";
import styles from "./instruction.css";

export const Instruction: FC = () => {
  return (
    <div className={styles.instruction}>
      <h2 className={styles.instructionHeader}>
        Ура! Теперь можно начать работать:
      </h2>
      <ul className={styles.stageList}>
        <li className={styles.stage}>
          Выберите категорию и напишите название текущей задачи
        </li>
        <li className={styles.stage}>
          Запустите таймер (&laquo;помидор&raquo;)
        </li>
        <li className={styles.stage}>
          Работайте пока &laquo;помидор&raquo; не&nbsp;прозвонит
        </li>
        <li className={styles.stage}>
          Сделайте короткий перерыв (3-5&nbsp;минут)
        </li>
        <li className={styles.stage}>
          Продолжайте работать &laquo;помидор&raquo;
          за&nbsp;&laquo;помидором&raquo;, пока задача не&nbsp;будут выполнена.
          Каждые 4&nbsp;&laquo;помидора&raquo; делайте длинный перерыв
          (15-30&nbsp;минут).
        </li>
        <li className={styles.stage}>
          Если Вы&nbsp;прервете работу таймера, &laquo;помидор&raquo;
          не&nbsp;будет засчитан.
        </li>
      </ul>
    </div>
  );
};
