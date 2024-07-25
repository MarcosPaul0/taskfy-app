import { ReactNode } from "react";

export interface TaskDialogProps {
  isOpen: boolean;
  handleChangeIsOpen: (isOpen: boolean) => void;
  refetchTasks: () => Promise<void>;
}
