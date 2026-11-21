
"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";

import type { Task, TaskStatus } from "@/app/lib/(home)/notes/notes";
import { tasksApi } from "@/app/lib/(home)/notes/task";

export default function useTasksWorkspace() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const tasksRef = useRef<Task[]>([]);
  const draggedTaskRef = useRef<string | null>(null);

  const selectedTask = tasks.find((task) => task.id === selectedId);

  const updateTasks = useCallback(
    (updater: (current: Task[]) => Task[]) => {
      const next = updater(tasksRef.current);
      tasksRef.current = next;
      setTasks(next);
    },
    [],
  );

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const result = await tasksApi.getAll();

        tasksRef.current = result ?? [];
        setTasks(result ?? []);
      } catch (error) {
        console.error("Failed to load tasks:", error);
      } finally {
        setIsLoading(false);
      }
    };

    void loadTasks();
  }, []);

  const handlePointerDown = (
    event: ReactPointerEvent<HTMLElement>,
    taskId: string,
  ) => {
    if (event.button !== 0) return;

    event.preventDefault();

    draggedTaskRef.current = taskId;
    setSelectedId(taskId);
  };

  const handleDrop = useCallback(
    async (taskId: string, status: TaskStatus) => {
      const currentTask = tasksRef.current.find(
        (task) => task.id === taskId,
      );

      if (!currentTask || currentTask.status === status) return;

      const updatedTask: Task = {
        ...currentTask,
        status,
      };

      updateTasks((current) =>
        current.map((task) =>
          task.id === taskId ? updatedTask : task,
        ),
      );

      try {
        await tasksApi.update(updatedTask);

        const refreshedTasks = await tasksApi.getAll();

        tasksRef.current = refreshedTasks ?? [];
        setTasks(refreshedTasks ?? []);
      } catch (error) {
        console.error("Failed to move task:", error);

        updateTasks((current) =>
          current.map((task) =>
            task.id === taskId ? currentTask : task,
          ),
        );
      }
    },
    [updateTasks],
  );

  // POINTER DROP DETECTION
  useEffect(() => {
    const handlePointerUp = (event: PointerEvent) => {
      const taskId = draggedTaskRef.current;

      if (!taskId) return;

      const target = document.elementFromPoint(
        event.clientX,
        event.clientY,
      );

      const column = target?.closest<HTMLElement>("[data-column-id]");

      const newStatus = column?.dataset.columnId as
        | TaskStatus
        | undefined;

      draggedTaskRef.current = null;

      if (newStatus) {
        void handleDrop(taskId, newStatus);
      }
    };

    const handlePointerCancel = () => {
      draggedTaskRef.current = null;
    };

    window.addEventListener("pointerup", handlePointerUp);
    window.addEventListener("pointercancel", handlePointerCancel);

    return () => {
      window.removeEventListener("pointerup", handlePointerUp);
      window.removeEventListener("pointercancel", handlePointerCancel);
    };
  }, [handleDrop]);

  const saveTask = async (task: Task) => {
    const existingTask = tasksRef.current.find(
      (current) => current.id === task.id,
    );

    try {
      if (existingTask) {
        await tasksApi.update(task);

        updateTasks((current) =>
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

        updateTasks((current) => [...current, createdTask]);
        setSelectedId(createdTask.id);
      }
    } catch (error) {
      console.error("Failed to save task:", error);
    }
  };

  const deleteTask = async (id: string) => {
    const deletedTask = tasksRef.current.find(
      (task) => task.id === id,
    );

    if (!deletedTask) return;

    try {
      await tasksApi.delete(id);

      updateTasks((current) =>
        current.filter((task) => task.id !== id),
      );

      if (selectedId === id) {
        setSelectedId(null);
      }
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  };

  return {
    tasks,
    selectedId,
    selectedTask,
    selectedIdSetter: setSelectedId,
    isLoading,
    updateTasks,
    handlePointerDown,
    saveTask,
    deleteTask,
  };
}
