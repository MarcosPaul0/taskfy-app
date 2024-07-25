import { TaskCardProps } from "./interfaces/taskCardProps.interface";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { KANBAN_ITEMS } from "../../../../../../../components/KanbanBoard/constants/kanbanItems.constant";
import { TaskPoints } from "../TaskPoints";
import { Avatar } from "../../../../../../../components/Avatar";

export function TaskCard({ task }: TaskCardProps) {
  const { id, description } = task;

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id,
    data: {
      type: KANBAN_ITEMS.TASK,
      task,
    },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <li
      className={`
        w-[366px] rounded-2xl ${isDragging ? "z-20 border-2 border-emerald-500" : "z-0"}
        p-4 flex flex-col gap-2 bg-neutral-700 relative 
      `}
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
    >
      <h1
        className={`
        select-none font-bold text-lg text-gray-50
        whitespace-nowrap flex-nowrap w-full text-ellipsis overflow-hidden
      `}
      >
        {task.title}
      </h1>

      <p className="select-none text-base text-gray-200">{task.description}</p>
      <TaskPoints points={task.points} />

      <footer className="flex items-end justify-between">
        <time
          className={`
        select-none text-xs text-gray-400
      `}
        >
          {new Intl.DateTimeFormat("pt-BR", {
            year: "numeric",
            month: "long",
            day: "2-digit",
          }).format(new Date(task.dueDate))}
        </time>

        <Avatar
          imageUrl="https://avatars.githubusercontent.com/u/64232527?v=4"
          username="Marcos Paulo"
          showName={false}
          size="lg"
          hasBorder={false}
        />
      </footer>
    </li>
  );
}
