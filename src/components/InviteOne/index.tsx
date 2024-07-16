"use  client";

import { UserCirclePlus } from "@phosphor-icons/react";
import { InviteOneFormData } from "./interfaces/inviteOneFormData.interface";
import { useForm } from "react-hook-form";
import { useNotify } from "@taskfy/hooks/useNotify";
import { apiClient } from "@taskfy/services/apiClient";
import { API_ROUTES } from "@taskfy/routes/api.routes";
import { TASK_GROUP_ROLE } from "@taskfy/constants/taskGroupRole.constant";
import { useTaskGroupContext } from "@taskfy/contexts/TaskGroupContext/taskGroup.context";
import { Spinner } from "../Spinner";

export function InviteOne() {
  const { errorNotify, successNotify } = useNotify();

  const { taskGroup } = useTaskGroupContext();

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<InviteOneFormData>({
    defaultValues: {
      email: "",
    },
  });

  async function handleInviteUser({ email }: InviteOneFormData) {
    try {
      await apiClient.post(API_ROUTES.INVITE_USER_TO_TASK_GROUP, {
        email,
        taskGroupRole: TASK_GROUP_ROLE.NORMAL,
        groupId: taskGroup?.id,
      });

      reset();

      successNotify({
        message: "Convite enviado com sucesso",
      });
    } catch {
      errorNotify({
        message: "Ocorreu ao convidar o usuário",
      });
    }
  }

  return (
    <form
      className="flex flex-col gap-1 w-full"
      onSubmit={handleSubmit(handleInviteUser)}
    >
      <div className="flex items-center relative w-full">
        <input
          type="email"
          placeholder="Chame seus companheiros de tarefas"
          className={`
              text-md text-gray-50 bg-neutral-800 py-3
              w-full placeholder:text-gray-500 flex items center
              border-neutral-700 rounded-xl pl-2 border
              focus:border-emerald-500 outline-none
            `}
          {...register("email")}
        />

        <button
          type="submit"
          className={`
              flex items-center font-bold border rounded-xl
              transition-all ease-in duration-300 gap-3 text-gray-50
              px-4 text-md bg-emerald-500 border-emerald-500
              hover:bg-emerald-400 hover:border-emerald-400 h-12
              whitespace-nowrap absolute right-0 disabled:cursor-not-allowed
              disabled:bg-emerald-700 disabled:border-emerald-700
            `}

          disabled={!isDirty}
        >
          {isSubmitting ? (
            <Spinner />
          ) : (
            <>
              <UserCirclePlus className="text-2xl" />
              Convidar
            </>
          )}
        </button>
      </div>

      <p className="text-red-500 text-sm">{errors.email?.message}</p>
    </form>
  );
}
