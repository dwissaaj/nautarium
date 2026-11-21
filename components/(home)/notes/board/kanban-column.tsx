
"use client";

import { Plus } from "lucide-react";
import { Typography } from "@heroui/react";

import TaskCard from "./task-card";
import type { Task, TaskStatus } from "@/app/lib/(home)/notes/notes";

interface KanbanColumnProps {
  id: TaskStatus;
  title: string;
  tasks: Task[];
  onPointerDown: (
    event: React.PointerEvent<HTMLElement>,
    taskId: string,
  ) => void;
  onSave: (task: Task) => void;
  onDelete: (taskId: string) => void;
}

export default function KanbanColumn({
  id,
  title,
  tasks,
  onPointerDown,
  onSave,
  onDelete,
}: KanbanColumnProps) {
  return (
    <section
      data-column-id={id}
      className="flex min-h-[400px] min-w-0 flex-col rounded-2xl bg-default-50 p-3"
    >
      <div className="mb-4 flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <Typography type="body-sm" className="font-semibold">
            {title}
          </Typography>

          <Typography
            type="body-xs"
            className="rounded-full bg-default-200 px-2 py-0.5 text-default-600"
          >
            {tasks.length}
          </Typography>
        </div>

        <button
          type="button"
          aria-label={`Add task to ${title}`}
          className="rounded-lg p-1.5 text-default-500 transition-colors hover:bg-default-200"
        >
          <Plus className="size-4" />
        </button>
      </div>

      <div className="flex flex-1 flex-col gap-3">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onPointerDown={onPointerDown}
            onSave={onSave}
            onDelete={onDelete}
          />
        ))}

        {tasks.length === 0 && (
          <div className="flex min-h-28 flex-1 items-center justify-center rounded-xl border border-dashed border-default-300 text-xs text-default-400">
            Drop tasks here
          </div>
        )}
      </div>
    </section>
  );
}
