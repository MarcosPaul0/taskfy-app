import { ReactNode } from "react";
import { SCREEN_ITEMS } from "../constants/screenItems.constant";
import { SCREEN_GAP } from "../constants/screenGap.constant";
import { SCREEN_MAX_WIDTH } from "../constants/screenMaxWidth.constant";
import { SCREEN_PADDING } from "../constants/screenPadding.constant";

export interface screenProps {
  children: ReactNode;
  items?: keyof typeof SCREEN_ITEMS;
  gap?: keyof typeof SCREEN_GAP;
  maxWidth?: keyof typeof SCREEN_MAX_WIDTH;
  padding?: keyof typeof SCREEN_PADDING;
}
