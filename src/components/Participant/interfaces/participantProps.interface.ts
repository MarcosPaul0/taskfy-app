import { UserResponse } from "@taskfy/interfaces/responses/userResponse.interface";

export interface ParticipantProps {
  participant: UserResponse;
  onClick: (participant: UserResponse) => void;
}
