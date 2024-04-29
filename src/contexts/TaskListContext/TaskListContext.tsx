import { Task } from "@api/Task";
import { ConfirmAction } from "@ui/ConfirmAlert";
import {
  default as React,
  FC,
  createContext,
  useState,
  useEffect,
  useRef,
} from "react";

interface TaskListContextValue {
  taskList: Task[];
  currTask: Task;
  taskListActions: TaskListActions;
}

const defaultTask = {
  id: -1,
  title: "Нет задачи",
  timersCounter: 1,
};

const defaultValue: TaskListContextValue = {
  taskList: [],
  currTask: defaultTask,
  taskListActions: {
    handleNewTask: (title: string) => {},
    handleTaskTimersPlus: (id: number) => {},
    handleTaskTimersMinus: (id: number) => {},
    handleTaskEdit: (id: number, newTitle: string) => {},
    handleTaskDelete: (id: number) => {},
  },
};

export const TaskListContext = createContext(defaultValue);

const tasks: Task[] = [
  { id: 1, title: "Сверстать", timersCounter: 2 },
  { id: 2, title: "Доделать!", timersCounter: 1 },
];

export interface TaskListActions {
  handleNewTask: (title: string) => void;
  handleTaskTimersPlus: (id: number) => void;
  handleTaskTimersMinus: (id: number) => void;
  handleTaskEdit: (id: number, newTitle: string) => void;
  handleTaskDelete: (id: number) => void;
}

interface TaskListContextProvider {
  children?: React.ReactNode;
}

type ActionToConfirm = {
  action: () => void;
  confirmText: string;
  confirmBtnText: string;
};
const defaultActionToConfirm: ActionToConfirm = {
  action: () => {},
  confirmText: "",
  confirmBtnText: "",
};

export const TaskListContextProvider: FC<TaskListContextProvider> = ({
  children,
}) => {
  const [taskList, setTaskList] = useState(tasks);
  const [currTask, setCurrTask] = useState<Task>({
    id: 1,
    title: "defaultTitle",
    timersCounter: 1,
  });
  const [isAtConfirm, setIsAtConfirm] = useState(false);
  const actionToConfirm = useRef<ActionToConfirm>(defaultActionToConfirm);

  useEffect(() => {
    if (taskList.length) {
      setCurrTask(taskList[0]);
    } else {
      setCurrTask(defaultTask);
    }
  }, [taskList]);

  function createNewTask(title: string) {
    let lastTaskId = 1;
    if (taskList.length) {
      lastTaskId = taskList[taskList.length - 1].id;
    }
    const newTask: Task = {
      id: lastTaskId + 1,
      title,
      timersCounter: 1,
    };
    const newTaskList = [...taskList, newTask];
    setTaskList(newTaskList);
  }

  function deleteTask(id: number) {
    const newTaskList = taskList.filter(item => item.id != id);
    setTaskList(newTaskList);
  }

  function handleNewTask(title: string) {
    createNewTask(title);
  }

  function handleTaskTimersPlus(id: number) {
    const newTaskList = [...taskList];
    const task = newTaskList.find(item => item.id === id);
    if (task) {
      task.timersCounter++;
      setTaskList(newTaskList);
    }
  }
  function handleTaskTimersMinus(id: number) {
    const newTaskList = [...taskList];
    const task = newTaskList.find(item => item.id === id);
    if (task && task.timersCounter > 0) {
      task.timersCounter--;
      setTaskList(newTaskList);
    }
  }

  function handleTaskEdit(id: number, newTitle: string) {
    const newTaskList = [...taskList];
    const task = newTaskList.find(item => item.id === id);
    if (task && task.timersCounter > 0) {
      task.title = newTitle;
      setTaskList(newTaskList);
    }
  }

  function handleTaskDelete(id: number) {
    actionToConfirm.current = {
      action: () => deleteTask(id),
      confirmText: "Удалить задачу?",
      confirmBtnText: "Удалить",
    };
    setIsAtConfirm(true);
  }

  function handleConfirm(response: boolean) {
    if (response) {
      actionToConfirm.current.action();
    }
    actionToConfirm.current = defaultActionToConfirm;
    setIsAtConfirm(false);
  }

  const taskListActions: TaskListActions = {
    handleNewTask,
    handleTaskTimersPlus,
    handleTaskTimersMinus,
    handleTaskEdit,
    handleTaskDelete,
  };

  const contextValue = {
    taskList,
    currTask,
    taskListActions,
  };

  return (
    <TaskListContext.Provider value={contextValue}>
      {children}
      {isAtConfirm && (
        <ConfirmAction
          confirmText="Удалить задачу?"
          confirmBtnText="Удалить"
          onConfirm={handleConfirm}
        />
      )}
    </TaskListContext.Provider>
  );
};
