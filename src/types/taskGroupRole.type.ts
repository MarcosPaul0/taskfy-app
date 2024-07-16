import { TASK_GROUP_ROLE } from "@taskfy/constants/taskGroupRole.constant";

export type TaskGroupRole =
  (typeof TASK_GROUP_ROLE)[keyof typeof TASK_GROUP_ROLE];
