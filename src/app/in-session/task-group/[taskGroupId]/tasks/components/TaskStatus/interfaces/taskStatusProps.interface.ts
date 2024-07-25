import { TaskStatus } from "@taskfy/types/taskStaus.type";
import { TASK_STATUS_SIZE } from "../constants/taskStatusSize.constant";

export interface TaskStatusProps {
  status: TaskStatus;
  size?: keyof typeof TASK_STATUS_SIZE;
}
