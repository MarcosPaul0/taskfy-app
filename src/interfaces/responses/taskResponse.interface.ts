import { TaskStatus } from "@taskfy/types/taskStaus.type";
import { UserResponse } from "./userResponse.interface";

export interface TaskResponse {
  id: string;
  user: UserResponse;
  groupId: string;
  title: string;
  description: string;
  status: TaskStatus;
  points: number;
  isActive: boolean;
  dueDate: string;
  createdAt: string;
  updatedAt: string;
}
