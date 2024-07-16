"use  client";

import { forwardRef } from "react";
import { UserCirclePlus } from "@phosphor-icons/react";
import { Avatar } from "../Avatar";
import { InviteProps } from "./interfaces/inviteProps.interface";

export const Invite = forwardRef<HTMLInputElement, InviteProps>(
  (
    {
      emailInputProps: { helper, ...rest },
      emailListProps: { emails, addEmail, removeEmail },
    },
    ref,
  ) => {
    return (
      <>
        <div className="flex flex-col gap-1 w-full">
          <div className="flex items-center relative w-full">
            <input
              type="email"
              placeholder="Chame seus companheiros de tarefas"
              className={`
                text-md text-gray-50 bg-neutral-800 py-3
                w-full placeholder:text-gray-500 flex items center
                border-neutral-700 rounded-xl pl-2 border
                focus:border-emerald-500 outline-none
              `}
              ref={ref}
              {...rest}
            />

            <button
              type="button"
              onClick={addEmail}
              className={`
                flex items-center font-bold border rounded-xl
                transition-all ease-in duration-300 gap-3 text-gray-50
                px-4 text-md bg-emerald-500 border-emerald-500
                hover:bg-emerald-400 hover:border-emerald-400 h-12
                whitespace-nowrap absolute right-0
              `}
            >
              <UserCirclePlus className="text-2xl" />
              Convidar
            </button>
          </div>

          <p className="text-red-500 text-sm">{helper}</p>
        </div>

        <div className="w-full flex items-center gap-2">
          {emails.map((email) => {
            const [firstPart] = email.split("@");

            return (
              <Avatar
                username={firstPart}
                hasBorder={false}
                showName={false}
                size="lg"
                showCloseButton
                onClose={() => removeEmail(email)}
              />
            );
          })}
        </div>
      </>
    );
  },
);
