import { UserResponse } from "./userResponse.interface";

export interface TaskGroupResponse {
  taskGroup: {
    id: string;
    name: string;
    description: string;
    primaryColor: string;
    isPrivate: boolean;
    bannerUrl?: string;
    createdAt: string;
    updatedAt: string;
    owner: UserResponse;
  };
  users: UserResponse[];
}
