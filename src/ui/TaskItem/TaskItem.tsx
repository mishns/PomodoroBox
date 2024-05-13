import { default as React, FC, useState, useContext } from "react";
import styles from "./taskitem.css";
import { TaskOptionsBtn } from "@ui/TaskOptionsBtn";
import { TaskListContext } from "@src/contexts/TaskListContext";
import { useForm } from "react-hook-form";
import classNames from "classnames";
import { Task } from "@api/Task";

interface TaskItemProps {
  task: Task;
}

export const TaskItem: FC<TaskItemProps> = ({ task }) => {
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
    <div className={styles.taskItem}>
      <div className={styles.timersCount}>{task.timersCount}</div>
      <form
        className={itemFormCls}
        onSubmit={handleSubmit(({ titleInput }) => {
          setIsTitleEditable(false);
          taskListActions.handleTaskEdit(task.id, titleInput);
        })}
      >
        <input
          className={styles.titleInput}
          type="text"
          id="title"
          defaultValue={task.title}
          disabled={!isTitleEditable}
          {...register("titleInput")}
        />
      </form>
      <TaskOptionsBtn task={task} onEditClick={handleEditClick} />
    </div>
  );
};
