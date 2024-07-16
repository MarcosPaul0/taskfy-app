import { UserMinus } from "@phosphor-icons/react";
import { Avatar } from "../Avatar";
import { ParticipantProps } from "./interfaces/participantProps.interface";
import { useAuthContext } from "@taskfy/contexts/AuthContext/authContext.context";
import { useTaskGroupContext } from "@taskfy/contexts/TaskGroupContext/taskGroup.context";

export function Participant({ participant, onClick }: ParticipantProps) {
  const { user } = useAuthContext();

  const { isTaskGroupOwner } = useTaskGroupContext();

  const canRemoveParticipant = isTaskGroupOwner && user?.id !== participant.id;

  return (
    <li
      className={`
        flex items-center justify-between py-2 px-4
        hover:bg-neutral-800 rounded-xl
      `}
    >
      <div className="flex items-center gap-6">
        <Avatar
          key={participant.id}
          imageUrl={participant.avatarUrl}
          username={participant.name}
          hasBorder={false}
          showName={false}
          size="xl"
        />

        <div className="flex flex-col gap-1">
          <h1 className="font-bold text-lg text-emerald-500">
            {participant.name}
          </h1>

          <h2 className="text-base text-gray-200">{participant.email}</h2>
        </div>
      </div>

      {canRemoveParticipant && (
        <div>
          <button
            type="button"
            className={`
              p-2 rounded-full bg-neutral-700 duration-300
              hover:bg-neutral-600 active:bg-neutral-500
            `}
            onClick={() => onClick(participant)}
          >
            <UserMinus size={32} />
          </button>
        </div>
      )}
    </li>
  );
}
