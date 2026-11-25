"use client";

import type { Task, TaskStatus } from "@/app/lib/(home)/notes/task.dto";

import KanbanColumn from "./kanban-column";

import { taskColumns } from "@/app/lib/(home)/notes/task.dto";

interface KanbanBoardProps {
  tasks: Task[];
  onDrop: (taskId: string, status: TaskStatus) => void;
  onSave: (task: Task) => void;
  onDelete: (taskId: string) => void;
}

export default function KanbanBoard({
  tasks,
  onDrop,
  onSave,
  onDelete,
}: KanbanBoardProps) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      {taskColumns.map((column) => (
        <KanbanColumn
          key={column.id}
          id={column.id}
          tasks={tasks.filter((task) => task.status === column.id)}
          title={column.title}
          onDelete={onDelete}
          onDrop={onDrop}
          onSave={onSave}
        />
      ))}
    </div>
  );
}
