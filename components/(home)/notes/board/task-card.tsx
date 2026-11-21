"use client";

import type { Task, TaskStatus } from "@/app/lib/(home)/notes/notes";

import { useEffect, useRef, useState } from "react";
import { createDraggable } from "animejs";
import { Button, Typography } from "@heroui/react";
import { CalendarDays, GripVertical, Pencil, Trash2 } from "lucide-react";

import TaskDrawer from "./task-drawer";

interface TaskCardProps {
  task: Task;
  onDrop: (taskId: string, status: TaskStatus) => void;
  onDelete: (taskId: string) => void;
  onSave: (task: Task) => void;
}

const priorityStyles: Record<Task["priority"], string> = {
  low: "bg-success/10 text-success border-success/20",
  medium: "bg-warning/10 text-warning border-warning/20",
  high: "bg-danger/10 text-danger border-danger/20",
};

const validStatuses: TaskStatus[] = ["todo", "in-progress", "done"];

function formatTaskDate(value: string): string {
  if (!value) return "—";

  const match = /^(\d{4})-(\d{2})-(\d{2})/.exec(value);

  const date = match
    ? new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]))
    : new Date(value);

  if (Number.isNaN(date.getTime())) return "—";

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

export default function TaskCard({
  task,
  onDrop,
  onDelete,
  onSave,
}: TaskCardProps) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const cardRef = useRef<HTMLElement | null>(null);
  const dragHandleRef = useRef<HTMLSpanElement | null>(null);

  const formattedDate = formatTaskDate(task.createdAt);

  useEffect(() => {
    const card = cardRef.current;
    const dragHandle = dragHandleRef.current;

    if (!card || !dragHandle) return;

    const clearColumnHighlights = () => {
      document
        .querySelectorAll<HTMLElement>("[data-column-id]")
        .forEach((column) => {
          column.classList.remove("border-accent");
        });
    };

    const draggable = createDraggable(card, {
      trigger: dragHandle,
      x: true,
      y: true,
      releaseStiffness: 240,
      releaseDamping: 24,

      onGrab: () => {
        card.style.zIndex = "100";
        card.style.scale = "1.03";
        card.style.borderColor = "var(--heroui-primary)";
        card.style.boxShadow = "0 20px 45px rgba(0, 0, 0, 0.18)";
        card.style.pointerEvents = "none";
      },

      onDrag: (instance) => {
        const [pointerX, pointerY] = instance.pointer;

        const target = document.elementFromPoint(pointerX, pointerY);

        const targetColumn = target?.closest<HTMLElement>("[data-column-id]");

        clearColumnHighlights();
        targetColumn?.classList.add("border-accent");
      },

      onRelease: (instance) => {
        const [pointerX, pointerY] = instance.pointer;

        const target = document.elementFromPoint(pointerX, pointerY);

        const targetColumn = target?.closest<HTMLElement>("[data-column-id]");

        const newStatus = targetColumn?.dataset.columnId as
          TaskStatus | undefined;

        clearColumnHighlights();

        card.style.pointerEvents = "";
        card.style.zIndex = "";
        card.style.scale = "";
        card.style.borderColor = "";
        card.style.boxShadow = "";

        if (newStatus && validStatuses.includes(newStatus)) {
          onDrop(task.id, newStatus);
        }
      },
    });

    return () => {
      draggable.disable();
      clearColumnHighlights();
    };
  }, [task.id, onDrop]);

  return (
    <>
      <article
        ref={cardRef}
        className="
          group relative cursor-default select-none
          rounded-[1.5rem]
          border border-default-200/70
          bg-background p-5
          shadow-[0_4px_16px_rgba(0,0,0,0.06)]
          will-change-transform
          transition-colors duration-200
        "
        data-task-id={task.id}
      >
        <div className="mb-4 flex items-center justify-between font-sans">
          <Button
            className={`inline-flex items-center rounded-full border px-8 py-1 ${priorityStyles[task.priority]}`}
          >
            <Typography className="font-semibold capitalize" type="h6">
              {task.priority}
            </Typography>
          </Button>

          <span
            ref={dragHandleRef}
            className="
              cursor-grab touch-none rounded-md p-1
              text-default-400 transition-colors
              hover:bg-default-100 hover:text-primary
              active:cursor-grabbing
            "
            title="Drag task"
          >
            <GripVertical className="size-4" />
          </span>
        </div>

        <div className="space-y-2">
          <Typography className="font-semibold tracking-tight" type="body">
            {task.title}
          </Typography>

          <Typography
            className="leading-relaxed text-default-500"
            type="body-sm"
          >
            {task.description}
          </Typography>
        </div>

        <div className="mt-5 flex items-center justify-between border-t border-default-100 pt-4">
          <div className="flex items-center gap-1">
            <Button
              isIconOnly
              aria-label="Edit task"
              className="text-default-500 hover:text-primary"
              size="sm"
              variant="ghost"
              onPress={() => setIsDrawerOpen(true)}
            >
              <Pencil className="size-3.5" />
            </Button>

            <Button
              isIconOnly
              aria-label="Delete task"
              className="text-default-500 hover:text-danger"
              size="sm"
              variant="ghost"
              onPress={() => onDelete(task.id)}
            >
              <Trash2 className="size-3.5" />
            </Button>
          </div>

          <div className="flex items-center gap-1.5 text-default-400">
            <CalendarDays className="size-3.5" />
            <Typography type="body-xs">{formattedDate}</Typography>
          </div>
        </div>
      </article>

      <TaskDrawer
        isOpen={isDrawerOpen}
        task={task}
        onOpenChange={setIsDrawerOpen}
        onSave={onSave}
      />
    </>
  );
}
