import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { useMemo, useState } from "react";
import { KANBAN_ITEMS } from "./constants/kanbanItems.constant";
import { TASK_STATUS } from "@taskfy/constants/taskStatus.constant";
import { TaskStatus } from "@taskfy/types/taskStaus.type";
import { TaskResponse } from "@taskfy/interfaces/responses/taskResponse.interface";
import { TaskBoard } from "../../app/in-session/task-group/[taskGroupId]/tasks/components/TasksBoard";

const COLUMNS = [
  { id: TASK_STATUS.open, title: "Aberto" },
  { id: TASK_STATUS.inProgress, title: "Em andamento" },
  { id: TASK_STATUS.onHold, title: "Em espera" },
  { id: TASK_STATUS.checked, title: "Fechado" },
  { id: TASK_STATUS.concluded, title: "Concluído" },
];

const TASKS: TaskResponse[] = [
  {
    id: "task1",
    status: TASK_STATUS.open,
    title: "Título de tarefa 1",
    description: "Descrição de teste 1",
    createdAt: "2024-01-24 10:00:00",
    updatedAt: "2024-01-24 10:00:00",
    dueDate: "2024-05-24 10:00:00",
    groupId: "fake-group-id",
    isActive: true,
    points: 20,
    userId: "fake-user-id",
  },
  {
    id: "task2",
    status: TASK_STATUS.open,
    title: "Título de tarefa 2",
    description: "Descrição de teste 2",
    createdAt: "2024-01-24 10:00:00",
    updatedAt: "2024-01-24 10:00:00",
    dueDate: "2024-05-24 10:00:00",
    groupId: "fake-group-id",
    isActive: true,
    points: 20,
    userId: "fake-user-id",
  },
  {
    id: "task3",
    status: TASK_STATUS.open,
    title: "Título de tarefa 3",
    description: "Descrição de teste 3",
    createdAt: "2024-01-24 10:00:00",
    updatedAt: "2024-01-24 10:00:00",
    dueDate: "2024-05-24 10:00:00",
    groupId: "fake-group-id",
    isActive: true,
    points: 20,
    userId: "fake-user-id",
  },
  {
    id: "task4",
    status: TASK_STATUS.open,
    title: "Título de tarefa 4",
    description: "Descrição de teste 4",
    createdAt: "2024-01-24 10:00:00",
    updatedAt: "2024-01-24 10:00:00",
    dueDate: "2024-05-24 10:00:00",
    groupId: "fake-group-id",
    isActive: true,
    points: 20,
    userId: "fake-user-id",
  },
  {
    id: "task5",
    status: TASK_STATUS.open,
    title: "Título de tarefa 5",
    description: "Descrição de teste 5",
    createdAt: "2024-01-24 10:00:00",
    updatedAt: "2024-01-24 10:00:00",
    dueDate: "2024-05-24 10:00:00",
    groupId: "fake-group-id",
    isActive: true,
    points: 20,
    userId: "fake-user-id",
  },
];

export function KanbanBoard() {
  const [tasks, setTasks] = useState(TASKS);

  const columnsIds = useMemo(() => {
    return COLUMNS.map((column) => column.id);
  }, [COLUMNS]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    }),
  );

  function onDragOver(event: DragOverEvent) {
    const { active, over } = event;

    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    if (activeId === overId) return;

    // const isActiveATask = active.data.current?.type === KANBAN_ITEMS.TASK;
    // const isOverATask = over.data.current?.type === KANBAN_ITEMS.TASK;

    setTasks((tasks) => {
      const activeIndex = tasks.findIndex((t) => t.id === activeId);
      const overIndex = tasks.findIndex((t) => t.id === overId);

      if (
        activeIndex >= 0 &&
        overIndex >= 0 &&
        tasks[activeIndex].status != tasks[overIndex].status
      ) {
        tasks[activeIndex].status = tasks[overIndex].status;
        return arrayMove(tasks, activeIndex, overIndex - 1);
      }

      return arrayMove(tasks, activeIndex, overIndex);
    });

    const isOverAColumn = over.data.current?.type === KANBAN_ITEMS.BOARD;

    if (isOverAColumn) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.id === activeId);

        tasks[activeIndex].status = overId as TaskStatus;
        return arrayMove(tasks, activeIndex, activeIndex);
      });
    }
  }

  return (
    <DndContext sensors={sensors} onDragOver={onDragOver}>
      <SortableContext items={columnsIds}>
        <div
          className={`
            w-full overflow-hidden overflow-x-scroll flex 
            flex-nowrap gap-2 pb-6 items-start
          `}
        >
          {COLUMNS.map((column) => (
            <TaskBoard
              key={column.id}
              column={column}
              tasks={tasks.filter((task) => task.status === column.id)}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}
