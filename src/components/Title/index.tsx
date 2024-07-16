import { TITLE_PADDING } from "./constants/titlePadding.constant";
import { TITLE_SIZE } from "./constants/titleSize.constant";
import { TITLE_VARIANT } from "./constants/titleVariant.constant";
import { TitleProps } from "./interfaces/titleProps.interface";

export function Title({
  title,
  children,
  size = "md",
  variant = "normal",
  padding = "none",
}: TitleProps) {
  return (
    <div
      className={`
        w-full flex items-center justify-between 
        ${TITLE_PADDING[padding]}
      `}
    >
      <h1
        className={`
          font-bold
          ${TITLE_SIZE[size]}
          ${TITLE_VARIANT[variant]}
        `}
      >
        {title}
      </h1>

      {children}
    </div>
  );
}
