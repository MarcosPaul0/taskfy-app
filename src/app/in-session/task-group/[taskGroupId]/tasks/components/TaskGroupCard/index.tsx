import { useRouter } from "next/navigation";
import { Avatar } from "../../../../../../../components/Avatar";
import { TaskGroupCardProps } from "./interfaces/taskGroupCardProps.interface";
import { APP_ROUTES } from "@taskfy/routes/app.routes";
import Image from "next/image";
import Link from "next/link";

export function TaskGroupCard({
  taskGroupWithParticipants: { taskGroup, users },
}: TaskGroupCardProps) {
  const router = useRouter();


  return (
    <Link
      className={`
        bg-neutral-800/50 rounded-3xl overflow-hidden
        border border-neutral-800 max-w-md h-72 no-underline
        flex flex-col cursor-pointer duration-300 hover:backdrop-brightness-200
      `}
      role="button"
      href={`${APP_ROUTES.TASK_GROUP}${taskGroup.id}${APP_ROUTES.TASKS}`}
    >
      <header className="h-20 bg-emerald-500 relative">
        {taskGroup?.bannerUrl && (
          <Image
            alt="Banner"
            src={taskGroup?.bannerUrl}
            fill
            sizes=""
            className="max-h-20 max-w-md object-cover object-[50%_5%]"
          />
        )}
      </header>

      <div
        className={`
          p-5 flex flex-col 
          relative flex-1 gap-2
        `}
      >
        <h1 className="font-bold text-lg text-gray-50">{taskGroup.name}</h1>

        <p className="text-sm text-gray-200 overflow-hidden break-words whitespace-pre-line line-clamp-4">
          {taskGroup.description}
        </p>

        <div
          className={`
            flex items-center justify-between
            w-full mt-auto mb-0
          `}
        >
          <time className="text-xs text-gray-400">
            Atualizado há menos de um minuto
          </time>

          <div
            className={`
              flex items-center
            `}
          >
            {users.map((user) => (
              <Avatar
                hasBorder={false}
                showName={false}
                imageUrl={user.avatarUrl}
                username={user.name}
              />
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}
