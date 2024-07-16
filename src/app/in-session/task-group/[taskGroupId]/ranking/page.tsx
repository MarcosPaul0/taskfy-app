"use client";

import { Plus } from "@phosphor-icons/react";
import { useQuery } from "@tanstack/react-query";
import { Avatar } from "@taskfy/components/Avatar";
import { NewRewardDialog } from "@taskfy/components/taskGroup/NewRewardDialog";
import { RankingRow } from "@taskfy/components/RankingRow";
import { RewardRow } from "@taskfy/components/RewardRow";
import { TableHead } from "@taskfy/components/Table";
import { useTaskGroupContext } from "@taskfy/contexts/TaskGroupContext/taskGroup.context";
import { useDialog } from "@taskfy/hooks/useDialog";
import { RewardResponse } from "@taskfy/interfaces/responses/rewardResponse.interface";
import { API_ROUTES } from "@taskfy/routes/api.routes";
import { apiClient } from "@taskfy/services/apiClient";
import { useState } from "react";
import { RewardDialog } from "@taskfy/components/taskGroup/RewardDialog";

export default function TaskRankingPage() {
  const { ranking, isTaskGroupOwner } = useTaskGroupContext();

  const [activeReward, setActiveReward] = useState<RewardResponse | null>(null);

  function handleActiveReward(reward: RewardResponse) {
    setActiveReward(reward);
  }

  function handleClearActiveReward() {
    setActiveReward(null);
  }

  const podium = ranking ? ranking.userPlacementList : [];

  const firstPlace = podium.length > 0 && podium[0].user;
  const secondPlace = podium.length > 1 && podium[1].user;
  const thirdPlace = podium.length > 2 && podium[2].user;

  const {
    close: handleCloseNewRewardDialog,
    open: handleOpenNewRewardDialog,
    isOpen: newRewardDialogIsOpen,
  } = useDialog();

  const { data: rewards, refetch } = useQuery<RewardResponse[]>({
    queryKey: ["rewards", ranking?.id],
    queryFn: async () => {
      try {
        if (!ranking) {
          return [];
        }

        const rewardsResponse = await apiClient.get<RewardResponse[]>(
          `${API_ROUTES.REWARD_BY_RANKING}/${ranking?.id}`,
        );

        return rewardsResponse.data;
      } catch {
        return [];
      }
    },
    initialData: [],
  });

  async function refetchRewards() {
    await refetch();
  }

  return (
    <>
      <NewRewardDialog
        refetchRewards={refetchRewards}
        handleChangeIsOpen={handleCloseNewRewardDialog}
        isOpen={newRewardDialogIsOpen}
      />

      <div
        className={`
          flex flex-col items-center gap-8
          max-w-[660px] w-full self-center
        `}
      >
        <div className="w-full flex items-center justify-around">
          {secondPlace && (
            <Avatar
              imageUrl={secondPlace.avatarUrl}
              username={secondPlace.name}
              showName={false}
              size="lg"
            />
          )}
          {firstPlace && (
            <Avatar
              imageUrl={firstPlace.avatarUrl}
              username={firstPlace.name}
              showName={false}
              size="lg"
            />
          )}
          {thirdPlace && (
            <Avatar
              imageUrl={thirdPlace.avatarUrl}
              username={thirdPlace.name}
              showName={false}
              size="lg"
            />
          )}
        </div>

        <div className="flex items-end w-full">
          <span className="w-full h-52 bg-gradient-to-r from-emerald-300 to-emerald-500 rounded-t-3xl" />
          <span className="w-full h-64   bg-gradient-to-r from-emerald-300 to-emerald-500 rounded-t-3xl" />
          <span className="w-full h-44 bg-gradient-to-r from-emerald-300 to-emerald-500 rounded-t-3xl" />
        </div>
      </div>

      <div className="w-full flex items-start gap-6">
        <table className="border-collapse flex-1">
          <thead>
            <tr>
              <TableHead colSpan={4}>Colocação dos Participantes</TableHead>
            </tr>
          </thead>

          <tbody>
            {ranking?.userPlacementList?.map((userPlacement) => (
              <RankingRow
                userPlacement={userPlacement}
                key={userPlacement.id}
              />
            ))}
          </tbody>
        </table>

        <RewardDialog reward={activeReward} handleClose={handleClearActiveReward}  />

        <table className="border-collapse w-1/3">
          <thead>
            <tr>
              <TableHead colSpan={3}>Recompensas</TableHead>
            </tr>
          </thead>

          <tbody>
            {rewards.map((reward) => (
              <RewardRow
                key={reward.id}
                reward={reward}
                onClick={handleActiveReward}
              />
            ))}

            {isTaskGroupOwner && (
              <tr
                role="button"
                className={`
                  bg-neutral-800 hover:bg-neutral-700 duration-300
                  h-18
                `}
                onClick={handleOpenNewRewardDialog}
              >
                <td
                  colSpan={3}
                  className={`
                  py-3 px-8 border-t-[5px] border-neutral-950
                  font-bold text-base  
                `}
                >
                  <span className="flex justify-center items-center gap-3">
                    <Plus size={24} />
                    Nova recompensa
                  </span>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
