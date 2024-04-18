import { default as React, FC, useState, useContext } from "react";
import styles from "./taskitem.css";
import { TaskOptionsBtn } from "@ui/TaskOptionsBtn";
import { TaskListContext } from "@src/contexts/TaskListContext";
import { useForm } from "react-hook-form";
import classNames from "classnames";

interface TaskItemProps {
  taskId: number;
  counter: number;
  title: string;
}

export const TaskItem: FC<TaskItemProps> = ({ taskId, counter, title }) => {
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
      <div className={styles.counter}>{counter}</div>
      <form
        className={itemFormCls}
        onSubmit={handleSubmit(({ titleInput }) => {
          setIsTitleEditable(false);
          taskListActions.handleTaskEdit(taskId, titleInput);
        })}
      >
        <input
          className={styles.titleInput}
          type="text"
          id="title"
          defaultValue={title}
          disabled={!isTitleEditable}
          {...register("titleInput")}
        />
      </form>
      <TaskOptionsBtn taskId={taskId} onEditClick={handleEditClick} />
    </li>
  );
};
