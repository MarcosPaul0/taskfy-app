import { ListMagnifyingGlass } from "@phosphor-icons/react";
import { TableData } from "../Table";
import { RewardRowProps } from "./interfaces/rewardRowProps.interface";

export function RewardRow({ reward, onClick }: RewardRowProps) {
  return (
    <tr
      className={`
        bg-neutral-800 hover:bg-neutral-700 duration-300
        h-18
      `}
      role="button"
      onClick={() => onClick(reward)}
    >
      <TableData>{reward.position}</TableData>

      <TableData>{reward.title}</TableData>

      <TableData>
        <ListMagnifyingGlass size={32} className="text-emerald-500" />
      </TableData>
    </tr>
  );
}
