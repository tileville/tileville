"use client";
import React from "react";

type RatingProps = {
  value: number;
  max?: number;
  size?: "sm" | "md" | "lg";
  readonly?: boolean;
  onChange?: (rating: number) => void;
  label?: string;
};

export default function Rating({
  value,
  max = 5,
  size = "md",
  readonly = false,
  onChange,
  label,
}: RatingProps) {
  const sizes = {
    sm: "text-sm",
    md: "text-lg",
    lg: "text-2xl",
  };

  const handleClick = (rating: number) => {
    if (!readonly && onChange) {
      onChange(rating);
    }
  };

  return (
    <div className="flex flex-col">
      {label && <span className="mb-1 text-sm text-gray-700">{label}</span>}
      <div className="flex items-center">
        {Array.from({ length: max }).map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => handleClick(index + 1)}
            className={`${sizes[size]} ${
              readonly ? "cursor-default" : "cursor-pointer"
            }`}
            disabled={readonly}
            aria-label={`Rate ${index + 1} out of ${max}`}
          >
            {index < value ? "★" : "☆"}
          </button>
        ))}
        {!readonly && (
          <span className="ml-2 text-sm text-gray-500">
            {value} of {max}
          </span>
        )}
      </div>
    </div>
  );
}
