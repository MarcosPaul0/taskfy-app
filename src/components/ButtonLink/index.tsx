import Link from "next/link";
import { Spinner } from "../Spinner";
import { BUTTON_SIZE } from "./constants/buttonSize.constant";
import { BUTTON_VARIANT } from "./constants/buttonVariant.constant";
import { BUTTON_WIDTH } from "./constants/buttonWidth.constant";
import { ButtonLinkProps } from "./interfaces/buttonLinkProps.interface";

export function ButtonLink({
  size = "sm",
  variant = "filled",
  leftIcon,
  rightIcon,
  text,
  width = "full",
  ...rest
}: ButtonLinkProps) {
  return (
    <Link
      type="button"
      className={`
        no-underline flex items-center justify-center
        font-semibold border rounded-xl text-base transition-all
        ease-in duration-300 gap-3 disabled:cursor-not-allowed
        ${BUTTON_WIDTH[width]} ${BUTTON_SIZE[size]} ${BUTTON_VARIANT[variant]}
      `}
      {...rest}
    >
      {leftIcon && <i className="text-2xl">{leftIcon}</i>}

      {text}

      {rightIcon && <i className="text-2xl">{rightIcon}</i>}
    </Link>
  );
}
