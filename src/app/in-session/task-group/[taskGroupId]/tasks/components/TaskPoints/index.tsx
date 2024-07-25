import { Diamond } from "@phosphor-icons/react";
import { TaskPointsProps } from "./interfaces/taskPointsProps.interface";

export function TaskPoints({ points }: TaskPointsProps) {
  return (
    <span className="flex items-center gap-2 select-none text-gray-50 font-semibold">
      <Diamond size={16} weight="fill" className="text-emerald-500" />

      {points}
    </span>
  );
}
