import React from "react";

type NotificationBannerProps = {
  message: string;
  type?: "info" | "success" | "warning" | "error";
  onClose?: () => void;
  showIcon?: boolean;
};

export default function NotificationBanner({
  message,
  type = "info",
  onClose,
  showIcon = true,
}: NotificationBannerProps) {
  const bgColors = {
    info: "bg-blue-50 border-blue-200",
    success: "bg-green-50 border-green-200",
    warning: "bg-yellow-50 border-yellow-200",
    error: "bg-red-50 border-red-200",
  };

  const textColors = {
    info: "text-blue-800",
    success: "text-green-800",
    warning: "text-yellow-800",
    error: "text-red-800",
  };

  const icons = {
    info: "ℹ️",
    success: "✅",
    warning: "⚠️",
    error: "❌",
  };

  return (
    <div
      className={`flex items-center justify-between rounded-md border p-3 ${bgColors[type]}`}
    >
      <div className="flex items-center gap-2">
        {showIcon && <span>{icons[type]}</span>}
        <p className={`text-sm font-medium ${textColors[type]}`}>{message}</p>
      </div>
      {onClose && (
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          &times;
        </button>
      )}
    </div>
  );
}
