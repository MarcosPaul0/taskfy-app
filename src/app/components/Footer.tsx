export function Footer() {
  return (
    <footer className="flex items-center justify-between px-40 py-12 bg-neutral-950">
      <nav className="flex items-center gap-8">
        <a
          href="#"
          className="font-bold text-gray-50 text-md hover:underline decoration-solid"
        >
          Políticas de Privacidade
        </a>

        <a
          href="#"
          className="font-bold text-gray-50 text-md hover:underline decoration-solid"
        >
          Termos de Uso
        </a>
      </nav>

      <span className="text-gray-50">
        Copyright © Marcos Paulo Pereira 2023
      </span>
    </footer>
  );
}
