import { forwardRef } from "react";
import { TASK_STATUS } from "@taskfy/constants/taskStatus.constant";
import { TaskStatusComboboxProps } from "./interfaces/taskStatusComboboxProps.interface";
import { TaskStatus } from "../TaskStatus";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@taskfy/components/Popover";

export const TaskStatusCombobox = forwardRef<
  HTMLInputElement,
  TaskStatusComboboxProps
>(({ helper, value, onChange, disabled }, ref) => {
  return (
    <Popover modal>
      <PopoverTrigger asChild>
        <label className="flex flex-col w-full gap-1 text-md text-gray-50 font-semibold">
          Status da tarefa
          <button
            type="button"
            className={`
              bg-neutral-800 text-md text-gray-500 rounded-xl px-2 py-1.5 
              w-full flex items-center border border-neutral-700  outline-none
              font-normal disabled:cursor-not-allowed
            `}
            disabled={disabled}
          >
            {Boolean(value) ? (
              <TaskStatus status={value!} size="sm" />
            ) : (
              "Selecione us status para tarefa"
            )}
          </button>
          {helper && (
            <p className="text-xs text-red-500 h-4 font-normal">{helper}</p>
          )}
        </label>
      </PopoverTrigger>

      <PopoverContent
        className="w-auto p-0 overflow-hidden"
        align="start"
        side="bottom"
      >
        <div
          className={`
            flex flex-col max-h-56 border-t border-neutral-800
            overflow-hidden overflow-y-scroll
          `}
        >
          {Object.values(TASK_STATUS).map((status) => (
            <button
              type="button"
              key={status}
              className={`
                py-2 px-4 hover:bg-neutral-800
                duration-300
              `}
              onClick={() => onChange(status)}
            >
              <TaskStatus status={status} />
            </button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
});
