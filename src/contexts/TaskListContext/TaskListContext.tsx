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
    taskTitle: "defaultTitle",
    timersCounter: 1,
  },
  taskListActions: {
    handleNewTask: (taskTitle: string) => {},
    handleTaskTimersPlus: (id: number) => {},
    handleTaskTimersMinus: (id: number) => {},
    handleTaskEdit: (id: number, newTitle: string) => {},
    handleTaskDelete: (id: number) => {},
  },
};

export const TaskListContext = createContext(defaultValue);

const tasks: Task[] = [
  { id: 1, taskTitle: "Сверстать", timersCounter: 2 },
  { id: 2, taskTitle: "Доделать!", timersCounter: 1 },
];

export interface TaskListActions {
  handleNewTask: (taskTitle: string) => void;
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

  function createNewTask(taskTitle: string) {
    const lastTaskId = taskList[taskList.length - 1].id;
    const newTask: Task = {
      id: lastTaskId + 1,
      taskTitle,
      timersCounter: 1,
    };
    const newTaskList = [...taskList, newTask];
    setTaskList(newTaskList);
  }

  function handleNewTask(taskTitle: string) {
    createNewTask(taskTitle);
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
      task.taskTitle = newTitle;
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
