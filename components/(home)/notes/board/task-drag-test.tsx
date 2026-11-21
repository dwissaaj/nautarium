
"use client";

import { useEffect, useRef, useState } from "react";
import { Typography } from "@heroui/react";
import { GripVertical } from "lucide-react";

import type { Task, TaskStatus } from "@/app/lib/(home)/notes/notes";

const initialTasks: Task[] = [
  {
    id: "test-1",
    title: "Test drag card 1",
    description: "Drag this from To Do to In Progress.",
    status: "todo",
    priority: "high",
    createdAt: "2026-11-21",
  },
  {
    id: "test-2",
    title: "Test drag card 2",
    description: "Drag this from In Progress to Done.",
    status: "in-progress",
    priority: "medium",
    createdAt: "2026-11-21",
  },
  {
    id: "test-3",
    title: "Test drag card 3",
    description: "Another test card.",
    status: "done",
    priority: "low",
    createdAt: "2026-11-21",
  },
];

const columns: { id: TaskStatus; title: string }[] = [
  { id: "todo", title: "To Do" },
  { id: "in-progress", title: "In Progress" },
  { id: "done", title: "Done" },
];

export default function TaskDragTest() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [draggedId, setDraggedId] = useState<string | null>(null);

  const draggedIdRef = useRef<string | null>(null);

  useEffect(() => {
    const handlePointerUp = (event: PointerEvent) => {
      const taskId = draggedIdRef.current;

      if (!taskId) return;

      const target = document.elementFromPoint(
        event.clientX,
        event.clientY,
      );

      const column = target?.closest<HTMLElement>("[data-column-id]");
      const newStatus = column?.dataset.columnId as
        | TaskStatus
        | undefined;

      if (newStatus) {
        setTasks((current) =>
          current.map((task) =>
            task.id === taskId
              ? { ...task, status: newStatus }
              : task,
          ),
        );
      }

      draggedIdRef.current = null;
      setDraggedId(null);
    };

    const handlePointerCancel = () => {
      draggedIdRef.current = null;
      setDraggedId(null);
    };

    window.addEventListener("pointerup", handlePointerUp);
    window.addEventListener("pointercancel", handlePointerCancel);

    return () => {
      window.removeEventListener("pointerup", handlePointerUp);
      window.removeEventListener("pointercancel", handlePointerCancel);
    };
  }, []);

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      {columns.map((column) => {
        const columnTasks = tasks.filter(
          (task) => task.status === column.id,
        );

        return (
          <section
            key={column.id}
            data-column-id={column.id}
            className="flex min-h-[400px] flex-col gap-3 rounded-2xl bg-default-50 p-4"
          >
            <div className="flex items-center justify-between">
              <Typography type="body" className="font-semibold">
                {column.title}
              </Typography>

              <Typography type="body-sm" className="text-default-500">
                {columnTasks.length}
              </Typography>
            </div>

            {columnTasks.map((task) => (
              <article
                key={task.id}
                onPointerDown={(event) => {
                  if (event.button !== 0) return;

                  event.preventDefault();

                  draggedIdRef.current = task.id;
                  setDraggedId(task.id);
                }}
                className={`cursor-grab touch-none select-none rounded-xl border border-default-200 bg-background p-4 shadow-sm active:cursor-grabbing ${
                  draggedId === task.id ? "opacity-50" : ""
                }`}
              >
                <div className="mb-2 flex items-center justify-between">
                  <Typography type="body-sm" className="font-semibold">
                    {task.title}
                  </Typography>

                  <GripVertical className="size-4 text-default-400" />
                </div>

                <Typography type="body-sm" className="text-default-500">
                  {task.description}
                </Typography>
              </article>
            ))}

            {columnTasks.length === 0 && (
              <div className="flex min-h-28 flex-1 items-center justify-center rounded-xl border border-dashed border-default-300 text-xs text-default-400">
                Drop tasks here
              </div>
            )}
          </section>
        );
      })}
    </div>
  );
}
