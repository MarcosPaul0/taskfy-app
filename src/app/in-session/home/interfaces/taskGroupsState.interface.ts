import { TaskGroupResponse } from "@taskfy/interfaces/responses/taskGroupResponse.interface";

export interface TaskGroupsState {
  withParticipation: TaskGroupResponse[];
  my: TaskGroupResponse[];
}
