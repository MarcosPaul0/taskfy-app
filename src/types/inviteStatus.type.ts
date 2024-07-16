import { INVITE_STATUS } from "@taskfy/constants/inviteStatus.constant";

export type InviteStatus = (typeof INVITE_STATUS)[keyof typeof INVITE_STATUS];
