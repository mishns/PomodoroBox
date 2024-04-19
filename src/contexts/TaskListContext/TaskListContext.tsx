import { Task } from "@api/Task";
import { default as React, FC, createContext, useState } from "react";

interface TaskListContextValue {
  taskList: Task[];
  topItem: Task;
  taskListActions: TaskListActions;
}

const defaultValue: TaskListContextValue = {
  taskList: [],
  topItem: {
    id: 1,
    title: "defaultTitle",
    timersCounter: 1,
  },
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

export const TaskListContextProvider: FC<TaskListContextProvider> = ({
  children,
}) => {
  const [taskList, setTaskList] = useState(tasks);

  function createNewTask(title: string) {
    const lastTaskId = taskList[taskList.length - 1].id;
    const newTask: Task = {
      id: lastTaskId + 1,
      title,
      timersCounter: 1,
    };
    const newTaskList = [...taskList, newTask];
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
    const newTaskList = taskList.filter(item => item.id != id);
    setTaskList(newTaskList);
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
    topItem: taskList[0],
    taskListActions,
  };
  return (
    <TaskListContext.Provider value={contextValue}>
      {children}
    </TaskListContext.Provider>
  );
};
