import { default as React, FC, useContext } from "react";
import styles from "./taskoptionsmenu.css";
import { TaskOptionsItem } from "@ui/TaskOptionsMenu/TaskOptionsItem";
import classNames from "classnames";
import { TaskListContext } from "@src/contexts/TaskListContext";
import { MinusIcon } from "@ui/icons/MinusIcon";
import { PlusIcon } from "@ui/icons/PlusIcon";
import { EditIcon } from "@ui/icons/EditIcon";
import { DeleteIcon } from "@ui/icons/DeleteIcon";
import { Task } from "@api/Task";

interface TaskOptionsMenuProps {
  currTask: Task;
  isVisible: boolean;
  onEditClick: () => void;
}

export interface TaskMenuOption {
  currTask: Task;
  isDisabled: boolean;
  className: string;
  onClick: () => void;
}

export const TaskOptionsMenu: FC<TaskOptionsMenuProps> = ({
  currTask,
  isVisible,
  onEditClick,
}) => {
  const { taskListActions } = useContext(TaskListContext);

  const menuCls = classNames({
    [`${styles.itemMenu}`]: true,
    [`${styles.visible}`]: isVisible,
  });

  function handlePlusClick() {
    taskListActions.handleTaskTimersPlus(currTask.id);
  }
  function handleMinusClick() {
    if (currTask.timersCounter >= 2) {
      taskListActions.handleTaskTimersMinus(currTask.id);
    }
  }
  function handleEditClick() {
    onEditClick();
  }
  function handleDeleteClick() {
    taskListActions.handleTaskDelete(currTask.id);
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
        icon={<MinusIcon isDisabled={currTask.timersCounter < 2} />}
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
