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
import { DeleteTaskGroupUserDialogProps } from "./interfaces/deleteTaskGroupUserDialogProps.interface";
import { UserMinus } from "@phosphor-icons/react";
import { queryClient } from "@taskfy/services/queryClient";
import { UserResponse } from "@taskfy/interfaces/responses/userResponse.interface";

export function DeleteTaskGroupUserDialog({
  userToRemove,
  handleClose,
}: DeleteTaskGroupUserDialogProps) {
  const { successNotify, errorNotify } = useNotify();

  const { taskGroupId } = useParams();

  const [isSubmitting, setIsSubmitting] = useState(false);

  async function deleteTask() {
    try {
      setIsSubmitting(true);

      await apiClient.delete(
        `${API_ROUTES.TASK_GROUP_USER}/${taskGroupId}/${userToRemove?.id}`,
      );

      queryClient.setQueryData(
        ["participants", taskGroupId],
        (currentData: UserResponse[]) => {
          return currentData.filter(
            (participant) => participant.id !== userToRemove?.id,
          );
        },
      );

      handleClose();

      successNotify({
        message: "O usuário foi removido do grupo de tarefas",
      });
    } catch {
      errorNotify({
        message: "Ocorreu algum erro ao remover o usuário do grupo de tarefas",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  const isOpen = Boolean(userToRemove);

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle className="text-red-500">
            Remover participante?
          </DialogTitle>

          <DialogDescription>
            Ao deletar o usuário do grupo de tarefas, todas as tarefas
            associadas a ele também serão removidas permanentemente.
            Certifique-se de que deseja realmente removê-lo antes de prosseguir,
            pois essa ação não poderá ser desfeita.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4"></div>

        <DialogFooter>
          <Button
            onClick={deleteTask}
            text="Remover participante"
            size="md"
            width="fit"
            leftIcon={<UserMinus />}
            isLoading={isSubmitting}
            variant="filledDanger"
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
