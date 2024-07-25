"use client";

import { Kanban, ListChecks, Plus } from "@phosphor-icons/react";
import { AddTaskDialog } from "@taskfy/app/in-session/task-group/[taskGroupId]/tasks/components/AddTaskDialog";
import { Button } from "@taskfy/components/Button";
import { KanbanBoard } from "@taskfy/components/KanbanBoard";
import { SearchInput } from "@taskfy/components/SearchInput";
import { Tab } from "@taskfy/components/Tab";
import { TableHead } from "@taskfy/components/Table";
import { TaskRow } from "@taskfy/app/in-session/task-group/[taskGroupId]/tasks/components/TaskRow";
import { TaskResponse } from "@taskfy/interfaces/responses/taskResponse.interface";
import { API_ROUTES } from "@taskfy/routes/api.routes";
import { apiClient } from "@taskfy/services/apiClient";
import { TaskTab } from "@taskfy/types/taskTab.type";
import { useParams, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useDialog } from "@taskfy/hooks/useDialog";
import { EditTaskDialog } from "@taskfy/app/in-session/task-group/[taskGroupId]/tasks/components/EditTaskDialog";
import { useTaskGroupContext } from "@taskfy/contexts/TaskGroupContext/taskGroup.context";
import { PageResponse } from "@taskfy/interfaces/responses/pageResponse.interface";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "../../../../../../@/components/ui/pagination";
import { usePagination } from "@taskfy/hooks/usePagination";

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

  const { get } = useSearchParams();

  const page = get("page");
  const task = get("task");

  const { data: tasks, refetch } = useQuery<PageResponse<TaskResponse> | null>({
    queryKey: ["tasks", taskGroupId, page, task],
    queryFn: async () => {
      try {
        const tasksResponse = await apiClient.get<PageResponse<TaskResponse>>(
          `${API_ROUTES.FIND_TASKS_BY_GROUP}/${taskGroupId}`,
          {
            params: {
              page: page ? page : "0",
              title: Boolean(task && String(task).length > 0) ? task : "",
            },
          },
        );

        return tasksResponse.data;
      } catch {
        return null;
      }
    },
    initialData: null,
  });

  const { nextPage, previousPage } = usePagination({
    totalPages: tasks?.totalPages,
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
          <SearchInput name="task" placeholder="Buscar tarefa" />

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
        <>
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
              {tasks?.content.map((task) => (
                <TaskRow
                  key={task.id}
                  task={task}
                  onClick={handleOpenEditTaskDialog}
                />
              ))}
            </tbody>
          </table>

          {Boolean(tasks && tasks.totalPages > 1) && (
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href={previousPage} />
                </PaginationItem>

                <PaginationItem>
                  <PaginationNext href={nextPage} />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </>
      ) : (
        <KanbanBoard />
      )}
    </>
  );
}
