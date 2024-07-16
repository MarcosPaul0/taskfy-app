"use  client";

import { Info } from "@phosphor-icons/react";
import { SwitchProps } from "./interfaces/switchProps.interface";

export function Switch({ label, onSwitch, id, value }: SwitchProps) {
  return (
    <div
      className={`
        flex items-center gap-2
      `}
    >
      <button
        id={id}
        className={`
          relative w-12 h-6 border border-emerald-500
          rounded-full after:content-[''] after:absolute
          after:rounded-full after:top-0 after:h-full 
          after:w-6 after:duration-300 duration-300
          ${
            !value
              ? `after:bg-emerald-900 hover:after:bg-emerald-800 
                  after:left-[22px] bg-emerald-400 active:after:bg-emerald-700`
              : `after:bg-neutral-600 hover:after:bg-neutral-500
                  after:left-0 active:after:bg-neutral-400`
          }
        `}
        type="button"
        onClick={() => onSwitch(!value)}
      />

      {label && (
        <label
          className={`
          font-semibold text-base text-gray-50
        `}
          htmlFor={id}
        >
          {label}
        </label>
      )}

      <Info className="text-2xl text-emerald-500" />
    </div>
  );
}
