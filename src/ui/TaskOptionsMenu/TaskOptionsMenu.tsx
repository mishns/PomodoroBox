import { default as React, FC, useContext } from "react";
import styles from "./taskoptionsmenu.css";
import plusIcon from "@assets/img/plus-option.svg";
import minusIcon from "@assets/img/minus-option.svg";
import editIcon from "@assets/img/edit-option.svg";
import deleteIcon from "@assets/img/delete-option.svg";
import { TaskOptionsItem } from "@ui/TaskOptionsMenu/TaskOptionsItem";
import classNames from "classnames";
import { TaskListContext } from "@src/contexts/TaskListContext";

interface TaskOptionsMenuProps {
  taskId: number;
  isVisible: boolean;
  onEditClick: () => void;
}

export const TaskOptionsMenu: FC<TaskOptionsMenuProps> = ({
  taskId,
  isVisible,
  onEditClick,
}) => {
  const { taskListActions } = useContext(TaskListContext);

  const menuCls = classNames({
    [`${styles.itemMenu}`]: true,
    [`${styles.visible}`]: isVisible,
  });

  function handlePlusClick() {
    taskListActions.handleTaskTimersPlus(taskId);
  }
  function handleMinusClick() {
    taskListActions.handleTaskTimersMinus(taskId);
  }
  function handleEditClick() {
    onEditClick();
  }
  function handleDeleteClick() {
    taskListActions.handleTaskDelete(taskId);
  }

  return (
    <div className={menuCls}>
      <TaskOptionsItem
        text="Добавить"
        icon={plusIcon}
        onClick={handlePlusClick}
      />
      <TaskOptionsItem
        text="Уменьшить"
        icon={minusIcon}
        onClick={handleMinusClick}
      />
      <TaskOptionsItem
        text="Редактировать"
        icon={editIcon}
        onClick={handleEditClick}
      />
      <TaskOptionsItem
        text="Удалить"
        icon={deleteIcon}
        onClick={handleDeleteClick}
      />
    </div>
  );
};
