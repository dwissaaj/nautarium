
"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button, Spinner, Typography } from "@heroui/react";

import KanbanBoard from "./board/kanban-board";
import TaskDrawer from "./board/task-drawer";
import useTasksWorkspace from "./board/use-noteworkspace";

export default function TasksWorkspace() {
  const [isAddDrawerOpen, setIsAddDrawerOpen] = useState(false);

  const {
    tasks,
    isLoading,
    handleDrop,
    saveTask,
    deleteTask,
  } = useTasksWorkspace();

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

          <Typography type="body-sm" className="mt-1 text-default-500">
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
          onSave={saveTask}
          onDelete={deleteTask}
        />
      )}

      <TaskDrawer
        task={null}
        isOpen={isAddDrawerOpen}
        onOpenChange={setIsAddDrawerOpen}
        onSave={saveTask}
      />
    </main>
  );
}
