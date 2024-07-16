import { AVATAR_SIZE } from "../constants/avatarSize.constant";

export interface AvatarProps {
  username: string;
  hasBorder?: boolean;
  showName?: boolean;
  namePosition?: "left" | "right";
  imageUrl?: string;
  size?: keyof typeof AVATAR_SIZE.image;
  onClose?: () => void;
  showCloseButton?: boolean;
}
