import { TEXT_WIDTH } from "./constants/textWidth.constant";
import { TextProps } from "./interfaces/textProps.interface";

export function Text({ text, maxWidth = "md" }: TextProps) {
  return (
    <p
      className={`
        ${TEXT_WIDTH[maxWidth]} text-base text-gray-50
      `}
    >
      {text}
    </p>
  );
}
