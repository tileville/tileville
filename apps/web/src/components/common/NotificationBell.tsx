// src/components/common/NotificationBell.tsx
import { useState, useEffect } from "react";
import { BellIcon } from "@radix-ui/react-icons";
import { Dialog } from "@radix-ui/themes";
import { useNetworkStore } from "@/lib/stores/network";
import { useNotifications } from "@/db/react-query-hooks";
import Link from "next/link";

export const NotificationBell = () => {
  const [unreadCount, setUnreadCount] = useState(0);
  const networkStore = useNetworkStore();
  const walletAddress = networkStore.address || "";

  const {
    data: notifications = [],
    isLoading,
    refetch,
  } = useNotifications(walletAddress);

  useEffect(() => {
    // Count unread notifications
    if (notifications.length > 0) {
      const unread = notifications.filter(
        (notification: any) => !notification.read
      ).length;
      setUnreadCount(unread);
    }
  }, [notifications]);

  const markAsRead = async (notificationId: number) => {
    try {
      // API call to mark notification as read
      await fetch("/api/notifications/mark-read", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ notificationId }),
      });
      refetch();
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  const markAllAsRead = async () => {
    try {
      // API call to mark all notifications as read
      await fetch("/api/notifications/mark-all-read", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ walletAddress }),
      });
      refetch();
    } catch (error) {
      console.error("Error marking all notifications as read:", error);
    }
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <div className="relative cursor-pointer p-2">
          <BellIcon className="h-6 w-6 text-primary" />
          {unreadCount > 0 && (
            <span className="absolute -right-0.5 -top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-white">
              {unreadCount}
            </span>
          )}
        </div>
      </Dialog.Trigger>

      <Dialog.Content className="max-w-md">
        <Dialog.Title>Notifications</Dialog.Title>

        {isLoading ? (
          <div className="flex justify-center py-4">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
          </div>
        ) : notifications.length === 0 ? (
          <p className="py-4 text-center text-gray-500">No notifications yet</p>
        ) : (
          <>
            <div className="mb-2 flex justify-end">
              <button
                className="text-sm text-primary hover:underline"
                onClick={markAllAsRead}
              >
                Mark all as read
              </button>
            </div>

            <div className="max-h-[60vh] overflow-y-auto">
              {notifications.map((notification: any) => (
                <div
                  key={notification.id}
                  className={`mb-2 rounded-lg border p-3 ${
                    notification.read
                      ? "bg-gray-50"
                      : "border-primary/20 bg-primary/10"
                  }`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="flex items-start justify-between">
                    <p className="font-medium">{notification.title}</p>
                    <span className="text-xs text-gray-500">
                      {new Date(notification.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-gray-700">
                    {notification.message}
                  </p>
                  {notification.action_url && (
                    <Link
                      href={notification.action_url}
                      className="mt-2 block text-sm text-primary hover:underline"
                    >
                      {notification.action_text || "View"}
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </>
        )}
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default NotificationBell;
