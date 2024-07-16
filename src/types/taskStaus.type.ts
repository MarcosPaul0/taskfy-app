import { TASK_STATUS } from "@taskfy/constants/taskStatus.constant";

export type TaskStatus = (typeof TASK_STATUS)[keyof typeof TASK_STATUS];
