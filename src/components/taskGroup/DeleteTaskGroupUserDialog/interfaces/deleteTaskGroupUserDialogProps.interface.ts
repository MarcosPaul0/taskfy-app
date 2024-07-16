import { UserResponse } from "@taskfy/interfaces/responses/userResponse.interface";

export interface DeleteTaskGroupUserDialogProps {
  userToRemove: UserResponse | null;
  handleClose: () => void;
}
