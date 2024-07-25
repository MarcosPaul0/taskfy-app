import { ArrowBendUpRight } from "@phosphor-icons/react";
import Image from "next/image";
import { Button } from "../../components/Button";
import { useRouter } from "next/navigation";
import { APP_ROUTES } from "@taskfy/routes/app.routes";

export function Platform() {
  const router = useRouter();

  function redirectToSignUp() {
    router.push(APP_ROUTES.SIGN_UP);
  }

  return (
    <section className="px-40 my-52 flex items-center justify-between">
      <Image src="/images/platform.png" alt="" width={623} height={380} />

      <div className="flex flex-col gap-10 w-1/3">
        <h1 className="font-bold text-emerald-500 text-6xl">
          Sua Jornada Começa Aqui!
        </h1>

        <p className="text-gray-50 text-xl pr-14">
          Libere o potencial do trabalho em equipe! Com o Taskfy, gerenciar
          tarefas em grupo nunca foi tão simples. Registre-se agora e comece a
          conquistar objetivos coletivos.
        </p>

        <Button
          text=" Comece a Utilizar"
          leftIcon={<ArrowBendUpRight weight="bold" />}
          onClick={redirectToSignUp}
          width="fit"
        />
      </div>
    </section>
  );
}
