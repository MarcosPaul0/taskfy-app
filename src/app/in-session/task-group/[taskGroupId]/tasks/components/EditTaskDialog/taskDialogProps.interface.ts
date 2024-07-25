import { TaskResponse } from "@taskfy/interfaces/responses/taskResponse.interface";
import { ReactNode } from "react";

export interface TaskDialogProps {
  task: TaskResponse | null;
  handleClose: () => void;
}
