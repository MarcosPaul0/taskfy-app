import { TASK_GROUP_TABS } from "./taskGroupTabs.constant";

export const ACTIVE_TAB_OFFSET = {
  [TASK_GROUP_TABS.TASKS]: "after:translate-x-0",
  [TASK_GROUP_TABS.RANKING]: "after:translate-x-32",
  [TASK_GROUP_TABS.USERS]: "after:translate-x-64",
  [TASK_GROUP_TABS.CONFIG]: "after:translate-x-96",
} as const;
