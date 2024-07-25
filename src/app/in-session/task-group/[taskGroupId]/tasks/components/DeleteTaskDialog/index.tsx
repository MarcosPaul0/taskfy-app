import { TrashSimple } from "@phosphor-icons/react";
import { Button } from "../../../../../../../components/Button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../../../../../../components/Dialog";
import { useNotify } from "@taskfy/hooks/useNotify";
import { apiClient } from "@taskfy/services/apiClient";
import { useParams, useSearchParams } from "next/navigation";
import { API_ROUTES } from "@taskfy/routes/api.routes";
import { IDeleteTaskDialogProps } from "./interfaces/deleteTaskDialogProps.interface";
import { queryClient } from "@taskfy/services/queryClient";
import { TaskResponse } from "@taskfy/interfaces/responses/taskResponse.interface";
import { useState } from "react";
import { PageResponse } from "@taskfy/interfaces/responses/pageResponse.interface";

export function DeleteTaskDialog({
  isOpen,
  task,
  handleClose,
  onDelete,
}: IDeleteTaskDialogProps) {
  const { successNotify, errorNotify } = useNotify();

  const { taskGroupId } = useParams();

  const { get } = useSearchParams();

  const page = get("page");
  const taskSearch = get("task");

  const [isSubmitting, setIsSubmitting] = useState(false);

  async function deleteTask() {
    try {
      setIsSubmitting(true);

      if (!task) {
        return;
      }

      await apiClient.delete(`${API_ROUTES.TASK}/${task.id}`);

      queryClient.setQueryData(
        ["tasks", taskGroupId, page, taskSearch],
        (currentTasks: PageResponse<TaskResponse>) => {
          return {
            ...currentTasks,
            content: currentTasks.content.filter(
              (currentTask) => currentTask.id !== task.id,
            ),
          };
        },
      );

      handleClose();

      onDelete();

      successNotify({
        message: "Tarefa deletada com sucesso",
      });
    } catch {
      errorNotify({
        message: "Ocorreu algum erro ao deletar a tarefa",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle className="text-red-500">Deletar tarefa?</DialogTitle>

          <DialogDescription>
            Certifique-se de que deseja realmente deletar a tarefa antes de
            prosseguir, pois essa ação não poderá ser desfeita.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4"></div>

        <DialogFooter>
          <Button
            onClick={deleteTask}
            text="Deletar tarefa"
            size="md"
            width="fit"
            leftIcon={<TrashSimple />}
            isLoading={isSubmitting}
            variant="filledDanger"
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
