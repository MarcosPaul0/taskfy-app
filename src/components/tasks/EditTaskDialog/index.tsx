import { FloppyDisk, Trash } from "@phosphor-icons/react";
import { Button } from "../../Button";
import { DatePicker } from "../../DatePicker";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../Dialog";
import { TextArea } from "../../TextArea";
import { TextInput } from "../../TextInput";
import { TaskDialogProps } from "./taskDialogProps.interface";
import { ParticipantCombobox } from "../../ParticipantCombobox";
import { PointsCombobox } from "../../PointsCombobox";
import { useForm } from "react-hook-form";
import { EditTaskFormData } from "./interfaces/editTaskFormData.interface";
import { API_ROUTES } from "@taskfy/routes/api.routes";
import { apiClient } from "@taskfy/services/apiClient";
import { queryClient } from "@taskfy/services/queryClient";
import { useParams } from "next/navigation";
import { TaskResponse } from "@taskfy/interfaces/responses/taskResponse.interface";
import { useNotify } from "@taskfy/hooks/useNotify";
import { useEffect } from "react";
import { TaskStatusCombobox } from "../TaskStatusCombobox";
import { DeleteTaskDialog } from "../DeleteTaskDialog";
import { useDialog } from "@taskfy/hooks/useDialog";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTaskGroupContext } from "@taskfy/contexts/TaskGroupContext/taskGroup.context";

const editTaskSchema = z.object({
  user: z.object({
    id: z.string(),
    name: z.string(),
    email: z.string(),
    avatarUrl: z.string().optional().nullable(),
    isActive: z.boolean().optional().nullable(),
    role: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
  }),
  title: z
    .string({
      required_error: "Nome da tarefa obrigatório",
    })
    .min(10, "Mínimo de 10 caracteres")
    .max(100, "Máximo de 100 caracteres"),
  description: z
    .string()
    .min(10, "Mínimo de 10 caracteres")
    .max(1000, "Máximo de 1000 caracteres"),
  dueDate: z.date({
    required_error: "É necessário definir uma data de vencimento",
  }),
  status: z.string({
    required_error: "É necessário definir o status da tarefa",
  }),
  points: z.number({
    required_error: "É necessário definir os pontos da tarefa",
  }),
});

export function EditTaskDialog({ handleClose, task }: TaskDialogProps) {
  const { taskGroupId } = useParams();

  const { isTaskGroupOwner } = useTaskGroupContext();

  const { errorNotify, successNotify } = useNotify();

  const {
    isOpen: deleteTaskDialogIsOpen,
    open: handleOpenDeleteTaskDialog,
    close: handleCloseDeleteTaskDialog,
  } = useDialog();

  const {
    register,
    watch,
    setValue,
    clearErrors,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<EditTaskFormData>({
    resolver: zodResolver(editTaskSchema),
  });

  async function editTask(editTaskData: EditTaskFormData) {
    try {
      if (!task) {
        return;
      }

      await apiClient.patch(`${API_ROUTES.TASK}/${task.id}`, {
        userId: editTaskData.user.id,
        title: editTaskData.title,
        description: editTaskData.description,
        dueDate: editTaskData.dueDate,
        status: editTaskData.status,
        points: editTaskData.points,
      });

      queryClient.setQueryData(
        ["tasks", taskGroupId],
        (currentData: TaskResponse[]) => {
          return currentData.map((currentTask) => {
            if (currentTask.id === task.id) {
              return {
                ...currentTask,
                ...editTaskData,
              };
            }

            return currentTask;
          });
        },
      );

      handleClose();

      successNotify({
        message: "Tarefa atualizada com sucesso",
      });
    } catch {
      errorNotify({
        message: "Ocorreu algum erro ao atualizar a tarefa",
      });
    }
  }

  function handleChange(key: keyof EditTaskFormData, data: any) {
    setValue(key, data);
    clearErrors(key);
  }

  useEffect(() => {
    if (task) {
      setValue("description", task.description);
      setValue("dueDate", new Date(task.dueDate));
      setValue("points", task.points);
      setValue("status", task.status);
      setValue("title", task.title);
      setValue("user", task.user);
    }
  }, [task]);

  const dueDateWatched = watch("dueDate");
  const statusWatched = watch("status");
  const pointsWatched = watch("points");
  const userWatched = watch("user");

  const isOpen = Boolean(task);

  const editionIsDisabled = !isTaskGroupOwner;

  return (
    <>
      {!editionIsDisabled && (
        <DeleteTaskDialog
          task={task}
          handleClose={handleCloseDeleteTaskDialog}
          isOpen={deleteTaskDialogIsOpen}
          onDelete={handleClose}
        />
      )}

      <Dialog open={isOpen} onOpenChange={() => handleClose()}>
        <DialogContent className="sm:max-w-[724px]">
          <form onSubmit={handleSubmit(editTask)}>
            <DialogHeader>
              <DialogTitle>Editar tarefa</DialogTitle>

              <DialogDescription>
                Modificar e aprimorar as informações associadas a uma tarefa
                específica. Essa funcionalidade é projetada para oferecer
                flexibilidade e controle, permitindo que os usuários ajustem
                detalhes relevantes conforme necessário.
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              <TextInput
                {...register("title")}
                label="Título"
                placeholder="Título da tarefa"
                helper={errors.title?.message}
                disabled={editionIsDisabled}
              />

              <TextArea
                {...register("description")}
                label="Descrição"
                placeholder="Descreva a tarefa"
                helper={errors.description?.message}
                disabled={editionIsDisabled}
              />

              <div className="grid grid-cols-2 gap-4">
                <DatePicker
                  date={dueDateWatched}
                  onSelected={(date) => date && handleChange("dueDate", date)}
                  helper={errors.dueDate?.message}
                  disabled={editionIsDisabled}
                />

                <ParticipantCombobox
                  value={userWatched}
                  onChange={(user) => handleChange("user", user)}
                  helper={errors.user?.message}
                  disabled={editionIsDisabled}
                />

                <TaskStatusCombobox
                  onChange={(value) => handleChange("status", value)}
                  value={statusWatched}
                  helper={errors.status?.message}
                  disabled={editionIsDisabled}
                />

                <PointsCombobox
                  onChange={(value) => handleChange("points", value)}
                  value={pointsWatched}
                  helper={errors.points?.message}
                  disabled={editionIsDisabled}
                />
              </div>
            </div>

            {!editionIsDisabled && (
              <DialogFooter>
                <Button
                  type="submit"
                  text="Salvar mudanças"
                  size="md"
                  width="fit"
                  leftIcon={<FloppyDisk />}
                  isLoading={isSubmitting}
                />
                <Button
                  text="Deletar tarefa"
                  variant="outlinedDanger"
                  size="md"
                  width="fit"
                  leftIcon={<Trash />}
                  disabled={isSubmitting}
                  onClick={handleOpenDeleteTaskDialog}
                />
              </DialogFooter>
            )}
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
