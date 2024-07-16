import { TEXT_WIDTH } from "../constants/textWidth.constant";

export interface TextProps {
  text: string;
  maxWidth?: keyof typeof TEXT_WIDTH;
}
