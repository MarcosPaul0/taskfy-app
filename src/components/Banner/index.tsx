import { UploadSimple } from "@phosphor-icons/react";
import { useTaskGroupContext } from "@taskfy/contexts/TaskGroupContext/taskGroup.context";
import { useNotify } from "@taskfy/hooks/useNotify";
import { API_ROUTES } from "@taskfy/routes/api.routes";
import { apiClient } from "@taskfy/services/apiClient";
import Image from "next/image";
import { ChangeEvent, useRef, useState } from "react";

export function Banner() {
  const { errorNotify, successNotify } = useNotify();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const { taskGroup, isTaskGroupOwner, updateTaskGroupData } =
    useTaskGroupContext();

  const [showUploadBannerButton, setShowUploadBannerButton] = useState(false);

  function openFileSelector() {
    fileInputRef.current?.click();
  }

  async function updateBanner(event: ChangeEvent<HTMLInputElement>) {
    try {
      const hasFile = event.target.files && event.target.files?.length > 0;

      if (!hasFile) {
        return;
      }

      const file = event.target.files?.[0] as File;

      const fileSizeInMb = file.size / (1024 * 1024);
      const fileSizeIsTooLarge = fileSizeInMb > 3;

      if (fileSizeIsTooLarge) {
        errorNotify({
          message: "A imagem deve ter no máximo 3Mb de tamanho",
        });
        return;
      }

      const formData = new FormData();

      formData.append("banner", file);

      await apiClient.post(
        `${API_ROUTES.TASK_GROUP_BANNER}/${taskGroup?.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      const bannerUrl = URL.createObjectURL(file);

      updateTaskGroupData({
        bannerUrl,
      });

      successNotify({
        message: "Banner atualizado com sucesso!",
      });
    } catch {
      errorNotify({
        message: "Ocorreu um erro ao atualizar o banner",
      });
    }
  }

  return (
    <div
      className={`
        h-56 w-screen bg-emerald-500 overflow-hidden flex 
        items-center transition-all relative duration-300
      `}
      onMouseEnter={() => setShowUploadBannerButton(true)}
      onMouseLeave={() => setShowUploadBannerButton(false)}
    >
      {taskGroup?.bannerUrl && (
        <Image
          alt="Banner"
          src={taskGroup?.bannerUrl}
          fill
          sizes=""
          className="max-h-56 object-cover object-[50%_5%] w-full"
        />
      )}

      {isTaskGroupOwner && (
        <div
          className={`
            content-[''] h-56 w-screen left-0 transition-all top-0 absolute
            duration-300 bg-gradient-to-t from-[#000000AF] to-transparent
            ${showUploadBannerButton ? "visible" : "invisible"}
          `}
        >
          <button
            className={`
              absolute left-12 bottom-4 bg-neutral-950 border border-neutral-700
              text-gray-50 px-4 py-1 rounded-md transition-opacity duration-300
              flex items-center gap-2 hover:bg-opacity-90 z-40
              ${showUploadBannerButton ? "opacity-100" : "opacity-0"}
            `}
            type="button"
            onClick={openFileSelector}
          >
            <UploadSimple />
            Carregar imagem
          </button>
        </div>
      )}

      <input
        type="file"
        hidden
        ref={fileInputRef}
        accept="image/png, image/jpeg"
        onChange={updateBanner}
      />
    </div>
  );
}
