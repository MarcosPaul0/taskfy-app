import { forwardRef } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../Popover";
import { PointsComboboxProps } from "./interfaces/pointsComboboxProps.interface";
import { TaskPoints } from "../../app/in-session/task-group/[taskGroupId]/tasks/components/TaskPoints";

export const PointsCombobox = forwardRef<HTMLInputElement, PointsComboboxProps>(
  ({ helper, value, onChange, disabled }, ref) => {
    return (
      <Popover modal>
        <PopoverTrigger asChild>
          <div className="flex flex-col w-full gap-1 text-md text-gray-50 font-semibold">
            Pontos da tarefa
            <button
              type="button"
              className={`
                bg-neutral-800 text-md text-gray-500 rounded-xl px-2 py-2.5
                w-full flex items center border border-neutral-700  outline-none
                font-normal disabled:cursor-not-allowed
              `}
              disabled={disabled}
            >
              {value ? (
                <TaskPoints points={Number(value)} />
              ) : (
                "Quantidade de pontos para tarefa"
              )}
            </button>
            {helper && (
              <p className="text-xs text-red-500 h-4 font-normal">{helper}</p>
            )}
          </div>
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
            {[1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144].map((points) => (
              <button
                key={points}
                type="button"
                onClick={() => onChange(points)}
                className={`
                  py-2 px-4 hover:bg-neutral-800
                  duration-300 
                `}
              >
                <TaskPoints points={points} />
              </button>
            ))}
          </div>
        </PopoverContent>
      </Popover>
    );
  },
);
