"use client";
import React from "react";
import CategoryIcon from "../CategoryIcon";

type Props = {
  id: string;
  label: string;
  iconUrl: string;
  selected?: boolean;
  onClick: (value: string) => void;
};

export default function AmenityInput({
  id,
  iconUrl,
  label,
  selected,
  onClick,
}: Props) {
  return (
    <div
      onClick={() => onClick(id)}
      className={`${
        selected ? "border-gray-800" : "border-gray-200"
      }       rounded-xl border-2 hover:border-gray-800 outline-none transition cursor-pointer
      flex flex-col justify-center p-1 pl-6
      `}
    >
      <CategoryIcon label={label} iconUrl={iconUrl} selected={selected} />
      <p className="font-semibold text-sm">{label}</p>
    </div>
  );
}
