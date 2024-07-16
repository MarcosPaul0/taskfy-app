import { RewardResponse } from "@taskfy/interfaces/responses/rewardResponse.interface";

export interface RewardRowProps {
  reward: RewardResponse;
  onClick: (reward: RewardResponse) => void
}
