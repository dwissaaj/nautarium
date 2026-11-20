"use client";


import { Task, taskColumns, TaskStatus } from "@/app/lib/(home)/notes/notes";
import KanbanColumn from "./kanban-column";

interface KanbanBoardProps {
  tasks: Task[];
  onDrop: (taskId: string, status: TaskStatus) => void;
  onDragStart: (
    event: React.DragEvent<HTMLDivElement>,
    taskId: string
  ) => void;
  onDragEnd: () => void;
  onSave: (task: Task) => void;
  onDelete: (taskId: string) => void;
}

export default function KanbanBoard({
  tasks,
  onDrop,
  onDragStart,
  onDragEnd,
  onSave,
  onDelete,
}: KanbanBoardProps) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      {taskColumns.map((column) => (
        <KanbanColumn
          key={column.id}
          id={column.id}
          title={column.title}
          tasks={tasks.filter((task) => task.status === column.id)}
          onDrop={(status) => {
            const taskId = document
              .querySelector("[data-dragging='true']")
              ?.getAttribute("data-task-id");

            if (taskId) {
              onDrop(taskId, status);
            }
          }}
          onDragStart={onDragStart}
          onDragEnd={onDragEnd}
          onSave={onSave}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}