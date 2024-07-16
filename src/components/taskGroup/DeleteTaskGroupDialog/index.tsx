import { useParams } from "next/navigation";
import { Button } from "@taskfy/components/Button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@taskfy/components/Dialog";
import { useNotify } from "@taskfy/hooks/useNotify";
import { useState } from "react";
import { API_ROUTES } from "@taskfy/routes/api.routes";
import { apiClient } from "@taskfy/services/apiClient";
import { APP_ROUTES } from "@taskfy/routes/app.routes";
import { DeleteTaskGroupDialogProps } from "./interfaces/deleteTaskGroupDialogProps.interface";
import { TrashSimple } from "@phosphor-icons/react";

export function DeleteTaskGroupDialog({
  isOpen,
  handleClose,
}: DeleteTaskGroupDialogProps) {
  const { successNotify, errorNotify } = useNotify();

  const { taskGroupId } = useParams();

  const [isSubmitting, setIsSubmitting] = useState(false);

  async function deleteTask() {
    try {
      setIsSubmitting(true);

      await apiClient.delete(`${API_ROUTES.TASK_GROUP}/${taskGroupId}`);

      handleClose();

      successNotify({
        message: "Grupo de tarefas deletado com sucesso",
        redirectTo: APP_ROUTES.HOME,
      });
    } catch {
      errorNotify({
        message: "Ocorreu algum erro ao deletar o grupo de tarefas",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle className="text-red-500">
            Deletar grupo de tarefa?
          </DialogTitle>

          <DialogDescription>
            Ao deletar um grupo, todas as tarefas associadas a ele também serão
            removidas permanentemente. Certifique-se de que deseja realmente
            deletar o grupo antes de prosseguir, pois essa ação não poderá ser
            desfeita.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4"></div>

        <DialogFooter>
          <Button
            onClick={deleteTask}
            text="Deletar grupo de tarefas"
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
