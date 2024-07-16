import Image from "next/image";
import { UserImageProps } from "./interfaces/userImageProps.interface";

export function UserImage({ username, imageUrl }: UserImageProps) {
  const splittedName = username ? username.split(" ") : [""];
  const initials =
    splittedName.length > 0
      ? `${splittedName[0].charAt(0)}${splittedName[1].charAt(0)}`
      : splittedName[0].slice(0, 2);

  return (
    <div className="flex items-center gap-2 relative">
      <div
        className={`
          rounded-full overflow-hidden
          border-2 border-emerald-500 p-0.5
        `}
      >
        {imageUrl ? (
          <Image
            alt={username}
            src={imageUrl}
            width={78}
            height={78}
            className={`
              rounded-full min-h-8 min-w-8
              object-cover
            `}
          />
        ) : (
          <div
            className={`
              min-h-8 min-w-8 flex items-center
              justify-center rounded-full bg-neutral-800
              font-bold text-lg
            `}
          >
            {initials}
          </div>
        )}
      </div>
    </div>
  );
}
