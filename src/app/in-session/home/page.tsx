"use client";

import { Plus } from "@phosphor-icons/react";
import { Button } from "@taskfy/components/Button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@taskfy/components/Carrousel";
import { TaskGroupCard } from "@taskfy/components/tasks/TaskGroupCard";
import { Title } from "@taskfy/components/Title";
import { Screen } from "@taskfy/components/Screen";
import { APP_ROUTES } from "@taskfy/routes/app.routes";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { apiClient } from "@taskfy/services/apiClient";
import { API_ROUTES } from "@taskfy/routes/api.routes";
import { TaskGroupResponse } from "@taskfy/interfaces/responses/taskGroupResponse.interface";
import { TaskGroupsState } from "./interfaces/taskGroupsState.interface";

export default function HomePage() {
  const router = useRouter();

  const [taskGroups, setTaskGroups] = useState<TaskGroupsState>({
    my: [],
    withParticipation: [],
  });

  function redirectToNewTaskGroup() {
    router.push(APP_ROUTES.NEW_TASK_GROUP);
  }

  useEffect(() => {
    async function getMyGroups() {
      try {
        const taskGroupsResponse = await apiClient.get<TaskGroupResponse[]>(
          API_ROUTES.MY_GROUPS,
        );

        setTaskGroups((currentState) => ({
          ...currentState,
          my: taskGroupsResponse.data,
        }));
      } catch {
        setTaskGroups((currentState) => ({
          ...currentState,
          my: [],
        }));
      }
    }

    async function getGroupsWithParticipation() {
      try {
        const taskGroupsResponse = await apiClient.get<TaskGroupResponse[]>(
          API_ROUTES.GROUPS_WITH_PARTICIPATION,
        );

        setTaskGroups((currentState) => ({
          ...currentState,
          withParticipation: taskGroupsResponse.data,
        }));
      } catch {
        setTaskGroups((currentState) => ({
          ...currentState,
          withParticipation: [],
        }));
      }
    }

    (async () => {
      await Promise.all([getMyGroups(), getGroupsWithParticipation()]);
    })();
  }, []);

  return (
    <Screen items="center" gap="md">
      <Title title="Meus Grupos">
        <Button
          size="sm"
          text="Novo grupo"
          leftIcon={<Plus />}
          variant="outlined"
          width="fit"
          onClick={redirectToNewTaskGroup}
        />
      </Title>

      {taskGroups.my.length > 0 && (
        <Carousel
          className="w-full"
          opts={{
            align: "start",
            loop: true,
          }}
        >
          <CarouselContent>
            {taskGroups.my.map((taskGroup) => {
              console.log(taskGroup.taskGroup.id)

              return (
                <CarouselItem
                  className={`
                    pl-4 basis-1/1
                    lg:pl-5 lg:basis-1/2 
                    2xl:pl-11 2xl:basis-1/3
                    3xl:pl-4 3xl:basis-1/4
                  `}
                  key={taskGroup.taskGroup.id}
                >
                  <TaskGroupCard key={taskGroup.taskGroup.id} taskGroupWithParticipants={taskGroup} />
                </CarouselItem>
              )
            })}
          </CarouselContent>

          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      )}

      {taskGroups.withParticipation.length > 0 && (
        <>
          <Title title="Grupos Frequentados" />

          <Carousel
            className="w-full"
            opts={{
              align: "start",
              loop: true,
            }}
          >
            <CarouselContent>
              {taskGroups.withParticipation.map((taskGroup) => (
                <CarouselItem
                  className={`
                    pl-4 basis-1/1
                    lg:pl-5 lg:basis-1/2 
                    2xl:pl-11 2xl:basis-1/3
                    3xl:pl-4 3xl:basis-1/4
                  `}
                  key={taskGroup.taskGroup.id}
                >
                  <TaskGroupCard key={taskGroup.taskGroup.id} taskGroupWithParticipants={taskGroup} />
                </CarouselItem>
              ))}
            </CarouselContent>

            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </>
      )}
    </Screen>
  );
}
