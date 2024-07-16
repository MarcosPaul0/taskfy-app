import { ChangeEvent, forwardRef, useEffect, useState } from "react";
import { ParticipantComboboxProps } from "./interfaces/participantComboboxProps.interface";
import { Popover, PopoverContent, PopoverTrigger } from "../Popover";
import { Avatar } from "../Avatar";
import { MagnifyingGlass } from "@phosphor-icons/react";
import { apiClient } from "@taskfy/services/apiClient";
import { UserResponse } from "@taskfy/interfaces/responses/userResponse.interface";
import { API_ROUTES } from "@taskfy/routes/api.routes";
import { useParams } from "next/navigation";

export const ParticipantCombobox = forwardRef<
  HTMLInputElement,
  ParticipantComboboxProps
>(({ helper, onChange, value, disabled }, ref) => {
  const { taskGroupId } = useParams();

  const [participants, setParticipants] = useState<UserResponse[]>([]);
  const [participantSearch, setParticipantSearch] = useState("");

  function handleSearchParticipant(event: ChangeEvent<HTMLInputElement>) {
    setParticipantSearch(event.target.value);
  }

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      try {
        const participantsResponse = await apiClient.get<UserResponse[]>(
          `${API_ROUTES.FIND_USER_BY_GROUP}/${taskGroupId}`,
          {
            params: {
              username: participantSearch,
            },
          },
        );

        const participantsData = participantsResponse.data;

        setParticipants(participantsData);
      } catch {
        setParticipants([]);
      }
    }, 1000);

    return () => clearTimeout(delayDebounceFn);
  }, [participantSearch]);

  return (
    <Popover modal>
      <PopoverTrigger asChild>
        <label className="flex flex-col w-full gap-1 text-md text-gray-50 font-semibold">
          Proprietário
          <button
            type="button"
            className={`
              bg-neutral-800 text-md text-gray-500 rounded-xl px-2
              w-full flex items center border border-neutral-700  outline-none
              font-normal disabled:cursor-not-allowed ${value ? "py-1.5" : "py-2.5"}
            `}
            disabled={disabled}
          >
            {value ? (
              <Avatar
                key={value.id}
                imageUrl={value.avatarUrl}
                username={value.name}
                hasBorder={false}
                size="sm"
                namePosition="right"
              />
            ) : (
              "Selecione um membro do grupo"
            )}
          </button>
          {helper && (
            <p className="text-xs text-red-500 h-4 font-normal">{helper}</p>
          )}
        </label>
      </PopoverTrigger>

      <PopoverContent className="w-auto p-0 overflow-hidden">
        <div
          className={`
            bg-neutral-900 text-md text-gray-50 px-2 py-3
              w-full flex items center 
               outline-none gap-2
              font-normal
          `}
        >
          <MagnifyingGlass
            weight="bold"
            className={`
              text-gray-50 text-2xl h-full 
            `}
          />

          <input
            type="search"
            className={`  
              bg-transparent outline-none text-base
              placeholder:text-gray-400 flex-1 text-gray-50
            `}
            placeholder="Buscar membro do grupo"
            onChange={handleSearchParticipant}
            value={participantSearch}
          />
        </div>

        <div
          className={`
            flex flex-col max-h-56 border-t border-neutral-800
            overflow-hidden overflow-y-scroll
          `}
        >
          {participants.map((participant) => (
            <button
              type="button"
              key={participant.id}
              onClick={() => onChange(participant)}
              className={`
                  py-2 px-4 hover:bg-neutral-800
                  duration-300
                `}
            >
              <Avatar
                key={participant.id}
                imageUrl={participant.avatarUrl}
                username={participant.name}
                hasBorder={false}
                size="md"
                namePosition="right"
              />
            </button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
});
