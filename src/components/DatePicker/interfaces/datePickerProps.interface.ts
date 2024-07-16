import { SelectSingleEventHandler } from "react-day-picker";

export interface DatePickerProps {
  helper?: string;
  date: Date | null;
  disabled?: boolean;
  onSelected: SelectSingleEventHandler;
}
