"use client";

import Link from "next/link";
import { SideLinkProps } from "./interfaces/sideLinkProps.interface";
import { usePathname } from "next/navigation";

export function SideLink({ icon, text, ...rest }: SideLinkProps) {
  const pathname = usePathname();

  const isActive = pathname === rest.href;

  return (
    <Link
      className={`
        text-gray-50 py-4 px-4 duration-300
         rounded-xl hover:bg-neutral-800 font-bold
         flex items-center gap-4
         ${isActive ? "bg-neutral-800" : ""}
      `}
      {...rest}
    >
      <i className="text-3xl">{icon}</i>
      {text}
    </Link>
  );
}
