import { MagnifyingGlass } from "@phosphor-icons/react";
import { useState } from "react";
import { SearchInputProps } from "./interfaces/searchInputProps.interface";

export function SearchInput(props: SearchInputProps) {
  const [isFocused, setIsFocused] = useState(false);

  function handleFocus() {
    setIsFocused(true);
  }

  function handleBlur() {
    setIsFocused(false);
  }

  return (
    <div
      className={`
          flex items-center bg-neutral-800 min-w-80
          h-10 pl-2 rounded-lg overflow-hidden border
          ${isFocused ? "border-emerald-500" : "border-neutral-700"}
        `}
    >
      <input
        type="search"
        className={`
          bg-transparent outline-none text-base
          placeholder:text-gray-400 flex-1 text-gray-50
        `}
        {...props}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />

      <button
        type="button"
        className={`
          text-gray-50 text-2xl h-full duration-200
          hover:bg-neutral-700 p-2 active:bg-neutral-600
          flex items-center justify-center
        `}
      >
        <MagnifyingGlass weight="bold" />
      </button>
    </div>
  );
}
