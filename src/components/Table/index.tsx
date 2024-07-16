import { TABLE_DATA_ALIGN } from "./constants/tableDataAlign.constant";
import { TableDataProps } from "./interfaces/tableDataProps.interface";
import { TableHeadProps } from "./interfaces/tableHeadProps.interface";

export function TableHead({ children, ...rest }: TableHeadProps) {
  return (
    <th
      className={`
        bg-neutral-800 py-3 px-8 text-emerald-200
          first:rounded-tl-2xl last:rounded-tr-2xl
      `}
      {...rest}
    >
      {children}
    </th>
  );
}

export function TableData({ children, align = "center" }: TableDataProps) {
  return (
    <td
      className={`
        py-3 px-8 border-t-[5px] border-neutral-950
        font-bold text-base
      `}
    >
      <div
        className={`
        flex items-center
        ${TABLE_DATA_ALIGN[align]}
        `}
      >
        {children}
      </div>
    </td>
  );
}
