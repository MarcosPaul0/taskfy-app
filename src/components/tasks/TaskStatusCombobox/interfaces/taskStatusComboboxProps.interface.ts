import { TaskStatus } from "@taskfy/types/taskStaus.type";

export interface TaskStatusComboboxProps {
  helper?: string;
  value?: TaskStatus;
  disabled?: boolean;
  onChange: (value: TaskStatus) => void;
}
