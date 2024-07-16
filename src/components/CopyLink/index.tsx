import { Copy } from "@phosphor-icons/react";
import { InputHTMLAttributes, forwardRef, useState } from "react";

export const CopyLink = forwardRef<
  HTMLInputElement,
  InputHTMLAttributes<HTMLInputElement>
>(({ ...rest }, ref) => {
  return (
    <div
      className={`
        flex items-center relative w-full
      `}
    >
      <input
        className={`
            text-md text-gray-50 bg-neutral-800 py-3
            w-full  placeholder:text-gray-500 flex items center
            focus:border-emerald-500 outline-none pl-2
            border rounded-xl border-neutral-600
          `}
        placeholder="Link para ser copiado"
        {...rest}
        ref={ref}
      />

      <button
        type="button"
        className={`
          flex items-center font-bold border rounded-xl
          transition-all ease-in duration-300 gap-3 text-gray-50
          px-4 text-md bg-emerald-500 border-emerald-500
          hover:bg-emerald-400 hover:border-emerald-400 h-12
          whitespace-nowrap absolute right-0 disabled:cursor-not-allowed
          disabled:bg-emerald-700 disabled:border-emerald-700
        `}
      >
        <Copy className="text-2xl" />
        Copiar Link
      </button>
    </div>
  );
});
