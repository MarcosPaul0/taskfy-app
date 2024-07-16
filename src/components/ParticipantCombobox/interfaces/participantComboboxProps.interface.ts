import { UserResponse } from "@taskfy/interfaces/responses/userResponse.interface";

export interface ParticipantComboboxProps {
  helper?: string;
  disabled?: boolean;
  value: UserResponse;
  onChange: (user: UserResponse) => void;
}
