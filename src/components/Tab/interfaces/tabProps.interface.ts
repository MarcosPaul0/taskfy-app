import { ButtonHTMLAttributes, ReactNode } from "react";

export interface ITabProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  icon: ReactNode;
  isActive?: boolean;
}
