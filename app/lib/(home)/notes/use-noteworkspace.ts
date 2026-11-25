"use client";

import type { Task, TaskStatus } from "@/app/lib/(home)/notes/task.dto";

import { useCallback, useEffect, useState } from "react";
import { toast } from "@heroui/react";

import { tasksApi } from "@/app/lib/(home)/notes/task";

function getErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}

export default function useTasksWorkspace() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const selectedTask = tasks.find((task) => task.id === selectedId);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const result = await tasksApi.getAll();

        setTasks(result ?? []);
      } catch (error) {
        toast("Failed to load tasks.", {
          description: getErrorMessage(error),
          variant: "danger",
        });
      } finally {
        setIsLoading(false);
      }
    };

    void loadTasks();
  }, []);

  const handleDrop = useCallback(
    async (taskId: string, status: TaskStatus) => {
      const currentTask = tasks.find((task) => task.id === taskId);

      if (!currentTask || currentTask.status === status) return;

      const updatedTask: Task = {
        ...currentTask,
        status,
      };

      // Optimistic update
      setTasks((current) =>
        current.map((task) => (task.id === taskId ? updatedTask : task)),
      );

      try {
        await tasksApi.update(updatedTask);

        const refreshedTasks = await tasksApi.getAll();

        setTasks(refreshedTasks ?? []);
      } catch (error) {
        // Restore previous status
        setTasks((current) =>
          current.map((task) => (task.id === taskId ? currentTask : task)),
        );

        toast("Failed to update task status.", {
          description: getErrorMessage(error),
          variant: "danger",
        });
      }
    },
    [tasks],
  );

  const saveTask = async (task: Task) => {
    const existingTask = tasks.find((current) => current.id === task.id);

    try {
      if (existingTask) {
        await tasksApi.update(task);

        setTasks((current) =>
          current.map((currentTask) =>
            currentTask.id === task.id ? task : currentTask,
          ),
        );
      } else {
        const createdTask = await tasksApi.create({
          title: task.title,
          description: task.description,
          status: task.status,
          priority: task.priority,
          createdAt: task.createdAt,
        });

        setTasks((current) => [...current, createdTask]);
        setSelectedId(createdTask.id);
      }
    } catch (error) {
      toast("Failed to save task.", {
        description: getErrorMessage(error),
        variant: "danger",
      });
    }
  };

  const deleteTask = async (id: string) => {
    const deletedTask = tasks.find((task) => task.id === id);

    if (!deletedTask) return;

    try {
      await tasksApi.delete(id);

      setTasks((current) => current.filter((task) => task.id !== id));

      if (selectedId === id) {
        setSelectedId(null);
      }
    } catch (error) {
      toast("Failed to delete task.", {
        description: getErrorMessage(error),
        variant: "danger",
      });
     }
  };

  return {
    tasks,
    selectedId,
    selectedTask,
    selectedIdSetter: setSelectedId,
    isLoading,
    handleDrop,
    saveTask,
    deleteTask,
  };
}
