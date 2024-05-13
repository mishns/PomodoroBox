import { validateResponse } from "@api/validateResponse";
import { API_URL, DEV_COOKIES_HEADERS } from "@constants/*";
import { z } from "zod";

const TASK_LIST_API = API_URL + "/tasks";

export const taskSchema = z.object({
  id: z.number(),
  title: z.string(),
  timersCount: z.number(),
});
export type Task = z.infer<typeof taskSchema>;
export type NewTask = Omit<Task, "id">;

export const taskListSchema = z.array(taskSchema);
export type TaskList = z.infer<typeof taskListSchema>;

export function fetchTaskList(): Promise<TaskList> {
  return fetch(`${TASK_LIST_API}`, DEV_COOKIES_HEADERS)
    .then(validateResponse)
    .then(response => response.json())
    .then(data => taskListSchema.parse(data));
}

export const fetchCreateTaskResp = z.object({ id: z.number() });
export type FetchCreateTaskResp = z.infer<typeof fetchCreateTaskResp>;
export function fetchCreateTask(
  newTask: NewTask,
): Promise<FetchCreateTaskResp> {
  return fetch(`${TASK_LIST_API}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newTask),
    ...DEV_COOKIES_HEADERS,
  })
    .then(validateResponse)
    .then(response => response.json())
    .then(data => fetchCreateTaskResp.parse(data));
}

export function fetchUpdateTask(task: Task) {
  return fetch(`${TASK_LIST_API}/${task.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
    ...DEV_COOKIES_HEADERS,
  }).then(validateResponse);
}

export function fetchDeleteTask(taskId: number) {
  return fetch(`${TASK_LIST_API}/${taskId}`, {
    method: "DELETE",
    ...DEV_COOKIES_HEADERS,
  }).then(validateResponse);
}
