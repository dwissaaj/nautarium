import { invoke } from "@tauri-apps/api/core";
import { CreateTaskInput, Task, UpdateTaskInput } from "./notes";



export const tasksApi = {
  // READ: Get all tasks
  getAll: (): Promise<Task[]> => {
    return invoke<Task[]>("get_tasks");
  },

  // CREATE: Create a new task
  create: (task: CreateTaskInput): Promise<Task> => {
    return invoke<Task>("create_task", {
      title: task.title,
      description: task.description,
      status: task.status,
      priority: task.priority,
      createdAt: task.createdAt,
    });
  },

  // UPDATE: Update an existing task
  update: (task: UpdateTaskInput): Promise<void> => {
    return invoke<void>("update_task", {
      id: task.id,
      title: task.title,
      description: task.description,
      status: task.status,
      priority: task.priority,
      createdAt: task.createdAt,
    });
  },

  // DELETE: Delete a task
  delete: (id: string): Promise<void> => {
    return invoke<void>("delete_task", { id });
  },
};