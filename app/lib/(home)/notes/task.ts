import type { CreateTaskInput, Task, UpdateTaskInput } from "./task.dto";

import { invoke } from "@tauri-apps/api/core";

export const tasksApi = {
  getAll: async (): Promise<Task[]> => {
    return await invoke<Task[]>("get_tasks");
  },

  create: async (task: CreateTaskInput): Promise<Task> => {
    return await invoke<Task>("create_task", {
      title: task.title,
      description: task.description,
      status: task.status,
      priority: task.priority,
      createdAt: task.createdAt,
    });
  },

  update: async (task: UpdateTaskInput): Promise<void> => {
    await invoke<void>("update_task", {
      id: task.id,
      title: task.title,
      description: task.description,
      status: task.status,
      priority: task.priority,
      createdAt: task.createdAt,
    });
  },

  delete: async (id: string): Promise<void> => {
    await invoke<void>("delete_task", { id });
  },
};
