
"use client";

import { taskColumns } from "@/app/lib/(home)/notes/notes";
import type { Task, TaskStatus } from "@/app/lib/(home)/notes/notes";

import KanbanColumn from "./kanban-column";

interface KanbanBoardProps {
  tasks: Task[];
  onPointerDown: (
    event: React.PointerEvent<HTMLElement>,
    taskId: string,
  ) => void;
  onSave: (task: Task) => void;
  onDelete: (taskId: string) => void;
}

export default function KanbanBoard({
  tasks,
  onPointerDown,
  onSave,
  onDelete,
}: KanbanBoardProps) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      {taskColumns.map((column) => (
        <KanbanColumn
          key={column.id}
          id={column.id as TaskStatus}
          title={column.title}
          tasks={tasks.filter(
            (task) => task.status === column.id,
          )}
          onPointerDown={onPointerDown}
          onSave={onSave}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
