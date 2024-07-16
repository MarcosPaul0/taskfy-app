"use client";

import { Title } from "@taskfy/components/Title";
import { Screen } from "@taskfy/components/Screen";
import { useTaskGroupContext } from "@taskfy/contexts/TaskGroupContext/taskGroup.context";
import { Banner } from "@taskfy/components/Banner";
import { TaskGroupNavigation } from "@taskfy/components/taskGroup/TaskGroupNavigation";

export default function TaskGroupTemplate({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { taskGroup } = useTaskGroupContext();

  if (!taskGroup) {
    return null;
  }

  return (
    <>
      <Banner />

      <Screen gap="lg">
        <Title title={taskGroup?.name} size="lg">
          <TaskGroupNavigation />
        </Title>

        {children}
      </Screen>
    </>
  );
}
