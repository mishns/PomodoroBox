import { default as React, FC, useContext, useEffect } from "react";
import styles from "./TaskFormPage.css";
import { Button } from "@ui/Button";
import { useForm } from "react-hook-form";
import { TaskListContext } from "@src/contexts/TaskListContext";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const taskFormSchema = z.object({
  title: z.string().min(1, "Пожалуйста, введите название задачи"),
});
type TaskForm = z.infer<typeof taskFormSchema>;

export const TaskFormPage: FC = () => {
  const { taskListActions } = useContext(TaskListContext);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm<TaskForm>({
    resolver: zodResolver(taskFormSchema),
  });

  useEffect(() => {
    reset();
  }, [isSubmitSuccessful]);

  return (
    <form
      className={styles.taskFormPage}
      onSubmit={handleSubmit(({ title }) => {
        taskListActions.handleNewTask(title);
      })}
    >
      <input
        type="text"
        className={styles.taskInput}
        placeholder="Название задачи"
        {...register("title")}
      />
      {errors.title && (
        <span className={styles.errorMessage}>{errors.title.message}</span>
      )}
      <Button type="submit">Добавить</Button>
    </form>
  );
};
