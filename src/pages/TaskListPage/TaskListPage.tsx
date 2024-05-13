import { default as React, FC, useContext } from "react";
import styles from "./TaskListPage.css";
import { TaskItem } from "@ui/TaskItem";
import { TaskListContext } from "@src/contexts/TaskListContext";
import { AnimatePresence, motion } from "framer-motion";

export const TaskListPage: FC = () => {
  const { taskList, isTaskListFetchErr, isUpdateTaskErr } =
    useContext(TaskListContext);
  const totalTime =
    taskList.reduce((total, item) => total + item.timersCount, 0) * 25;
  const hours = Math.floor(totalTime / 60);
  const minutes = totalTime % 60;

  return (
    <div className={styles.TaskListPage}>
      <motion.ul layout layoutId={"list"}>
        <AnimatePresence>
          {taskList.map(item => (
            <motion.li
              initial={{ x: -200, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ opacity: 0 }}
              key={item.id}
            >
              <TaskItem key={item.id} task={item} />
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>
      <span className={styles.totalTime}>{`${hours} час ${minutes} мин`}</span>

      {isTaskListFetchErr && (
        <span className={styles.errorMessage}>Ошибка загрузки списка дел</span>
      )}
      {isUpdateTaskErr && (
        <span className={styles.errorMessage}>Ошибка изменения списка дел</span>
      )}
    </div>
  );
};
