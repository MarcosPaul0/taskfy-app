import { UserPlacementResponse } from "./userPlacementResponse.interface";

export interface RankingResponse {
  id: string;
  groupId: string;
  dueDate: string;
  createdAt: string;
  updatedAt: string;
  userPlacementList: UserPlacementResponse[];
}
