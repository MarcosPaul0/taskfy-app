import { zodResolver } from "@hookform/resolvers/zod";
import { UsersThree } from "@phosphor-icons/react";
import { EditTaskGroupFormData } from "@taskfy/components/manageTaskGroup/EditTaskGroupSection/interfaces/editTaskGroupFormData.interface";
import { Button } from "@taskfy/components/Button";
import { Section } from "@taskfy/components/Section";
import { Switch } from "@taskfy/components/Switch";
import { TextArea } from "@taskfy/components/TextArea";
import { TextInput } from "@taskfy/components/TextInput";
import { useTaskGroupContext } from "@taskfy/contexts/TaskGroupContext/taskGroup.context";
import { useNotify } from "@taskfy/hooks/useNotify";
import { API_ROUTES } from "@taskfy/routes/api.routes";
import { apiClient } from "@taskfy/services/apiClient";
import { useForm } from "react-hook-form";
import { z } from "zod";

const editTaskGroupSchema = z.object({
  name: z
    .string({
      required_error: "É necessário definir um nome para o grupo",
    })
    .min(10, "Mínimo de 10 caracteres")
    .max(100, "Máximo de 100 caracteres"),
  description: z
    .string({
      required_error: "É necessário definir uma descrição para o grupo",
    })
    .min(10, "Mínimo de 10 caracteres")
    .max(1000, "Máximo de 1000 caracteres"),
  isPrivate: z.boolean(),
  primaryColor: z.string(),
});

export function EditTaskGroupSection() {
  const { successNotify, errorNotify } = useNotify();

  const { taskGroup, updateTaskGroupData } = useTaskGroupContext();

  const {
    register,
    setValue,
    watch,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<EditTaskGroupFormData>({
    resolver: zodResolver(editTaskGroupSchema),
    defaultValues: {
      name: taskGroup?.name,
      description: taskGroup?.description,
      isPrivate: taskGroup?.isPrivate,
      primaryColor: "10b981",
    },
  });

  async function editTaskGroup(
    editTaskGroupData: EditTaskGroupFormData,
  ): Promise<void> {
    try {
      await apiClient.patch(
        `${API_ROUTES.TASK_GROUP}/${taskGroup?.id}`,
        editTaskGroupData,
      );

      updateTaskGroupData(editTaskGroupData);

      successNotify({
        message: "Grupo atualizado com sucesso",
      });
    } catch {
      errorNotify({
        message: "Ocorreu um erro ao atualizar o grupo de tarefas",
      });
    }
  }

  const isPrivate = watch("isPrivate");

  return (
    <form onSubmit={handleSubmit(editTaskGroup)}>
      <Section
        title="Dados do Grupo"
        text="Personalize o nome, adicione uma descrição envolvente, escolha uma foto representativa e defina se é privado ou público. Tudo para tornar a experiência única para você e seus membros."
      >
        <TextInput
          label="Nome do grupo"
          placeholder="Defina um nome para seu grupo"
          helper={errors.name?.message}
          {...register("name")}
        />

        <TextArea
          label="Descrição"
          placeholder="Defina uma descrição para seu grupo"
          helper={errors.description?.message}
          {...register("description")}
        />

        <Switch
          onSwitch={(isActive) => setValue("isPrivate", isActive)}
          id="privateSwitch"
          label="Grupo privado"
          value={isPrivate}
        />

        <Button
          text="Atualizar grupo"
          size="md"
          type="submit"
          leftIcon={<UsersThree />}
          isLoading={isSubmitting}
        />
      </Section>
    </form>
  );
}
