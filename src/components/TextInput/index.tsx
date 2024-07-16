"use  client";

import { forwardRef } from "react";
import { InputProps } from "./interfaces/inputProps.interface";

export const TextInput = forwardRef<HTMLInputElement, InputProps>(
  ({ label, helper, ...rest }, ref) => {
    return (
      <label className="flex flex-col w-full gap-1 text-md text-gray-50 font-semibold">
        {label}
        <input
          type="text"
          className={`
          bg-neutral-800 text-md text-gray-50 rounded-xl px-2 py-2.5
          w-full  placeholder:text-gray-500 flex items center border
          border-neutral-700 focus:border-emerald-500 outline-none
          font-normal disabled:cursor-not-allowed
        `}
          ref={ref}
          {...rest}
        />
        {helper && (
          <p className="text-xs text-red-500 h-4 font-normal">{helper}</p>
        )}
      </label>
    );
  },
);
