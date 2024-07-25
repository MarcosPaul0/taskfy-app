import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { TaskBoardProps } from "./interfaces/taskBoardProps.interface";
import { useDroppable } from "@dnd-kit/core";
import { useMemo } from "react";
import { KANBAN_ITEMS } from "@taskfy/components/KanbanBoard/constants/kanbanItems.constant";
import { TaskCard } from "../TaskCard";

export function TaskBoard({ tasks, column }: TaskBoardProps) {
  const { id, title } = column;

  const tasksIds = useMemo(() => {
    return tasks.map((task) => task.id);
  }, [tasks]);

  const { setNodeRef } = useDroppable({
    id,
    data: {
      type: KANBAN_ITEMS.BOARD,
      column,
    },
  });

  return (
    <div
      className={`
        min-w-[400px] border border-neutral-700 rounded-xl
        p-4 flex flex-col gap-2 bg-neutral-800
      `}
      ref={setNodeRef}
    >
      <h1 className="font-bold text-lg">{title}</h1>

      <SortableContext items={tasksIds}>
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </SortableContext>
    </div>
  );
}
