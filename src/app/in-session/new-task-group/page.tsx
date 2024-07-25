"use client";

import { Button } from "@taskfy/components/Button";
import { Invite } from "@taskfy/components/Invite";
import { Section } from "@taskfy/components/Section";
import { Switch } from "@taskfy/components/Switch";
import { Text } from "@taskfy/components/Text";
import { TextArea } from "@taskfy/components/TextArea";
import { TextInput } from "@taskfy/components/TextInput";
import { Title } from "@taskfy/components/Title";
import { Screen } from "@taskfy/components/Screen";
import { UsersThree } from "@phosphor-icons/react";
import { useForm } from "react-hook-form";
import { RegisterNewTaskGroupFormData } from "./interfaces/registerNewTaskGroupFormData.interface";
import { apiClient } from "@taskfy/services/apiClient";
import { API_ROUTES } from "@taskfy/routes/api.routes";
import { useNotify } from "@taskfy/hooks/useNotify";
import { APP_ROUTES } from "@taskfy/routes/app.routes";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormEvent } from "react";
import { TaskGroupResponse } from "@taskfy/interfaces/responses/taskGroupResponse.interface";

const registerNewTaskGroupSchema = z.object({
  taskGroup: z.object({
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
  }),
  usersToInvite: z.object({
    currentEmail: z.string().email("Email inválido"),
    emails: z.string().email().array(),
  }),
});

export default function NewGroupPage() {
  const { successNotify, errorNotify } = useNotify();

  const {
    register,
    setValue,
    getValues,
    watch,
    trigger,
    resetField,
    formState: { isSubmitting, errors },
  } = useForm<RegisterNewTaskGroupFormData>({
    resolver: zodResolver(registerNewTaskGroupSchema),
    defaultValues: {
      taskGroup: {
        isPrivate: false,
        primaryColor: "10b981",
      },
      usersToInvite: {
        currentEmail: "",
        emails: [],
      },
    },
  });

  async function registerNewTaskGroup(event: FormEvent): Promise<void> {
    event.preventDefault();

    try {
      const taskGroupDataIsValid = await trigger("taskGroup");

      if (!taskGroupDataIsValid) {
        return;
      }

      const registerNewTaskGroupData = getValues("taskGroup");

      const taskGroupResponse = await apiClient.post<
        TaskGroupResponse["taskGroup"]
      >(API_ROUTES.TASK_GROUP, registerNewTaskGroupData);

      successNotify({
        message: "Novo grupo registrado com sucesso",
        redirectTo: APP_ROUTES.HOME,
      });

      try {
        const inviteUsersEmailsData = getValues("usersToInvite.emails");

        const taskGroup = taskGroupResponse.data;

        await apiClient.post(API_ROUTES.INVITE_USERS_TO_TASK_GROUP, {
          groupId: taskGroup.id,
          emailList: inviteUsersEmailsData,
        });
      } catch {
        errorNotify({
          message:
            "Ocorreu um erro enviar o(s) convite(s) para compor o grupo de tarefas",
        });
      }
    } catch {
      errorNotify({
        message: "Ocorreu um erro ao registrar um novo grupo de tarefas",
      });
    }
  }

  async function addEmailToInvite() {
    const emailIsValid = await trigger("usersToInvite.currentEmail");

    if (emailIsValid) {
      const emailToAdd = getValues("usersToInvite.currentEmail");
      const currentEmailList = getValues("usersToInvite.emails");

      setValue("usersToInvite.emails", [...currentEmailList, emailToAdd]);
      resetField("usersToInvite.currentEmail");
    }
  }

  async function removeEmailToInvite(email: string) {
    const currentEmailList = getValues("usersToInvite.emails");

    setValue(
      "usersToInvite.emails",
      currentEmailList.filter((currentEmail) => currentEmail !== email),
    );
  }

  const isPrivate = watch("taskGroup.isPrivate");
  const emailList = watch("usersToInvite.emails");

  return (
    <Screen>
      <div className="flex flex-col gap-2 py-8">
        <Title title="Criar Grupo de Tarefas" />
        <Text
          text="Desenvolva um espaço exclusivo para suas tarefas! Personalize seu grupo com facilidade e comece a organizar tarefas de forma fácil e prática."
          maxWidth="lg"
        />
      </div>

      <form onSubmit={registerNewTaskGroup}>
        <Section
          title="Dados do Grupo"
          text="Personalize o nome, adicione uma descrição envolvente, escolha uma foto representativa e defina se é privado ou público. Tudo para tornar a experiência única para você e seus membros."
        >
          <TextInput
            label="Nome do grupo"
            placeholder="Defina um nome para seu grupo"
            helper={errors.taskGroup?.name?.message}
            {...register("taskGroup.name")}
          />

          <TextArea
            label="Descrição"
            placeholder="Defina uma descrição para seu grupo"
            helper={errors.taskGroup?.description?.message}
            {...register("taskGroup.description")}
          />

          <Switch
            onSwitch={(isActive) => setValue("taskGroup.isPrivate", isActive)}
            id="privateSwitch"
            label="Grupo privado"
            value={isPrivate}
          />
        </Section>

        <Section
          title="Participantes do grupo"
          text="Adicione colaboradores ao seu grupo de tarefas em apenas alguns cliques. Faça da colaboração uma experiência simples e eficiente."
        >
          <Invite
            emailInputProps={{
              helper: errors.usersToInvite?.currentEmail?.message,
              ...register("usersToInvite.currentEmail"),
            }}
            emailListProps={{
              addEmail: addEmailToInvite,
              removeEmail: removeEmailToInvite,
              emails: emailList,
            }}
          />

          <Button
            text="Adicionar novo grupo"
            size="md"
            type="submit"
            leftIcon={<UsersThree />}
            isLoading={isSubmitting}
          />
        </Section>
      </form>
    </Screen>
  );
}
