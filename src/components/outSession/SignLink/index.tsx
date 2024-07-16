import Link from "next/link";
import { SignLinkProps } from "./interfaces/signLinkProps.interface";

export function SignLink({ href, isActive, text }: SignLinkProps) {
  return (
    <Link
      href={href}
      className={`
      font-semibold text-gray-50 relative after:content-[''] after:absolute 
      after:bottom-0 after:bg-emerald-500 after:h-1
      after:w-full after:scale-x-0 hover:after:scale-x-100
      after:rounded-md after:duration-300 h-full flex items-center 
      justify-center ${isActive && "after:scale-x-100"}
    `}
    >
      {text}
    </Link>
  );
}
