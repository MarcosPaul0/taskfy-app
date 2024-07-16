"use  client";

import { forwardRef } from "react";
import { TextAreaProps } from "./interfaces/textAreaProps.interface";

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ label, helper, ...rest }, ref) => {
    return (
      <label className="flex flex-col gap-1 text-md text-gray-50 font-semibold w-full">
        {label}
        <textarea
          className={`
          bg-neutral-800 text-md text-gray-50 rounded-xl px-2 py-2.5
          w-full  placeholder:text-gray-500 flex items center border
          border-neutral-700 focus:border-emerald-500 outline-none
          font-normal min-h-28 disabled:cursor-not-allowed
        `}
          {...rest}
          ref={ref}
        />
        {helper && (
          <p className="text-xs text-red-500 h-4 font-normal">{helper}</p>
        )}
      </label>
    );
  },
);
