import { useAuthContext } from "@taskfy/contexts/AuthContext/authContext.context";
import { Popover, PopoverContent, PopoverTrigger } from "../Popover";
import { Avatar } from "../Avatar";
import { SignOut } from "@phosphor-icons/react";

export function UserMenu() {
  const { user, isAuthenticated, signOut } = useAuthContext();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button type="button">
          {isAuthenticated ? (
            <Avatar
              imageUrl={user?.avatarUrl}
              username={user?.name as string}
            />
          ) : (
            <Avatar imageUrl="" username="" />
          )}
        </button>
      </PopoverTrigger>

      <PopoverContent
        className="w-auto p-0 overflow-hidden"
        align="start"
        side="bottom"
      >
        <div
          className={`
            flex flex-col border-t border-neutral-800
            bg-neutral-900 shadow-lg 
            overflow-hidden overflow-y-scroll
          `}
        >
          <button
            className={`
              py-2 px-6 flex items-center gap-2
              text-red-500 hover:bg-neutral-800
              w-full
            `}
            onClick={signOut}
          >
            <SignOut />
            Sair
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
