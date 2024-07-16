import Image from "next/image";
import { TaskStatusProps } from "./interfaces/taskStatusProps.interface";
import { TASKS_STATUS_VARIANT } from "./constants/taskStatusVariant.constant";
import { TASK_STATUS_SIZE } from "./constants/taskStatusSize.constant";

export function TaskStatus({ status = "OPEN", size = "md" }: TaskStatusProps) {
  const variant = TASKS_STATUS_VARIANT[status];
  const sizeStyle = TASK_STATUS_SIZE[size];

  return (
    <span
      className={`
        text-neutral-900 font-bold rounded-xl
        flex items-center gap-4 w-fit
        ${variant.style} ${sizeStyle}
      `}
    >
      {variant.text}
      <Image alt="" src={variant.icon} width={20} height={20} />
    </span>
  );
}
