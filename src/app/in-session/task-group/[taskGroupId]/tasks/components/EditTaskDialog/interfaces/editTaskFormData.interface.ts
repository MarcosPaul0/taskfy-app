import { UserResponse } from "@taskfy/interfaces/responses/userResponse.interface";
import { TaskStatus } from "@taskfy/types/taskStaus.type";

export interface EditTaskFormData {
  user: UserResponse;
  title: string;
  description: string;
  dueDate: Date;
  status: TaskStatus;
  points: number;
}
