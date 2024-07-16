import { RewardResponse } from "@taskfy/interfaces/responses/rewardResponse.interface";

export interface RewardDialogProps {
  reward: RewardResponse | null;
  handleClose: () => void
}