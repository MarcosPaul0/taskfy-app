import { ReactNode } from "react";
import { TABLE_DATA_ALIGN } from "../constants/tableDataAlign.constant";

export interface TableDataProps {
  children: ReactNode;
  align?: keyof typeof TABLE_DATA_ALIGN;
}
