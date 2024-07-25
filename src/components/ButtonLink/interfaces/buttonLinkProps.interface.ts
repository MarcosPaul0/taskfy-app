import { ReactNode } from "react";
import { BUTTON_VARIANT } from "../constants/buttonVariant.constant";
import { LinkProps } from "next/link";

export interface ButtonLinkProps extends LinkProps {
  size?: "sm" | "md" | "lg";
  variant?: keyof typeof BUTTON_VARIANT;
  text?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  width?: "full" | "fit";
}
