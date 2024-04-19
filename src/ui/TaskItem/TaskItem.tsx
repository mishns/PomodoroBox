import { default as React, FC, useState, useContext } from "react";
import styles from "./taskitem.css";
import { TaskOptionsBtn } from "@ui/TaskOptionsBtn";
import { TaskListContext } from "@src/contexts/TaskListContext";
import { useForm } from "react-hook-form";
import classNames from "classnames";
import { Task } from "@api/Task";

interface TaskItemProps {
  currTask: Task;
}

export const TaskItem: FC<TaskItemProps> = ({ currTask }) => {
  const [isTitleEditable, setIsTitleEditable] = useState<boolean>(false);
  const { taskListActions } = useContext(TaskListContext);

  function handleEditClick() {
    setIsTitleEditable(!isTitleEditable);
  }

  const { register, handleSubmit } = useForm();

  const itemFormCls = classNames({
    [`${styles.itemForm}`]: true,
    [`${styles.itemForm_editable}`]: isTitleEditable,
  });
  return (
    <li className={styles.taskItem}>
      <div className={styles.timersCount}>{currTask.timersCounter}</div>
      <form
        className={itemFormCls}
        onSubmit={handleSubmit(({ titleInput }) => {
          setIsTitleEditable(false);
          taskListActions.handleTaskEdit(currTask.id, titleInput);
        })}
      >
        <input
          className={styles.titleInput}
          type="text"
          id="title"
          defaultValue={currTask.title}
          disabled={!isTitleEditable}
          {...register("titleInput")}
        />
      </form>
      <TaskOptionsBtn currTask={currTask} onEditClick={handleEditClick} />
    </li>
  );
};
