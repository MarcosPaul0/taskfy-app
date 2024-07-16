import { Image } from "@phosphor-icons/react";

export function BannerDropzone() {
  return (
    <div
      className={`
        flex items-center justify-center
        bg-neutral-800 rounded-xl py-3
        border border-dashed border-neutral-600
        gap-2 w-full
      `}
    >
      <Image className="text-7xl text-gray-50" />

      <div className="flex flex-col text-gray-50 gap-0.5">
        <span className="font-bold text-base">Adicionar Banner</span>

        <button
          type="button"
          className={`
            bg-emerald-500 p-0.5 rounded-lg text-sm
            hover:bg-emerald-400 duration-300
          `}
        >
          Carregar
        </button>
      </div>
    </div>
  );
}
