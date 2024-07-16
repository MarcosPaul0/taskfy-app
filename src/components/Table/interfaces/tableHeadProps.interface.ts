import { ReactNode, ThHTMLAttributes } from "react";

export interface TableHeadProps extends ThHTMLAttributes<HTMLTableCellElement> {
  children: ReactNode;
}
