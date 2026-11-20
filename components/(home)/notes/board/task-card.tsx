"use client";

import { useState } from "react";

import { Button, Typography } from "@heroui/react";

import {
  CalendarDays,
  GripVertical,
  Pencil,
  Trash2,
} from "lucide-react";

import TaskDrawer from "./task-drawer";
import { Task } from "@/app/lib/(home)/notes/notes";

interface TaskCardProps {
  task: Task;
  onDragStart: (event: React.DragEvent<HTMLDivElement>) => void;
  onDragEnd: () => void;
  onSave: (task: Task) => void;
  onDelete: (taskId: string) => void;
}

const priorityStyles: Record<Task["priority"], string> = {
  low: "bg-success/10 text-success border-success/20",
  medium: "bg-warning/10 text-warning border-warning/20",
  high: "bg-danger/10 text-danger border-danger/20",
};

export default function TaskCard({
  task,
  onDragStart,
  onDragEnd,
  onSave,
  onDelete,
}: TaskCardProps) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const formattedDate = new Date(
    `${task.createdAt}T00:00:00`
  ).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

  return (
    <>
      <article
        draggable
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        data-task-id={task.id}
        className="
          group cursor-grab rounded-[1.5rem]
          border border-default-200/70
          bg-background p-5
          shadow-[0_4px_16px_rgba(0,0,0,0.06)]
          transition-all duration-300
          hover:-translate-y-1
          hover:shadow-[0_10px_30px_rgba(0,0,0,0.10)]
          active:cursor-grabbing
        "
      >
        <div className="font-sans mb-4 flex items-center justify-between">
          <Button
            className={`
              inline-flex items-center rounded-full
              border px-8 py-1
              ${priorityStyles[task.priority]}
            `}
          >
            <Typography type="h6" className="font-semibold capitalize">
              {task.priority}
            </Typography>
          </Button>

          <GripVertical className="size-4 text-default-400 opacity-0 transition-opacity group-hover:opacity-100" />
        </div>

        <div className="space-y-2">
          <Typography type="body" className="font-semibold tracking-tight">
            {task.title}
          </Typography>

          <Typography type="body-sm" className="leading-relaxed text-default-500">
            {task.description}
          </Typography>
        </div>

        <div className="mt-5 flex items-center justify-between border-t border-default-100 pt-4">
          <div className="flex items-center gap-1">
            <Button
              isIconOnly
              size="sm"
              variant="ghost"
              aria-label="Edit task"
              onPress={() => setIsDrawerOpen(true)}
              className="text-default-500 hover:text-primary"
            >
              <Pencil className="size-3.5" />
            </Button>

            <Button
              isIconOnly
              size="sm"
              variant="ghost"
              aria-label="Delete task"
              onPress={() => onDelete(task.id)}
              className="text-default-500 hover:text-danger"
            >
              <Trash2 className="size-3.5" />
            </Button>
          </div>

          <div className="flex items-center gap-1.5 text-default-400">
            <CalendarDays className="size-3.5" />

            <Typography type="body-xs">
              {formattedDate}
            </Typography>
          </div>
        </div>
      </article>

      <TaskDrawer
        task={task}
        isOpen={isDrawerOpen}
        onOpenChange={setIsDrawerOpen}
        onSave={onSave}
      />
    </>
  );
}