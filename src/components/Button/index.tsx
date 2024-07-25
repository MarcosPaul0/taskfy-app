import { Spinner } from "../Spinner";
import { BUTTON_SIZE } from "./constants/buttonSize.constant";
import { BUTTON_VARIANT } from "./constants/buttonVariant.constant";
import { BUTTON_WIDTH } from "./constants/buttonWidth.constant";
import { ButtonProps } from "./interfaces/buttonProps.interface";

export function Button({
  size = "sm",
  variant = "filled",
  leftIcon,
  rightIcon,
  text,
  isLoading,
  width = "full",
  ...rest
}: ButtonProps) {
  return (
    <button
      type="button"
      className={`
        flex items-center justify-center font-semibold border rounded-xl text-base
        transition-all ease-in duration-300 gap-3 disabled:cursor-not-allowed
        ${BUTTON_WIDTH[width]} ${BUTTON_SIZE[size]} ${BUTTON_VARIANT[variant]}
      `}
      disabled={isLoading}
      {...rest}
    >
      {isLoading ? (
        <Spinner size={size} />
      ) : (
        <>
          {leftIcon && <i className="text-2xl">{leftIcon}</i>}

          {text}

          {rightIcon && <i className="text-2xl">{rightIcon}</i>}
        </>
      )}
    </button>
  );
}
