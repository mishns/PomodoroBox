import { default as React, FC, useContext } from "react";
import styles from "./taskoptionsmenu.css";
import { TaskOptionsItem } from "@ui/TaskOptionsMenu/TaskOptionsItem";
import classNames from "classnames";
import { TaskListContext } from "@src/contexts/TaskListContext";
import { MinusIcon } from "@ui/icons/MinusIcon";
import { PlusIcon } from "@ui/icons/PlusIcon";
import { EditIcon } from "@ui/icons/EditIcon";
import { DeleteIcon } from "@ui/icons/DeleteIcon";

interface TaskOptionsMenuProps {
  taskId: number;
  isVisible: boolean;
  onEditClick: () => void;
}

export interface TaskMenuOption {
  isDisabled: boolean;
  className: string;
  onClick: () => void;
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
        icon={<PlusIcon />}
        onClick={handlePlusClick}
      />
      <TaskOptionsItem
        text="Уменьшить"
        icon={<MinusIcon />}
        onClick={handleMinusClick}
      />
      <TaskOptionsItem
        text="Редактировать"
        icon={<EditIcon />}
        onClick={handleEditClick}
      />
      <TaskOptionsItem
        text="Удалить"
        icon={<DeleteIcon />}
        onClick={handleDeleteClick}
      />
    </div>
  );
};
