import { default as React, FC, useContext } from "react";
import styles from "./taskoptionsmenu.css";
import { TaskOptionsItem } from "@ui/TaskOptionsMenu/TaskOptionsItem";
import classNames from "classnames";
import { TaskListContext } from "@src/contexts/TaskListContext";
import { Task } from "@api/Task";
import plusOptionIcon from "@assets/img/plus-option.svg";
import minusOptionIcon from "@assets/img/minus-option.svg";
import editOptionIcon from "@assets/img/edit-option.svg";
import deleteOptionIcon from "@assets/img/delete-option.svg";
import { Icon } from "@common/Icon";

interface TaskOptionsMenuProps {
  task: Task;
  isVisible: boolean;
  onEditClick: () => void;
}

export const TaskOptionsMenu: FC<TaskOptionsMenuProps> = ({
  task,
  isVisible,
  onEditClick,
}) => {
  const { taskListActions } = useContext(TaskListContext);

  const menuCls = classNames({
    [`${styles.itemMenu}`]: true,
    [`${styles.visible}`]: isVisible,
  });

  function handlePlusClick() {
    taskListActions.handleTaskTimersPlus(task.id);
  }
  function handleMinusClick() {
    if (task.timersCounter >= 2) {
      taskListActions.handleTaskTimersMinus(task.id);
    }
  }
  function handleEditClick() {
    onEditClick();
  }
  function handleDeleteClick() {
    taskListActions.handleTaskDeleteWithConfirm(task.id);
  }

  const minusOptionIconCls = classNames({
    [`${styles.optionIcon}`]: true,
    [`${styles.optionIcon_disabled}`]: task.timersCounter < 2,
  });

  return (
    <div className={menuCls}>
      <TaskOptionsItem
        text="Добавить"
        icon={<Icon className={styles.optionIcon} src={plusOptionIcon} />}
        onClick={handlePlusClick}
      />
      <TaskOptionsItem
        text="Уменьшить"
        icon={<Icon className={minusOptionIconCls} src={minusOptionIcon} />}
        onClick={handleMinusClick}
      />
      <TaskOptionsItem
        text="Редактировать"
        icon={<Icon className={styles.optionIcon} src={editOptionIcon} />}
        onClick={handleEditClick}
      />
      <TaskOptionsItem
        text="Удалить"
        icon={<Icon className={styles.optionIcon} src={deleteOptionIcon} />}
        onClick={handleDeleteClick}
      />
    </div>
  );
};
