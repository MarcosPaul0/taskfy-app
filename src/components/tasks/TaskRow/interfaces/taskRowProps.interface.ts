import { TaskResponse } from "@taskfy/interfaces/responses/taskResponse.interface";

export interface TaskRowProps {
  task: TaskResponse;
  rounded?: boolean;
  onClick: (task: TaskResponse) => void;
}
