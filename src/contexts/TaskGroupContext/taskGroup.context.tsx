"use client"

import { createContext, useContext, useEffect, useState } from "react";
import { TaskGroupContextData } from "./interfaces/taskGroupContextData.interface";
import { TaskGroupContextProviderProps } from "./interfaces/taskGroupContextProviderProps.interface";
import { TaskGroupResponse } from "@taskfy/interfaces/responses/taskGroupResponse.interface";
import { useParams } from "next/navigation";
import { apiClient } from "@taskfy/services/apiClient";
import { API_ROUTES } from "@taskfy/routes/api.routes";
import { useAuthContext } from "../AuthContext/authContext.context";
import { UpdateTaskGroupDataParams } from "./interfaces/updateTaskGroupDataParams.interface";
import { RankingResponse } from "@taskfy/interfaces/responses/rankingResponse.interface";

const TaskGroupContext = createContext({} as TaskGroupContextData);

export function TaskGroupContextProvider({
  children,
}: TaskGroupContextProviderProps) {
  const { taskGroupId } = useParams();

  const { user } = useAuthContext();

  const [taskGroup, setTaskGroup] = useState<
    TaskGroupResponse["taskGroup"] | null
  >(null);
  const [ranking, setRanking] = useState<RankingResponse | null>(null);

  const isTaskGroupOwner = taskGroup?.owner.id === user?.id;

  function updateTaskGroupData(
    taskGroupData: Partial<UpdateTaskGroupDataParams>,
  ) {
    setTaskGroup((currentTaskGroupData) => {
      const updatedValue = {
        ...currentTaskGroupData,
        ...taskGroupData,
      } as TaskGroupResponse["taskGroup"];

      return updatedValue;
    });
  }

  useEffect(() => {
    (async () => {
      if (!taskGroupId) {
        setTaskGroup(null);
        return;
      }

      try {
        const taskGroupResponse = await apiClient.get(
          `${API_ROUTES.TASK_GROUP}/${taskGroupId}`,
        );

        setTaskGroup(taskGroupResponse.data);
      } catch {
        setTaskGroup(null);
      }

      try {
        const rankingResponse = await apiClient.get<RankingResponse>(
          `${API_ROUTES.ACTIVE_RANKING}/${taskGroupId}`,
        );

        const rankingData = rankingResponse.data;

        setRanking(rankingData);
      } catch {
        setRanking(null);
      }
    })();
  }, [taskGroupId]);

  return (
    <TaskGroupContext.Provider
      value={{ taskGroup, ranking, isTaskGroupOwner, updateTaskGroupData }}
    >
      {children}
    </TaskGroupContext.Provider>
  );
}

export const useTaskGroupContext = () => useContext(TaskGroupContext);
