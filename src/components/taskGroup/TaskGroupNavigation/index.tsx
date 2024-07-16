"use client";

import { CheckCircle, Gear, Medal, UsersFour } from "@phosphor-icons/react";
import { ACTIVE_TAB_OFFSET } from "./constants/activeTabOffset.constant";
import { useTaskGroupContext } from "@taskfy/contexts/TaskGroupContext/taskGroup.context";
import { TASK_GROUP_TABS } from "./constants/taskGroupTabs.constant";
import { usePathname } from "next/navigation";
import { APP_ROUTES } from "@taskfy/routes/app.routes";
import Link from "next/link";

export function TaskGroupNavigation() {
  const { taskGroup, isTaskGroupOwner } = useTaskGroupContext();

  const pathname = usePathname();

  const splittedPathname = pathname.split("/");
  const activeTab = splittedPathname[
    splittedPathname.length - 1
  ] as (typeof TASK_GROUP_TABS)[keyof typeof TASK_GROUP_TABS];

  const tasksIsActive = activeTab === TASK_GROUP_TABS.TASKS;
  const rankingIsActive = activeTab === TASK_GROUP_TABS.RANKING;
  const participantsIsActive = activeTab === TASK_GROUP_TABS.USERS;
  const editIsActive = activeTab === TASK_GROUP_TABS.CONFIG;

  const taskGroupId = taskGroup?.id;

  return (
    <nav
      className={`
        flex items-center border relative
        rounded-lg border-emerald-500 after:duration-300
        py-1 after:content-[''] after:absolute after:transition-all
        after:h-full after:w-32 after:bg-emerald-500 
        overflow-hidden after:rounded-md after:left-0 
        ${ACTIVE_TAB_OFFSET[activeTab]}
      `}
    >
      <Link
        href={`${APP_ROUTES.TASK_GROUP}${taskGroupId}${APP_ROUTES.TASKS}`}
        className={`
          flex items-center gap-2 font-semibold w-32 z-10 
          justify-center ${tasksIsActive ? "text-gray-50" : "text-emerald-500"}
        `}
      >
        <CheckCircle />
        Tarefas
      </Link>

      <Link
        href={`${APP_ROUTES.TASK_GROUP}${taskGroupId}${APP_ROUTES.RANKING}`}
        className={`
          flex items-center gap-2 font-semibold w-32 z-10
          justify-center  ${rankingIsActive ? "text-gray-50" : "text-emerald-500"}
        `}
      >
        <Medal />
        Ranking
      </Link>

      <Link
        href={`${APP_ROUTES.TASK_GROUP}${taskGroupId}${APP_ROUTES.PARTICIPANTS}`}
        type="button"
        className={`
          flex items-center gap-2 font-semibold w-32 z-10
          justify-center ${participantsIsActive ? "text-gray-50" : "text-emerald-500"}
        `}
      >
        <UsersFour />
        Usuários
      </Link>

      {isTaskGroupOwner && (
        <Link
          href={`${APP_ROUTES.TASK_GROUP}${taskGroupId}${APP_ROUTES.EDIT}`}
          className={`
            flex items-center gap-2 font-semibold w-32 z-10
            justify-center ${editIsActive ? "text-gray-50" : "text-emerald-500"}
          `}
        >
          <Gear />
          Opções
        </Link>
      )}
    </nav>
  );
}
