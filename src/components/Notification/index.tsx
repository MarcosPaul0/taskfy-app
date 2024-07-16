import { Bell, BellRinging } from "@phosphor-icons/react";
import { InviteResponse } from "@taskfy/interfaces/responses/inviteResponse.interface";
import { API_ROUTES } from "@taskfy/routes/api.routes";
import { apiClient } from "@taskfy/services/apiClient";
import { useEffect, useState } from "react";
import { Popover, PopoverTrigger } from "../Popover";
import { PopoverContent } from "@radix-ui/react-popover";
import { useNotify } from "@taskfy/hooks/useNotify";
import { INVITE_STATUS } from "@taskfy/constants/inviteStatus.constant";

export function Notification() {
  const { successNotify, errorNotify } = useNotify();

  const [notifications, setNotifications] = useState<InviteResponse[]>([]);

  function removeNotification(notificationId: string) {
    setNotifications((currentNotifications) =>
      currentNotifications.filter(
        (notification) => notification.id !== notificationId,
      ),
    );
  }

  async function acceptInvite(inviteId: string) {
    try {
      await apiClient.patch(`${API_ROUTES.RESPOND_INVITE}/${inviteId}`, {
        inviteStatus: INVITE_STATUS.ACCEPTED,
      });

      removeNotification(inviteId);

      successNotify({
        message: "Você ingressou no grupo de tarefas",
      });
    } catch {
      errorNotify({
        message: "Ocorreu um erro ao tentar aceitar o convite",
      });
    }
  }

  async function rejectInvite(inviteId: string) {
    try {
      await apiClient.patch(`${API_ROUTES.RESPOND_INVITE}/${inviteId}`, {
        inviteStatus: INVITE_STATUS.REJECTED,
      });

      removeNotification(inviteId);

      successNotify({
        message: "Você recusou ingressar no grupo de tarefas",
      });
    } catch {
      errorNotify({
        message: "Ocorreu um erro ao tentar rejeitar o convite",
      });
    }
  }
  const notificationsCount = notifications.length;
  const hasNotifications = notificationsCount > 0;

  useEffect(() => {
    (async () => {
      try {
        const notificationsResponse = await apiClient.get<InviteResponse[]>(
          API_ROUTES.NOTIFICATIONS,
        );

        const notifications = notificationsResponse.data;

        setNotifications(notifications);
      } catch {
        setNotifications([]);
      }
    })();
  }, []);

  return (
    <Popover>
      <PopoverTrigger
        className={`
        text-3xl text-gray-50 relative
        
    `}
      >
        {hasNotifications ? (
          <>
            <BellRinging />
            <span
              className={`
              absolute h-5 w-5 text-sm font-semibold
              rounded-full bg-emerald-500
              -top-2 -right-1 text-gray-50
            `}
            >
              {notificationsCount}
            </span>
          </>
        ) : (
          <Bell />
        )}
      </PopoverTrigger>

      <PopoverContent
        align="end"
        className="border border-neutral-800 rounded-xl max-w-2xl"
      >
        <header
          className={`
            text-gray-50 font-bold px-4 py-3
            bg-neutral-900
          `}
        >
          NOTIFICAÇÕES
        </header>

        <ul className="list-none flex flex-col gap-2 py-2 px-4">
          {notifications.map((notification) => (
            <li
              key={notification.id}
              className={`
                flex flex-col gap-2 px-4 py-2 bg-neutral-900 
              `}
            >
              <h1 className="text-gray-50 text-md">
                Convite para ingressar ao grupo de tarefas{" "}
                <strong>{notification.taskGroup.name}</strong>
              </h1>

              <div className="flex items-center justify-end gap-4">
                <button
                  type="button"
                  className={`
                    text-emerald-500 hover:text-emerald-400
                    flex items-center gap-2 text-sm
                  `}
                  onClick={() => acceptInvite(notification.id)}
                >
                  Aceitar
                </button>

                <button
                  type="button"
                  className={`
                    text-red-500 hover:text-red-400
                    flex items-center gap-2 text-sm
                  `}
                  onClick={() => rejectInvite(notification.id)}
                >
                  Recusar
                </button>
              </div>
            </li>
          ))}
        </ul>

        <footer
          className={`
            font-bold px-4 py-3
            bg-neutral-900 flex
          `}
        >
          <button
            type="button"
            className={`
              text-center my-0 mx-auto
              text-emerald-500 hover:text-emerald-400 
            `}
          >
            ACEITAR TODAS
          </button>
        </footer>
      </PopoverContent>
    </Popover>
  );
}
