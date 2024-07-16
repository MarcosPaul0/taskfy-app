"use client";

import { APP_ROUTES } from "@taskfy/routes/app.routes";
import { SideLink } from "../SideLink";
import { Gear, House } from "@phosphor-icons/react";

export function Sidebar() {
  return (
    <aside className="bg-neutral-900 h-full max-w-64 w-full py-16 px-2">
      <nav className="flex flex-col gap-2">
        <SideLink
          icon={<House weight="bold" />}
          text="Início"
          href={APP_ROUTES.HOME}
        />
        <SideLink icon={<Gear weight="bold" />} text="Configurações" href="#" />
      </nav>
    </aside>
  );
}
