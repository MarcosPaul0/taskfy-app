export const API_ROUTES = {
  USER: "/user",
  FIND_USER_BY_GROUP: "/user/by-group",
  AUTH: "/auth",

  GROUPS_WITH_PARTICIPATION: "/task-group/with/participation",
  MY_GROUPS: "/task-group/my/groups",
  TASK_GROUP: "/task-group",
  TASK_GROUP_USER: "/task-group-user",
  TASK_GROUP_BANNER: "/task-group/banner",
  NOTIFICATIONS: "/task-group-user/user",
  INVITE_USERS_TO_TASK_GROUP: "/task-group-user/send/invite-users",
  INVITE_USER_TO_TASK_GROUP: "/task-group-user/send/invite-user",
  RESPOND_INVITE: "/task-group-user/respond/invite",

  FIND_TASKS_BY_GROUP: "/task/group",
  TASK: "/task",
  
  RANKING_BY_GROUP: "/ranking/group",
  ACTIVE_RANKING: "/ranking/active",
  RANKING: "/ranking",
  
  REWARD: "/reward",
  REWARD_BY_RANKING: "/reward/ranking",
} as const;
