import { ReactNode } from "react";
import { TITLE_SIZE } from "../constants/titleSize.constant";
import { TITLE_VARIANT } from "../constants/titleVariant.constant";
import { TITLE_PADDING } from "../constants/titlePadding.constant";

export interface TitleProps {
  title: string;
  children?: ReactNode;
  size?: keyof typeof TITLE_SIZE;
  variant?: keyof typeof TITLE_VARIANT;
  padding?: keyof typeof TITLE_PADDING;
}
