import { UserResponse } from "@taskfy/interfaces/responses/userResponse.interface";
import { TaskStatus } from "@taskfy/types/taskStaus.type";

export interface TaskData {
  title: string;
  status: TaskStatus;
  points: number;
  dueDate: Date;
  owners: UserResponse[];
}
