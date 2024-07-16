import { TaskGroupResponse } from "@taskfy/interfaces/responses/taskGroupResponse.interface";
import { UpdateTaskGroupDataParams } from "./updateTaskGroupDataParams.interface";
import { RankingResponse } from "@taskfy/interfaces/responses/rankingResponse.interface";

export interface TaskGroupContextData {
  taskGroup: TaskGroupResponse["taskGroup"] | null;
  ranking: RankingResponse | null;
  updateTaskGroupData: (
    taskGroupData: Partial<UpdateTaskGroupDataParams>,
  ) => void;
  isTaskGroupOwner: boolean;
}
