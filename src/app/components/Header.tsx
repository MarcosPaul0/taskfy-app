import { ArrowBendUpRight } from "@phosphor-icons/react";
import Image from "next/image";
import { Button } from "../../components/Button";
import { useRouter } from "next/navigation";
import { APP_ROUTES } from "@taskfy/routes/app.routes";

export async function Header() {
  const router = useRouter();

  function redirectToSignIn() {
    router.push(APP_ROUTES.SIGN_IN);
  }

  function redirectToSignUp() {
    router.push(APP_ROUTES.SIGN_UP);
  }

  return (
    <header
      className={`
      w-full px-32 h-24 flex items-center justify-between
      bg-opacity-20 bg-neutral-950
    `}
    >
      <Image
        src="/images/taskfy-logo.svg"
        alt="Logo do Taskfy"
        width={90}
        height={27.35}
      />

      <nav className="flex items-center gap-10">
        <button
          type="button"
          className="font-bold text-gray-50"
          onClick={redirectToSignIn}
        >
          Entrar
        </button>

        <Button
          variant="outlined"
          text="Registrar-se"
          leftIcon={<ArrowBendUpRight weight="bold" />}
          onClick={redirectToSignUp}
        />
      </nav>
    </header>
  );
}
