"use client";

import { useQuery } from "@tanstack/react-query";
import { CopyLink } from "@taskfy/components/CopyLink";
import { DeleteTaskGroupUserDialog } from "@taskfy/components/taskGroup/DeleteTaskGroupUserDialog";
import { InviteOne } from "@taskfy/components/InviteOne";
import { Participant } from "@taskfy/components/Participant";
import { useTaskGroupContext } from "@taskfy/contexts/TaskGroupContext/taskGroup.context";
import { UserResponse } from "@taskfy/interfaces/responses/userResponse.interface";
import { API_ROUTES } from "@taskfy/routes/api.routes";
import { apiClient } from "@taskfy/services/apiClient";
import { useState } from "react";

export default function ParticipantsPage() {
  const { taskGroup } = useTaskGroupContext();

  const [participantToRemove, setParticipantToRemove] =
    useState<UserResponse | null>(null);

  function handleOpenRemoveParticipantDialog(user: UserResponse) {
    setParticipantToRemove(user);
  }

  function handleCloseRemoveParticipantDialog() {
    setParticipantToRemove(null);
  }

  const { data: participants } = useQuery({
    queryKey: ["participants", taskGroup?.id],
    queryFn: async () => {
      try {
        if (!taskGroup?.id) {
          return [];
        }

        const participantsResponse = await apiClient.get<UserResponse[]>(
          `${API_ROUTES.FIND_USER_BY_GROUP}/${taskGroup?.id}`,
        );

        return participantsResponse.data;
      } catch {
        return [];
      }
    },
    initialData: [],
  });

  return (
    <>
      <DeleteTaskGroupUserDialog
        userToRemove={participantToRemove}
        handleClose={handleCloseRemoveParticipantDialog}
      />

      <div className="flex items-start gap-6">
        <InviteOne />
        <CopyLink />
      </div>

      <ul className="list-none flex flex-col gap-2">
        {participants.map((participant) => (
          <Participant
            onClick={handleOpenRemoveParticipantDialog}
            key={participant.id}
            participant={{
              createdAt: participant.createdAt,
              email: participant.email,
              id: participant.id,
              isActive: true,
              name: participant.name,
              role: participant.role,
              updatedAt: participant.updatedAt,
              avatarUrl: participant.avatarUrl,
            }}
          />
        ))}
      </ul>
    </>
  );
}
