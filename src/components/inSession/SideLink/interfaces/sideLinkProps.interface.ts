import { LinkProps } from "next/link";
import { ReactNode } from "react";

export interface SideLinkProps extends LinkProps {
  icon: ReactNode;
  text: string;
}
