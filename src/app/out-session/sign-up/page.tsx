"use client";

import Image from "next/image";

import { Poppins } from "next/font/google";
import { TextInput } from "@taskfy/components/TextInput";
import { Button } from "@taskfy/components/Button";
import { PasswordInput } from "@taskfy/components/PasswordInput";
import { useForm } from "react-hook-form";
import { SignUpFormData } from "./interfaces/signUpFormData.interface";
import { API_ROUTES } from "@taskfy/routes/api.routes";
import { apiClient } from "@taskfy/services/apiClient";
import { useNotify } from "@taskfy/hooks/useNotify";
import { Screen } from "@taskfy/components/Screen";
import { APP_ROUTES } from "@taskfy/routes/app.routes";

const poppins = Poppins({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
});

export default function SignUpPage() {
  const { successNotify, errorNotify } = useNotify();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>();

  async function submitSignUpData(signUpData: SignUpFormData) {
    try {
      await apiClient.post(API_ROUTES.USER, {
        name: signUpData.name,
        email: signUpData.email,
        password: signUpData.password,
      });

      successNotify({
        message: "Usuário cadastrado com sucesso!",
        redirectTo: APP_ROUTES.SIGN_IN,
      });
    } catch {
      errorNotify({
        message: "Erro ao cadastrar usuário!",
      });
    }
  }

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
          className={`
          bg-neutral-900 px-14 py-14 rounded-3xl max-w-lg
            w-full flex flex-col gap-8
          `}
          onSubmit={handleSubmit(submitSignUpData)}
        >
          <div className="flex flex-col gap-6">
            <TextInput
              label="Nome"
              placeholder="Digite seu nome"
              {...register("name")}
              helper={errors.name?.message}
            />
            <TextInput
              label="Email"
              placeholder="Digite seu email"
              type="email"
              {...register("email")}
              helper={errors.email?.message}
            />
            <PasswordInput
              label="Senha"
              placeholder="Digite sua senha"
              id="passwordInput"
              {...register("password")}
              helper={errors.password?.message}
            />
            <PasswordInput
              label="Confirme sua senha"
              placeholder="Confirme sua senha"
              id="confirmPasswordInput"
              {...register("confirmPassword")}
              helper={errors.confirmPassword?.message}
            />
          </div>

          <Button text="Registrar" size="md" type="submit" />
        </form>
      </div>
    </Screen>
  );
}
