import { ArrowBendUpRight } from "@phosphor-icons/react";
import Image from "next/image";
import { Button } from "../../components/Button";
import { useRouter } from "next/navigation";
import { APP_ROUTES } from "@taskfy/routes/app.routes";

export async function Hero() {
  const router = useRouter();

  function redirectToSignUp() {
    router.push(APP_ROUTES.SIGN_UP);
  }

  return (
    <section className="px-40 my-40">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-10 w-1/3">
          <h1 className="font-bold text-emerald-500 text-6xl">
            Conquiste Metas Juntos!
          </h1>

          <p className="text-gray-50 text-xl pr-14">
            Simplifique o gerenciamento de tarefas em grupo de forma simples e
            gratuita. Registre-se agora para começar a transformar tarefas em
            conquistas coletivas!
          </p>

          <Button
            text="Experimente Agora"
            leftIcon={<ArrowBendUpRight weight="bold" />}
            onClick={redirectToSignUp}
            width="fit"
          />
        </div>

        <div className="flex items-end gap-5 relative">
          <span
            className={`
              absolute w-full h-72 bg-emerald-500 self-center rounded-full
              opacity-10 blur-3xl z-0
            `}
          />

          <div className="bg-emerald-200 py-16 px-9 rounded-3xl z-10">
            <Image
              src="/images/group-work.svg"
              alt=""
              width={293}
              height={332.867}
            />
          </div>

          <div className="z-10">
            <span className="flex max-w-10 text-5xl mb-8 text-gray-50">
              O Poder da Colaboração
            </span>

            <div className="bg-neutral-950 py-10 pl-9 rounded-3xl">
              <Image src="/images/tasks.svg" alt="" width={365} height={181} />
            </div>
          </div>
        </div>
      </div>

      <div
        className={`
            w-full p-8 rounded-3xl border border-neutral-700 flex
            justify-center items-center -rotate-1 mt-40 gap-5
          `}
      >
        <Image
          src="/images/points.svg"
          alt=""
          width={40.6108}
          height={36.0427}
        />

        <strong className="text-2xl text-gray-50">
          Gerencie tarefas em grupo de forma simples e gratuita
        </strong>

        <Image
          src="/images/points.svg"
          alt=""
          width={40.6108}
          height={36.0427}
        />
      </div>
    </section>
  );
}
