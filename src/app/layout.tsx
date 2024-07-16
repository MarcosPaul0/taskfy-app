import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthContextProvider } from "@taskfy/contexts/AuthContext/authContext.context";
import { Toaster } from "sonner";

const inter = Inter({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Taskfy | Conquiste Metas Juntos!",
  description:
    "Simplifique o gerenciamento de tarefas em grupo de forma simples e gratuita. Registre-se agora para começar a transformar tarefas em conquistas coletivas!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <AuthContextProvider>{children}</AuthContextProvider>
      </body>

      <Toaster />
    </html>
  );
}
