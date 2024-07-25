"use client";

import { MagnifyingGlass } from "@phosphor-icons/react";
import { SearchInputProps } from "./interfaces/searchInputProps.interface";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import { Spinner } from "../Spinner";

export function SearchInput(props: SearchInputProps) {
  const router = useRouter();

  const [search, setSearch] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  function handleSearch(event: ChangeEvent<HTMLInputElement>) {
    setSearch(event.target.value);
  }

  useEffect(() => {
    if (!search && isNaN(Number(search?.length))) {
      return;
    }

    setIsLoading(true);

    const delay = setTimeout(() => {
      if (search?.length === 0) {
        router.replace("?");
      } else {
        router.replace(`?${props.name}=${search}`);
      }

      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(delay);
  }, [search]);

  return (
    <div
      className={`
        flex items-center bg-neutral-800 min-w-80
        h-10 rounded-lg overflow-hidden 
        relative
      `}
    >
      <input
        type="search"
        className={`
        bg-transparent outline-none text-base absolute border
        placeholder:text-gray-400 flex-1 text-gray-50
        left-0 top-0 border-neutral-700 focus:border-emerald-500
        h-full w-full rounded-lg pl-2 pr-10
      `}
        {...props}
        onChange={handleSearch}
      />

      <div
        className={`
        text-gray-50 text-2xl h-full duration-200
        p-2 flex items-center justify-center ml-auto
      `}
      >
        {isLoading ? <Spinner size="sm" /> : <MagnifyingGlass weight="bold" />}
      </div>
    </div>
  );
}
