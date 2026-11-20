"use client";

import { useEffect, useRef, useState } from "react";
import { animate } from "animejs";
import { Plus } from "lucide-react";
import { Button, Spinner, Typography } from "@heroui/react";

import KanbanBoard from "./kanban-board";
import TaskDrawer from "./task-drawer";
import { Task, TaskStatus } from "@/app/lib/(home)/notes/notes";
import { tasksApi } from "@/app/lib/(home)/notes/task";



export default function TasksWorkspace() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isAddDrawerOpen, setIsAddDrawerOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const draggedTask = useRef<string | null>(null);

  // LOAD TASKS FROM DUCKDB
  useEffect(() => {
    const loadTasks = async () => {
  try {
    const data = await tasksApi.getAll();

    // Don't render any tasks when the database is empty.
    setTasks(data ?? []);
  } catch (error) {
    console.error("Failed to load tasks:", error);
    setTasks([]);
  } finally {
    setIsLoading(false);
  }
};

    loadTasks();
  }, []);

  function handleDragStart(
    event: React.DragEvent<HTMLDivElement>,
    taskId: string
  ) {
    draggedTask.current = taskId;
    event.currentTarget.setAttribute("data-dragging", "true");
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData("text/plain", taskId);
  }

  function handleDragEnd() {
    draggedTask.current = null;

    document.querySelectorAll("[data-dragging='true']").forEach((element) => {
      element.removeAttribute("data-dragging");
    });
  }

  async function handleDrop(taskId: string, status: TaskStatus) {
    const currentTask = tasks.find((task) => task.id === taskId);

    if (!currentTask || currentTask.status === status) return;

    const updatedTask = {
      ...currentTask,
      status,
    };

    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskId ? updatedTask : task
      )
    );

    const element = document.querySelector(
      `[data-task-id="${taskId}"]`
    );

    if (element) {
      requestAnimationFrame(() => {
        animate(element, {
          translateY: [8, 0],
          opacity: [0.5, 1],
          duration: 300,
          ease: "out(3)",
        });
      });
    }

    try {
      await tasksApi.update(updatedTask);
    } catch (error) {
      console.error("Failed to update task status:", error);

      setTasks((currentTasks) =>
        currentTasks.map((task) =>
          task.id === taskId ? currentTask : task
        )
      );
    }
  }

  async function handleSaveTask(updatedTask: Task) {
    const existingTask = tasks.find(
      (task) => task.id === updatedTask.id
    );

    setTasks((currentTasks) => {
      if (existingTask) {
        return currentTasks.map((task) =>
          task.id === updatedTask.id ? updatedTask : task
        );
      }

      return [...currentTasks, updatedTask];
    });

    try {
      if (existingTask) {
        await tasksApi.update(updatedTask);
      } else {
        await tasksApi.create({
          title: updatedTask.title,
          description: updatedTask.description,
          status: updatedTask.status,
          priority: updatedTask.priority,
          createdAt: updatedTask.createdAt,
        });
      }
    } catch (error) {
      console.error("Failed to save task:", error);

      setTasks((currentTasks) => {
        if (existingTask) {
          return currentTasks.map((task) =>
            task.id === updatedTask.id ? existingTask : task
          );
        }

        return currentTasks.filter(
          (task) => task.id !== updatedTask.id
        );
      });
    }
  }

  async function handleDeleteTask(taskId: string) {
    const deletedTask = tasks.find(
      (task) => task.id === taskId
    );

    if (!deletedTask) return;

    setTasks((currentTasks) =>
      currentTasks.filter((task) => task.id !== taskId)
    );

    try {
      await tasksApi.delete(taskId);
    } catch (error) {
      console.error("Failed to delete task:", error);

      setTasks((currentTasks) => [
        ...currentTasks,
        deletedTask,
      ]);
    }
  }

  return (
    <main className="space-y-6 p-6">
      <header className="flex items-center justify-between">
        <div>
          <Typography
            type="h2"
            className="text-2xl font-semibold tracking-tight"
          >
            Tasks
          </Typography>

          <Typography
            type="body-sm"
            className="mt-1 text-default-500"
          >
            Organize and track your work.
          </Typography>
        </div>

        <Button
          onPress={() => setIsAddDrawerOpen(true)}
          className="bg-foreground text-background"
        >
          <Plus className="size-4" />
          Add task
        </Button>
      </header>

      {isLoading ? (
        <div className="flex min-h-64 items-center justify-center">
          <Spinner />
        </div>
      ) : (
        <KanbanBoard
          tasks={tasks}
          onDrop={handleDrop}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          onSave={handleSaveTask}
          onDelete={handleDeleteTask}
        />
      )}

      <TaskDrawer
        task={null}
        isOpen={isAddDrawerOpen}
        onOpenChange={setIsAddDrawerOpen}
        onSave={handleSaveTask}
      />
    </main>
  );
}