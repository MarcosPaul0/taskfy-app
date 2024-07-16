"use client";

import { Kanban, ListChecks, Plus } from "@phosphor-icons/react";
import { AddTaskDialog } from "@taskfy/components/tasks/AddTaskDialog";
import { Button } from "@taskfy/components/Button";
import { KanbanBoard } from "@taskfy/components/KanbanBoard";
import { SearchInput } from "@taskfy/components/SearchInput";
import { Tab } from "@taskfy/components/Tab";
import { TableHead } from "@taskfy/components/Table";
import { TaskRow } from "@taskfy/components/tasks/TaskRow";
import { TaskResponse } from "@taskfy/interfaces/responses/taskResponse.interface";
import { API_ROUTES } from "@taskfy/routes/api.routes";
import { apiClient } from "@taskfy/services/apiClient";
import { TaskTab } from "@taskfy/types/taskTab.type";
import { useParams } from "next/navigation";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useDialog } from "@taskfy/hooks/useDialog";
import { EditTaskDialog } from "@taskfy/components/tasks/EditTaskDialog";
import { useTaskGroupContext } from "@taskfy/contexts/TaskGroupContext/taskGroup.context";

export default function TaskGroupPage() {
  const { taskGroupId } = useParams();

  const { isTaskGroupOwner } = useTaskGroupContext();

  const [activeTab, setActiveTab] = useState<TaskTab>("list");

  const [taskToEdit, setTaskToEdit] = useState<TaskResponse | null>(null);

  function handleOpenEditTaskDialog(task: TaskResponse) {
    setTaskToEdit(task);
  }

  function handleCloseEditTaskDialog() {
    setTaskToEdit(null);
  }

  const {
    isOpen: addTaskDialogIsOpen,
    open: handleOpenAddTaskDialog,
    change: handleChangeAddTaskDialog,
  } = useDialog();

  const { data: tasks, refetch } = useQuery<TaskResponse[]>({
    queryKey: ["tasks", taskGroupId],
    queryFn: async () => {
      try {
        const tasksResponse = await apiClient.get<TaskResponse[]>(
          `${API_ROUTES.FIND_TASKS_BY_GROUP}/${taskGroupId}`,
        );

        return tasksResponse.data;
      } catch {
        return [];
      }
    },
    initialData: [],
  });

  async function refetchTasks() {
    await refetch();
  }

  return (
    <>
      <AddTaskDialog
        refetchTasks={refetchTasks}
        isOpen={addTaskDialogIsOpen}
        handleChangeIsOpen={handleChangeAddTaskDialog}
      />

      <EditTaskDialog
        task={taskToEdit}
        handleClose={handleCloseEditTaskDialog}
      />

      <div
        className={`
          flex items-end justify-between border-b border-neutral-700
          w-full
        `}
      >
        <div className="flex items-end h-full">
          <Tab
            text="Lista"
            icon={<ListChecks />}
            isActive={activeTab === "list"}
            onClick={() => setActiveTab("list")}
          />
          <Tab
            text="Kanban"
            icon={<Kanban />}
            isActive={activeTab === "kanban"}
            onClick={() => setActiveTab("kanban")}
          />
        </div>

        <div className="flex items-center gap-4 pb-2">
          <SearchInput placeholder="Buscar tarefa" />

          {isTaskGroupOwner && (
            <Button
              leftIcon={<Plus />}
              text="Nova tarefa"
              size="sm"
              variant="outlined"
              onClick={handleOpenAddTaskDialog}
            />
          )}
        </div>
      </div>

      {activeTab === "list" ? (
        <table className="border-collapse">
          <thead>
            <tr>
              <TableHead>Título</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Pontos</TableHead>
              <TableHead>Data</TableHead>
              <TableHead>Participantes</TableHead>
            </tr>
          </thead>

          <tbody>
            {tasks.map((task) => (
              <TaskRow
                key={task.id}
                task={task}
                onClick={handleOpenEditTaskDialog}
              />
            ))}
          </tbody>
        </table>
      ) : (
        <KanbanBoard />
      )}
    </>
  );
}
