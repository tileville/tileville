import React from "react";

type LoadingSpinnerProps = {
  size?: "sm" | "md" | "lg";
  color?: "primary" | "white" | "gray";
  label?: string;
};

export default function LoadingSpinner({
  size = "md",
  color = "primary",
  label,
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "h-4 w-4 border-2",
    md: "h-8 w-8 border-3",
    lg: "h-12 w-12 border-4",
  };

  const colorClasses = {
    primary: "border-primary/30 border-t-primary",
    white: "border-white/30 border-t-white",
    gray: "border-gray-300 border-t-gray-600",
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div
        className={`animate-spin rounded-full ${sizeClasses[size]} ${colorClasses[color]}`}
      />
      {label && <span className="mt-2 text-sm text-gray-600">{label}</span>}
    </div>
  );
}
