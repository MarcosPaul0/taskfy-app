"use client";

import Image from "next/image";

import { Poppins } from "next/font/google";
import { TextInput } from "@taskfy/components/TextInput";
import { Button } from "@taskfy/components/Button";
import { SignIn } from "@phosphor-icons/react";
import { PasswordInput } from "@taskfy/components/PasswordInput";
import { useForm } from "react-hook-form";
import { SignInFormData } from "./interfaces/signInFormData.interface";
import { useAuthContext } from "@taskfy/contexts/AuthContext/authContext.context";
import { Screen } from "@taskfy/components/Screen";

const poppins = Poppins({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
});

export default function SignInPage() {
  const { signIn } = useAuthContext();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormData>();

  return (
    <Screen gap="lg" maxWidth="md" padding="none">
      <div className={`flex flex-col gap-5 mt-16 ${poppins.className}`}>
        <h1 className="font-bold text-emerald-500 text-4xl">
          Simplifique o gerenciamento de tarefas em grupo!
        </h1>
        <h2 className="font-medium text-gray-300 text-2xl max-w-3xl">
          Desfrute da praticidade de colaborar e organizar suas atividades em
          equipe
        </h2>
      </div>

      <div className="flex items-center justify-between gap-7 ">
        <Image src="/images/tasks-check.svg" height={575} width={575} alt="" />

        <form
          onSubmit={handleSubmit(signIn)}
          className={`
          bg-neutral-900 px-14 py-14 rounded-3xl max-w-lg
            w-full flex flex-col gap-8
          `}
        >
          <div className="flex flex-col gap-6">
            <TextInput
              label="Email"
              placeholder="Digite seu email"
              type="email"
              helper={errors.email?.message}
              {...register("email")}
            />
            <PasswordInput
              label="Senha"
              placeholder="Digite sua senha"
              id="passwordInput"
              helper={errors.password?.message}
              {...register("password")}
            />
          </div>

          <Button
            leftIcon={<SignIn />}
            text="Entrar"
            size="md"
            type="submit"
            isLoading={isSubmitting}
          />
        </form>
      </div>
    </Screen>
  );
}
