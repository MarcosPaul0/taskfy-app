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
import { TextInput } from "@taskfy/components/TextInput";
import { TextArea } from "@taskfy/components/TextArea";
import { Button } from "@taskfy/components/Button";
import { useTaskGroupContext } from "@taskfy/contexts/TaskGroupContext/taskGroup.context";
import { RewardDialogProps } from "./interfaces/rewardDialogProps.interface";
import { useEffect } from "react";
import { queryClient } from "@taskfy/services/queryClient";
import { RewardResponse } from "@taskfy/interfaces/responses/rewardResponse.interface";

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

export function RewardDialog({ reward, handleClose }: RewardDialogProps) {
  const { successNotify, errorNotify } = useNotify();

  const { ranking, isTaskGroupOwner } = useTaskGroupContext();

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<NewRewardFormData>({
    resolver: zodResolver(registerRewardSchema),
  });

  async function updateReward(updateRewardData: NewRewardFormData) {
    try {
      await apiClient.patch(`${API_ROUTES.REWARD}/${reward?.id}`, {
        title: updateRewardData.title,
        description: updateRewardData.description,
      });

      queryClient.setQueryData(
        ["rewards", ranking?.id],
        (rewards: RewardResponse[]) => {
          return rewards.map((currentReward) => {
            if (currentReward.id === reward?.id) {
              return {
                ...currentReward,
                ...updateRewardData,
              };
            }

            return currentReward;
          });
        },
      );

      handleClose();

      successNotify({
        message: "Recompensa atualizada com sucesso",
      });
    } catch (error) {
      console.log(error);
      errorNotify({
        message: "Ocorreu algum erro ao atualizar a recompensa",
      });
    }
  }

  useEffect(() => {
    if (!reward) {
      reset();

      return;
    }

    setValue("title", reward.title);
    setValue("description", reward.description);
  }, [reward]);

  const isOpen = Boolean(reward);

  return (
    <Dialog open={isOpen} onOpenChange={() => handleClose()}>
      <DialogContent className="sm:max-w-[724px]">
        <form onSubmit={handleSubmit(updateReward)}>
          <DialogHeader>
            <DialogTitle>Recompensa</DialogTitle>

            <DialogDescription>
              Atualize a recompensa do grupo de tarefas e incentive sua
              comunidade a cumprir suas tarefas, promovendo um ambiente
              colaborativo e motivador.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <TextInput
              {...register("title")}
              label="Título"
              placeholder="Título da recompensa"
              helper={errors.title?.message}
              disabled={!isTaskGroupOwner}
            />

            <TextArea
              {...register("description")}
              label="Descrição"
              placeholder="Descreva a recompensa"
              helper={errors.description?.message}
              disabled={!isTaskGroupOwner}
            />
          </div>

          {isTaskGroupOwner && (
            <DialogFooter>
              <Button
                type="submit"
                text="Atualizar recompensa"
                size="md"
                width="fit"
                leftIcon={<Medal />}
                isLoading={isSubmitting}
              />
            </DialogFooter>
          )}
        </form>
      </DialogContent>
    </Dialog>
  );
}
