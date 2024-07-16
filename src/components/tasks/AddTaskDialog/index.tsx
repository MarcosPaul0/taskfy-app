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
import { AddTaskFormData } from "./interfaces/addTaskFormData.interface";
import { useNotify } from "@taskfy/hooks/useNotify";
import { apiClient } from "@taskfy/services/apiClient";
import { useParams } from "next/navigation";
import { API_ROUTES } from "@taskfy/routes/api.routes";
import { TaskStatusCombobox } from "../TaskStatusCombobox";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const registerTaskSchema = z.object({
  user: z.object(
    {
      id: z.string(),
      name: z.string(),
      email: z.string(),
      avatarUrl: z.string().optional().nullable(),
      isActive: z.boolean().optional().nullable(),
      role: z.string(),
      createdAt: z.string(),
      updatedAt: z.string(),
    },
    {
      required_error: "Proprietário é obrigatório",
    },
  ),
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

export function AddTaskDialog({
  refetchTasks,
  isOpen,
  handleChangeIsOpen,
}: TaskDialogProps) {
  const { successNotify, errorNotify } = useNotify();

  const { taskGroupId } = useParams();

  const {
    register,
    watch,
    setValue,
    clearErrors,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<AddTaskFormData>({
    resolver: zodResolver(registerTaskSchema),
    defaultValues: {
      dueDate: new Date(),
      points: 1,
      status: "OPEN",
    },
  });

  const dueDateWatched = watch("dueDate");
  const statusWatched = watch("status");
  const pointsWatched = watch("points");
  const userWatched = watch("user");

  async function addNewTask(addNewTaskData: AddTaskFormData) {
    try {
      await apiClient.post(API_ROUTES.TASK, {
        userId: addNewTaskData.user.id,
        groupId: taskGroupId,
        title: addNewTaskData.title,
        description: addNewTaskData.description,
        dueDate: addNewTaskData.dueDate,
        status: addNewTaskData.status,
        points: addNewTaskData.points,
      });

      await refetchTasks();

      handleChangeIsOpen(false);

      successNotify({
        message: "Tarefa adicionada com sucesso",
      });
    } catch {
      errorNotify({
        message: "Ocorreu algum erro ao registrar uma nova tarefa",
      });
    }
  }

  function handleChange(key: keyof AddTaskFormData, data: any) {
    setValue(key, data);
    clearErrors(key);
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleChangeIsOpen}>
      <DialogContent className="sm:max-w-[724px]">
        <form onSubmit={handleSubmit(addNewTask)}>
          <DialogHeader>
            <DialogTitle>Adicionar tarefa</DialogTitle>

            <DialogDescription>
              Registre suas tarefas! Insira rapidamente informações cruciais,
              como título, descrição e prazo. Torne a gestão de tarefas uma
              experiência ágil e eficaz, proporcionando uma forma simples e
              direta de adicionar novas responsabilidades ao seu projeto.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <TextInput
              {...register("title")}
              label="Título"
              placeholder="Título da tarefa"
              helper={errors.title?.message}
            />

            <TextArea
              {...register("description")}
              label="Descrição"
              placeholder="Descreva a tarefa"
              helper={errors.description?.message}
            />

            <div className="grid grid-cols-2 gap-4">
              <DatePicker
                date={dueDateWatched}
                onSelected={(date) => date && handleChange("dueDate", date)}
                helper={errors.dueDate?.message}
              />

              <ParticipantCombobox
                onChange={(user) => handleChange("user", user)}
                value={userWatched}
                helper={errors.user?.message}
              />

              <TaskStatusCombobox
                onChange={(value) => handleChange("status", value)}
                value={statusWatched}
                helper={errors.status?.message}
              />

              <PointsCombobox
                onChange={(value) => handleChange("points", value)}
                value={pointsWatched}
                helper={errors.points?.message}
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              type="submit"
              text="Salvar mudanças"
              size="md"
              width="fit"
              leftIcon={<FloppyDisk />}
              isLoading={isSubmitting}
            />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
