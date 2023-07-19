"use client";
import React from "react";
import { IconType } from "react-icons";

type Props = {
  label?: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  outline?: boolean;
  small?: boolean;
  icon?: IconType;
};

export default function Button({
  label = "Generic",
  onClick,
  disabled,
  outline,
  small,
  icon: ButtonIcon,
}: Props) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`
  relative disabled:opacity-70 disabled:cursor-not-allowed rounded-lg hover:opacity-80 transition w-full
  ${outline ? "bg-white" : "bg-rose-500"}
  ${outline ? "border-2 border-black hover:opacity-80" : "border-none"}
  ${outline ? "text-black" : "text-white"}
  ${small ? "py-1" : "py-3"}
  ${small ? "text-sm" : "text-base"}
  ${small ? "font-light" : "font-semibold"}
  `}
    >
      {ButtonIcon && (
        <ButtonIcon
          size={`${small ? "20" : "25"}`}
          className={`${small ? "top-1" : "top-3"} absolute left-3`}
        />
      )}
      {label}
    </button>
  );
}
