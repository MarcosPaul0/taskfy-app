import { FormHTMLAttributes, ReactNode } from "react";
import { TITLE_VARIANT } from "../../Title/constants/titleVariant.constant";

export interface SectionProps {
  title: string;
  text: string;
  children: ReactNode;
  variant?: keyof typeof TITLE_VARIANT;
}
