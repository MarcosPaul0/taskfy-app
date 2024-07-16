"use client";

import Image from "next/image";
import { SearchInput } from "@taskfy/components/SearchInput";
import { UserMenu } from "@taskfy/components/UserMenu";
import Link from "next/link";
import { APP_ROUTES } from "@taskfy/routes/app.routes";
import { Notification } from "@taskfy/components/Notification";

export function Header() {
  return (
    <header
      className={`
        w-full h-16 flex items-center justify-center 
        bg-neutral-900 border-b border-neutral-950
      `}
    >
      <div
        className={`
          max-w-screen-2xl 4xl:max-w-screen-3xl px-8
          2xl:px-0 w-full flex items-center justify-between
        `}
      >
        <Link href={APP_ROUTES.HOME}>
          <Image
            src="/images/taskfy-logo.svg"
            alt="Logo do Taskfy"
            width={90}
            height={25}
          />
        </Link>

        <SearchInput placeholder="Buscar grupo de tarefas" />

        <div className="flex items-center gap-6">
          <Notification />

          <UserMenu />
        </div>
      </div>
    </header>
  );
}
