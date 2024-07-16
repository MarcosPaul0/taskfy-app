"use client";

import Image from "next/image";
import { APP_ROUTES } from "@taskfy/routes/app.routes";
import { SignLink } from "../SignLink";
import { usePathname } from "next/navigation";

export function Header() {
  const pathname = usePathname();

  return (
    <header
      className={`
        w-full h-16 flex items-center justify-center 
        bg-neutral-900 border-b border-neutral-950
      `}
    >
      <div
        className={`
          max-w-screen-2xl 4xl:max-w-screen-3xl w-full
          flex items-center justify-between h-full
        `}
      >
        <Image
          src="/images/taskfy-logo.svg"
          alt="Logo do Taskfy"
          width={90}
          height={25}
        />

        <nav className="flex items-center gap-10 h-full">
          <SignLink
            href={APP_ROUTES.SIGN_IN}
            isActive={pathname === APP_ROUTES.SIGN_IN}
            text="Entrar"
          />

          <SignLink
            href={APP_ROUTES.SIGN_UP}
            isActive={pathname === APP_ROUTES.SIGN_UP}
            text="Registrar-se"
          />
        </nav>
      </div>
    </header>
  );
}
