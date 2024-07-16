import { Header } from "@taskfy/components/outSession/Header";

export default function OutSessionLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main
      className={`
        flex flex-col h-full min-h-screen items-center
      `}
    >
      <Header />
      {children}
    </main>
  );
}
