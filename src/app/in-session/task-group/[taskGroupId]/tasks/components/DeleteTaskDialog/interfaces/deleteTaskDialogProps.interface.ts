import { TaskResponse } from "@taskfy/interfaces/responses/taskResponse.interface";

export interface IDeleteTaskDialogProps {
  isOpen: boolean;
  task: TaskResponse | null;
  handleClose: () => void;
  onDelete: () => void;
}
