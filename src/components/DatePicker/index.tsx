"use client";

import { format } from "date-fns";
import { ptBR } from "date-fns/locale/pt-BR";
import { Popover, PopoverContent, PopoverTrigger } from "../Popover";
import { Calendar } from "../Calendar";
import { useState } from "react";
import { Calendar as CalendarIcon } from "@phosphor-icons/react";
import { DatePickerProps } from "./interfaces/datePickerProps.interface";

export function DatePicker({
  onSelected,
  date,
  helper,
  disabled,
}: DatePickerProps) {
  return (
    <Popover modal>
      <PopoverTrigger asChild>
        <button
          className={`
            flex flex-col items-start w-full gap-1 text-md text-gray-50
            font-semibold disabled:cursor-not-allowed
          `}
          disabled={disabled}
        >
          <span>Data de vencimento</span>
          <div
            className={`
              bg-neutral-800 text-md rounded-xl px-2 py-2.5
              w-full flex items-center border
              border-neutral-700 focus:border-emerald-500 outline-none
              font-normal ${date ? "text-gray-50" : "text-gray-500"}
            `}
          >
            <CalendarIcon className="mr-2 text-xl" />
            {date ? (
              format(date, "PPP", {
                locale: ptBR,
              })
            ) : (
              <span>Selecione uma data</span>
            )}
          </div>
          {helper && (
            <p className="text-xs text-red-500 h-4 font-normal">{helper}</p>
          )}
        </button>
      </PopoverTrigger>

      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={onSelected}
          initialFocus
          fromDate={new Date()}
        />
      </PopoverContent>
    </Popover>
  );
}
