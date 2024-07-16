import { useCallback } from "react";
import { toast } from "sonner";
import { NotifyParams } from "../interfaces/notifyParams.interface";
import { useRouter } from "next/navigation";

export function useNotify() {
  const router = useRouter();

  const successNotify = useCallback(({ message, redirectTo }: NotifyParams) => {
    toast.success(message, {
      position: "top-right",
      style: {
        background: "#15803d",
        borderColor: "#15803d",
        color: "#f9fafb",
      },
    });

    redirectTo && router.push(redirectTo);
  }, []);

  const errorNotify = useCallback(({ message, redirectTo }: NotifyParams) => {
    toast.error(message, {
      position: "top-right",
      style: {
        background: "#b91c1c",
        borderColor: "#b91c1c",
        color: "#f9fafb",
      },
    });

    redirectTo && router.push(redirectTo);
  }, []);

  const warningNotify = useCallback(({ message, redirectTo }: NotifyParams) => {
    toast.warning(message, {
      position: "top-right",
      style: {
        background: "#ca8a04",
        borderColor: "#ca8a04",
        color: "#f9fafb",
      },
    });

    redirectTo && router.push(redirectTo);
  }, []);

  return {
    successNotify,
    errorNotify,
    warningNotify,
  };
}
