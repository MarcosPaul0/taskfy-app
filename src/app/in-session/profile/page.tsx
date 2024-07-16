"use client";

import { Button } from "@taskfy/components/Button";
import { PasswordInput } from "@taskfy/components/PasswordInput";
import { Section } from "@taskfy/components/Section";
import { Text } from "@taskfy/components/Text";
import { TextInput } from "@taskfy/components/TextInput";
import { Title } from "@taskfy/components/Title";
import { UserImage } from "@taskfy/components/UserImage";
import { Screen } from "@taskfy/components/Screen";

export default function NewGroupPage() {
  return (
    <Screen>
      <div className="w-full flex items-center justify-between">
        <div className="flex flex-col gap-2 py-8">
          <Title title="Configurações" />
          <Text
            text="Perfil do usuário exibido nos grupos de tarefas. Aqui estão reunidas informações pessoais e preferências."
            maxWidth="lg"
          />
        </div>

        <UserImage
          imageUrl="https://avatars.githubusercontent.com/u/64232527?v=4"
          username="Marcos Paulo"
        />
      </div>

      <Section
        title="Meu Perfil"
        text="Perfil do usuário exibido nos grupos de tarefas. Aqui estão reunidas informações pessoais e preferências."
      >
        <TextInput label="Nome" placeholder="Defina seu nome de usuário" />

        <TextInput label="Email" placeholder="Defina seu email" />

        <Button text="Alterar perfil" />
      </Section>

      <Section
        title="Alterar senha"
        text="Permite você modificar sua senha de forma segura e eficiente para manter a proteção da sua conta."
      >
        <PasswordInput
          label="Senha atual"
          placeholder="Digite sua senha atual"
        />

        <PasswordInput label="Nova senha" placeholder="Digite sua nova senha" />

        <PasswordInput
          label="Confirme sua senha"
          placeholder="Confirme sua nova senha"
        />

        <Button text="Alterar senha" />
      </Section>

      <Section
        title="Deletar conta"
        text="Trata-se da remoção permanente de todas as informações do usuário e grupos de tarefas. Isso significa que os dados são apagados de forma irreversível, impossibilitando qualquer tentativa de acessá-los ou recuperá-los"
        variant="danger"
      >
        <Button text="Deletar conta" variant="outlinedDanger" />
      </Section>
    </Screen>
  );
}
