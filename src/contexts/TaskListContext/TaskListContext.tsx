import { queryClient } from "@api/queryClient";
import {
  fetchCreateTask,
  fetchDeleteTask,
  fetchTaskList,
  fetchUpdateTask,
  NewTask,
  Task,
  TaskList,
} from "@api/Task";
import { ConfirmAction } from "@common/ConfirmAlert";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  default as React,
  FC,
  createContext,
  useState,
  useEffect,
  useRef,
} from "react";

export interface TaskListActions {
  handleNewTask: (title: string) => void;
  handleTaskTimersPlus: (id: number) => void;
  handleTaskTimersMinus: (id: number) => void;
  handleTaskEdit: (id: number, newTitle: string) => void;
  handleTaskDelete: (id: number) => void;
  handleTaskDeleteWithConfirm: (id: number) => void;
  handleTimerIsUp: () => void;
}

interface TaskListContextValue {
  taskList: Task[];
  currTask: Task;
  taskListActions: TaskListActions;
  isTaskListFetchErr: boolean;
  isUpdateTaskErr: boolean;
}

interface TaskListContextProvider {
  children?: React.ReactNode;
}
const defaultTask: Task = {
  id: -1,
  title: "Нет задачи",
  timersCount: 1,
};

export const TaskListContext = createContext({} as TaskListContextValue);

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
  const {
    mutate: deleteTaskMutate,
    isSuccess: isDeleteTaskSucc,
    isError: isDeleteTaskErr,
  } = useMutation(
    {
      mutationFn: (taskId: number) => fetchDeleteTask(taskId),
    },
    queryClient,
  );
  const {
    mutate: updateTaskMutate,
    isSuccess: isUpdateTaskSucc,
    isError: isUpdateTaskErr,
  } = useMutation(
    {
      mutationFn: (task: Task) => fetchUpdateTask(task),
    },
    queryClient,
  );
  const {
    mutate: createTaskMutate,
    isSuccess: isCreateTaskSucc,
    isError: isCreateTaskErr,
  } = useMutation(
    {
      mutationFn: (newTask: NewTask) => fetchCreateTask(newTask),
    },
    queryClient,
  );

  const { data: taskListResp, isError: isTaskListFetchErr } = useQuery(
    {
      queryFn: fetchTaskList,
      queryKey: ["taskList"],
    },
    queryClient,
  );
  const [taskList, setTaskList] = useState<TaskList>(taskListResp || []);
  const [currTask, setCurrTask] = useState<Task>(defaultTask);
  const [isAtConfirm, setIsAtConfirm] = useState(false);
  const actionToConfirm = useRef<ActionToConfirm>(defaultActionToConfirm);

  useEffect(() => {
    setTaskList(taskListResp || []);
  }, [taskListResp]);

  useEffect(() => {
    if (taskList.length > 0) {
      setCurrTask({ ...currTask, timersCount: currTask.timersCount + 1 });
      setCurrTask(taskList[0]);
    } else {
      setCurrTask(defaultTask);
    }
  }, [taskList]);

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ["taskList"] });
  }, [isUpdateTaskSucc, isDeleteTaskSucc, isCreateTaskSucc]);

  function updateTask(task: Task) {
    updateTaskMutate(task);
  }

  function handleTimerIsUp() {
    if (currTask.timersCount <= 1) {
      deleteTask(currTask.id);
    } else {
      taskTimersMinus(currTask.id);
    }
  }

  function createNewTask(title: string) {
    const newTask: NewTask = {
      title,
      timersCount: 1,
    };
    createTaskMutate(newTask);
  }

  function deleteTask(id: number) {
    deleteTaskMutate(id);
  }

  function handleNewTask(title: string) {
    createNewTask(title);
  }

  function taskTimersPlus(id: number) {
    const task = taskList.find(task => task.id === id);
    if (task) {
      task.timersCount++;
      updateTask(task);
    }
  }
  function taskTimersMinus(id: number) {
    const task = taskList.find(task => task.id === id);
    if (task && task.timersCount > 1) {
      task.timersCount--;
      updateTask(task);
    }
  }

  function handleTaskTimersPlus(taskId: number) {
    taskTimersPlus(taskId);
  }
  function handleTaskTimersMinus(taskId: number) {
    taskTimersMinus(taskId);
  }

  function handleTaskEdit(id: number, newTitle: string) {
    const task = taskList.find(task => task.id === id);
    if (task) {
      updateTask({ ...task, title: newTitle });
    }
  }

  function handleTaskDelete(id: number) {
    deleteTask(id);
  }

  function handleTaskDeleteWithConfirm(id: number) {
    actionToConfirm.current = {
      action: () => deleteTask(id),
      confirmText: "Удалить задачу?",
      confirmBtnText: "Удалить",
    };
    setIsAtConfirm(true);
  }

  function handleActionConfirm() {
    actionToConfirm.current.action();
    actionToConfirm.current = defaultActionToConfirm;
    setIsAtConfirm(false);
  }

  function handleActionCancel() {
    actionToConfirm.current = defaultActionToConfirm;
    setIsAtConfirm(false);
  }

  const taskListActions: TaskListActions = {
    handleNewTask,
    handleTaskEdit,
    handleTaskDelete,
    handleTaskDeleteWithConfirm,
    handleTaskTimersPlus,
    handleTaskTimersMinus,
    handleTimerIsUp,
  };

  const contextValue = {
    taskList,
    currTask,
    taskListActions,
    isTaskListFetchErr,
    isUpdateTaskErr: isCreateTaskErr || isUpdateTaskErr || isDeleteTaskErr,
  };

  return (
    <TaskListContext.Provider value={contextValue}>
      {children}
      {isAtConfirm && (
        <ConfirmAction
          confirmText={actionToConfirm.current.confirmText}
          confirmBtnText={actionToConfirm.current.confirmBtnText}
          onConfirm={handleActionConfirm}
          onCancel={handleActionCancel}
        />
      )}
    </TaskListContext.Provider>
  );
};
