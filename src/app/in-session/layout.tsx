"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { Header } from "@taskfy/components/inSession/Header";
import { TaskGroupContextProvider } from "@taskfy/contexts/TaskGroupContext/taskGroup.context";
import { queryClient } from "@taskfy/services/queryClient";

export default function InSessionLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <QueryClientProvider client={queryClient}>
      <TaskGroupContextProvider>
        <main
          className={`
        flex flex-col h-full min-h-screen items-center
        `}
        >
          <Header />

          {children}
        </main>
      </TaskGroupContextProvider>
    </QueryClientProvider>
  );
}
