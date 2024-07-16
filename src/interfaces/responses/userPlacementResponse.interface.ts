import { UserResponse } from "./userResponse.interface";

export interface UserPlacementResponse {
  id: string;
  points: number;
  user: UserResponse;
}
