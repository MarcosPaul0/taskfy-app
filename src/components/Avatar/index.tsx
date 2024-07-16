import Image from "next/image";
import { AvatarProps } from "./interfaces/avatarProps.interface";
import { AVATAR_SIZE } from "./constants/avatarSize.constant";
import { X } from "@phosphor-icons/react";

export function Avatar({
  username,
  imageUrl,
  hasBorder = true,
  showName = true,
  size = "sm",
  namePosition = "left",
  showCloseButton = false,
  onClose,
}: AvatarProps) {
  const splittedName = username ? username.split(" ") : [""];
  const initials =
    splittedName.length > 1
      ? `${splittedName[0].charAt(0)}${splittedName[1].charAt(0)}`
      : splittedName[0].slice(0, 2).toUpperCase();

  return (
    <div className="flex items-center gap-2 relative" title={username}>
      {showName && namePosition === "left" && (
        <span className="font-semibold text-gray-50">{username}</span>
      )}

      <div
        className={`
          rounded-full overflow-hidden
          ${hasBorder ? "border-2 border-emerald-500 p-0.5" : "border-0"}
        `}
      >
        {imageUrl ? (
          <Image
            alt={username}
            src={imageUrl}
            width={AVATAR_SIZE.image[size]}
            height={AVATAR_SIZE.image[size]}
            className={`
              rounded-full min-h-8 min-w-8
              object-cover
            `}
          />
        ) : (
          <div
            className={`
              flex items-center justify-center rounded-full
              bg-neutral-700 font-bold text-md text-gray-200
              ${AVATAR_SIZE.padding[size]}
            `}
          >
            {initials}
          </div>
        )}
      </div>

      {showName && namePosition === "right" && (
        <span className="font-semibold text-gray-50">{username}</span>
      )}

      {showCloseButton && (
        <button
          type="button"
          className={`
            w-4 h-4 bg-neutral-800 text-neutral-500
            absolute top-0 right-0 z-10 rounded-full
            flex items-center justify-center text-xs
            hover:bg-neutral-700 active:bg-neutral-600
            duration-300
          `}
          onClick={onClose}
        >
          <X weight="bold" />
        </button>
      )}
    </div>
  );
}
