"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button, Spinner, Typography } from "@heroui/react";

import useTasksWorkspace from "../../../../app/lib/(home)/notes/use-noteworkspace";

import KanbanBoard from "./kanban-board";
import TaskDrawer from "./task-drawer";

export default function TasksWorkspace() {
  const [isAddDrawerOpen, setIsAddDrawerOpen] = useState(false);

  const { tasks, isLoading, handleDrop, saveTask, deleteTask } =
    useTasksWorkspace();

  return (
    <main className="space-y-6 p-6">
      <header className="flex items-center justify-between">
        <div>
          <Typography
            className="text-2xl font-semibold tracking-tight"
            type="h2"
          >
            Tasks
          </Typography>

          <Typography className="mt-1 text-default-500" type="body-sm">
            Organize and track your work.
          </Typography>
        </div>

        <Button
          className="bg-foreground text-background"
          onPress={() => setIsAddDrawerOpen(true)}
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
          onDelete={deleteTask}
          onDrop={handleDrop}
          onSave={saveTask}
        />
      )}

      <TaskDrawer
        isOpen={isAddDrawerOpen}
        task={null}
        onOpenChange={setIsAddDrawerOpen}
        onSave={saveTask}
      />
    </main>
  );
}
