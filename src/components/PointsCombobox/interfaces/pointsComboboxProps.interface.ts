import { InputHTMLAttributes } from "react";

export interface PointsComboboxProps {
  helper?: string;
  value?: number;
  onChange: (value: number) => void;
  disabled?: boolean;
}
