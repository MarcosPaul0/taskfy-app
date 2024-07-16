import { ButtonHTMLAttributes, ReactNode } from "react";
import { BUTTON_VARIANT } from "../constants/buttonVariant.constant";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: "sm" | "md" | "lg";
  variant?: keyof typeof BUTTON_VARIANT;
  text?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  width?: "full" | "fit";
  isLoading?: boolean;
}
