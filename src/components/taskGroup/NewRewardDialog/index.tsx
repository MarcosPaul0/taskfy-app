import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@taskfy/components/Dialog";
import { useForm } from "react-hook-form";
import { useNotify } from "@taskfy/hooks/useNotify";
import { apiClient } from "@taskfy/services/apiClient";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { NewRewardFormData } from "./interfaces/newRewardFormData.interface";
import { API_ROUTES } from "@taskfy/routes/api.routes";
import { Medal } from "@phosphor-icons/react";
import { NewRewardDialogProps } from "./interfaces/newRewardDialogProps.interface";
import { TextInput } from "@taskfy/components/TextInput";
import { TextArea } from "@taskfy/components/TextArea";
import { Button } from "@taskfy/components/Button";
import { useTaskGroupContext } from "@taskfy/contexts/TaskGroupContext/taskGroup.context";

const registerRewardSchema = z.object({
  title: z
    .string({
      required_error: "Nome da recompensa é obrigatória",
    })
    .min(10, "Mínimo de 10 caracteres")
    .max(100, "Máximo de 100 caracteres"),
  description: z
    .string({
      required_error: "Descrição da recompensa é obrigatória",
    })
    .min(10, "Mínimo de 10 caracteres")
    .max(1000, "Máximo de 1000 caracteres"),
});

export function NewRewardDialog({
  isOpen,
  handleChangeIsOpen,
  refetchRewards,
}: NewRewardDialogProps) {
  const { successNotify, errorNotify } = useNotify();

  const { ranking } = useTaskGroupContext();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<NewRewardFormData>({
    resolver: zodResolver(registerRewardSchema),
  });

  async function addReward(addRewardData: NewRewardFormData) {
    try {
      await apiClient.post(API_ROUTES.REWARD, {
        title: addRewardData.title,
        description: addRewardData.description,
        rankingId: ranking?.id,
      });

      refetchRewards();

      handleChangeIsOpen(false);

      successNotify({
        message: "Nova recompensa adicionada com sucesso",
      });
    } catch {
      errorNotify({
        message: "Ocorreu algum erro ao registrar uma nova recompensa",
      });
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleChangeIsOpen}>
      <DialogContent className="sm:max-w-[724px]">
        <form onSubmit={handleSubmit(addReward)}>
          <DialogHeader>
            <DialogTitle>Nova recompensa</DialogTitle>

            <DialogDescription>
              Registre as recompensas do grupo de tarefas e incentive sua
              comunidade a cumprir suas tarefas, promovendo um
              ambiente colaborativo e motivador.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <TextInput
              {...register("title")}
              label="Título"
              placeholder="Título da recompensa"
              helper={errors.title?.message}
            />

            <TextArea
              {...register("description")}
              label="Descrição"
              placeholder="Descreva a recompensa"
              helper={errors.description?.message}
            />
          </div>

          <DialogFooter>
            <Button
              type="submit"
              text="Adicionar recompensa"
              size="md"
              width="fit"
              leftIcon={<Medal />}
              isLoading={isSubmitting}
            />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
