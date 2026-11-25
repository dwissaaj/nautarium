"use client";

import type { Task, TaskStatus } from "@/app/lib/(home)/notes/task.dto";

import { Plus } from "lucide-react";
import { Typography } from "@heroui/react";

import TaskCard from "./task-card";

interface KanbanColumnProps {
  id: TaskStatus;
  title: string;
  tasks: Task[];
  onDrop: (taskId: string, status: TaskStatus) => void;
  onSave: (task: Task) => void;
  onDelete: (taskId: string) => void;
}

export default function KanbanColumn({
  id,
  title,
  tasks,
  onDrop,
  onSave,
  onDelete,
}: KanbanColumnProps) {
  return (
    <section
      className="
  flex min-h-[400px] min-w-0 flex-col
  rounded-2xl bg-default-50 p-3
  border-2 border-default-200
  hover:border-accent
"
      data-column-id={id}
    >
      <div className="mb-4 flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <Typography className="font-semibold" type="body-sm">
            {title}
          </Typography>

          <Typography
            className="rounded-full bg-default-200 px-2 py-0.5 text-default-600"
            type="body-xs"
          >
            {tasks.length}
          </Typography>
        </div>

        <button
          aria-label={`Add task to ${title}`}
          className="rounded-lg p-1.5 text-default-500 transition-colors hover:bg-default-200"
          type="button"
        >
          <Plus className="size-4" />
        </button>
      </div>

      <div className="flex flex-1 flex-col gap-3">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onDelete={onDelete}
            onDrop={onDrop}
            onSave={onSave}
          />
        ))}

        {tasks.length === 0 && (
          <div className="flex min-h-28 flex-1 items-center justify-center rounded-xl border border-dashed border-default text-xs text-default-400">
            Drop tasks here
          </div>
        )}
      </div>
    </section>
  );
}
