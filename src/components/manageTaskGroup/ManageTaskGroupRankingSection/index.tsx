import { Ranking } from "@phosphor-icons/react";
import { Button } from "@taskfy/components/Button";
import { DatePicker } from "@taskfy/components/DatePicker";
import { Section } from "@taskfy/components/Section";
import { useForm } from "react-hook-form";
import { ManageRankingFormData } from "./interfaces/manageRankingFormData.interface";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect, useState } from "react";
import { apiClient } from "@taskfy/services/apiClient";
import { API_ROUTES } from "@taskfy/routes/api.routes";
import { useTaskGroupContext } from "@taskfy/contexts/TaskGroupContext/taskGroup.context";
import { RankingResponse } from "@taskfy/interfaces/responses/rankingResponse.interface";
import { useNotify } from "@taskfy/hooks/useNotify";

const editTaskGroupSchema = z.object({
  dueDate: z.date({
    required_error: "É necessário definir uma data de vencimento",
  }),
});

export function ManageTaskGroupRankingSection() {
  const { successNotify, errorNotify } = useNotify();

  const { taskGroup, ranking } = useTaskGroupContext();

  const {
    watch,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ManageRankingFormData>({
    resolver: zodResolver(editTaskGroupSchema),
    defaultValues: {
      dueDate: new Date(),
    },
  });

  async function manageRanking(manageRankingData: ManageRankingFormData) {
    try {
      if (ranking) {
        await apiClient.patch(
          `${API_ROUTES.RANKING}/${ranking?.id}`,
          manageRankingData,
        );
      } else {
        await apiClient.post(
          `${API_ROUTES.RANKING}/${taskGroup?.id}`,
          manageRankingData,
        );
      }

      successNotify({
        message: "Ranking definido com sucesso",
      });
    } catch {
      errorNotify({
        message: "Ocorreu um erro ao definir o ranking",
      });
    }
  }

  const dueDateWatched = watch("dueDate");

  return (
    <form onSubmit={handleSubmit(manageRanking)}>
      <Section
        title="Configurar Ranking"
        text="Você pode registrar e encerrar rankings, promovendo um ambiente de produtividade e competitividade saudável entre os membros da sua equipe."
      >
        <h2 className="w-full text-right text-sm text-neutral-400">
          {ranking
            ? "O grupo de tarefas já possui um ranking ativo"
            : "Você pode ativar o ranking definindo uma data de vencimento"}
        </h2>

        <DatePicker
          date={dueDateWatched}
          onSelected={(date) => date && setValue("dueDate", date)}
          helper={errors.dueDate?.message}
        />

        <Button
          text="Definir ranking"
          size="md"
          type="submit"
          leftIcon={<Ranking />}
          isLoading={isSubmitting}
        />
      </Section>
    </form>
  );
}
