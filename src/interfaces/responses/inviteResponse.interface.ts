import { InviteStatus } from "@taskfy/types/inviteStatus.type";
import { TaskGroupRole } from "@taskfy/types/taskGroupRole.type";

export interface InviteResponse {
  id: string;
  taskGroupRole: TaskGroupRole;
  inviteStatus?: InviteStatus;
  createdAt: string;
  updatedAt: string;
  taskGroup: {
    id: string;
    name: string;
    description: string;
  };
}
