import { TASK_STATUS } from "@taskfy/constants/taskStatus.constant";

export const TASKS_STATUS_VARIANT = {
  [TASK_STATUS.checked]: {
    style: "bg-green-200",
    text: "Fechado",
    icon: "/icons/double-check.svg",
  },
  [TASK_STATUS.concluded]: {
    style: "bg-lime-200",
    text: "Concluído",
    icon: "/icons/check.svg",
  },
  [TASK_STATUS.inProgress]: {
    style: "bg-orange-200",
    text: "Em andamento",
    icon: "/icons/fire.svg",
  },
  [TASK_STATUS.onHold]: {
    style: "bg-blue-200",
    text: "Em espera",
    icon: "/icons/sleep.svg",
  },
  [TASK_STATUS.open]: {
    style: "bg-fuchsia-200",
    text: "Aberto",
    icon: "/icons/play.svg",
  },
} as const;
