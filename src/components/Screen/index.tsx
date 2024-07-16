import { SCREEN_GAP } from "./constants/screenGap.constant";
import { SCREEN_ITEMS } from "./constants/screenItems.constant";
import { SCREEN_MAX_WIDTH } from "./constants/screenMaxWidth.constant";
import { SCREEN_PADDING } from "./constants/screenPadding.constant";
import { screenProps } from "./interfaces/screenProps.interface";

export function Screen({
  children,
  items = "none",
  gap = "none",
  maxWidth = "lg",
  padding = "md",
}: screenProps) {
  return (
    <div
      className={`
        flex flex-col text-gray-50
        w-full ${SCREEN_MAX_WIDTH[maxWidth]} 4xl:max-w-screen-3xl
        ${SCREEN_ITEMS[items]} ${SCREEN_GAP[gap]}  ${SCREEN_PADDING[padding]}
      `}
    >
      {children}
    </div>
  );
}
