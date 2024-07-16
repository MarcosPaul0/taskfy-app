import { forwardRef, useState } from "react";
import { InputProps } from "../TextInput/interfaces/inputProps.interface";
import { Eye, EyeSlash } from "@phosphor-icons/react";

export const PasswordInput = forwardRef<HTMLInputElement, InputProps>(
  ({ label, helper: errorMessage, ...rest }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    function handleToggleShowPassword() {
      setShowPassword((currentState) => !currentState);
    }

    return (
      <div className="flex flex-col w-full gap-1 text-md text-gray-50">
        <label className="font-semibold" htmlFor={rest.id}>
          {label}
        </label>

        <div className="flex items-center relative">
          <input
            type={showPassword ? "text" : "password"}
            className={`
              text-md text-gray-50 bg-neutral-800 py-3
              w-full  placeholder:text-gray-500 flex items center
              border-neutral-700 rounded-xl pl-2 border
              focus:border-emerald-500 outline-none
            `}
            {...rest}
            ref={ref}
          />

          <button
            className={`
          text-gray-50 text-2xl rounded-full
          hover:bg-neutral-700 p-2 h-10 duration-300
          active:bg-neutral-600 absolute right-0
        `}
            type="button"
            onClick={handleToggleShowPassword}
          >
            {showPassword ? <EyeSlash weight="bold" /> : <Eye weight="bold" />}
          </button>
        </div>
        {errorMessage && (
          <p className="text-xs text-red-500 h-4">{errorMessage}</p>
        )}
      </div>
    );
  },
);
