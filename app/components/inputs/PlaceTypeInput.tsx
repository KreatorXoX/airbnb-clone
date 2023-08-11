"use client";

import React from "react";
import { IconType } from "react-icons";

type Props = {
  value: string;
  onClick: (value: string) => void;
  title: string;
  subtitle: string;
  selected?: boolean;
  icon: IconType;
};

export default function PlaceTypeInput({
  value,
  title,
  subtitle,
  onClick,
  selected,
  icon: Icon,
}: Props) {
  return (
    <div
      onClick={() => onClick(value)}
      className={`${
        selected ? "border-gray-800" : "border-gray-200"
      }       rounded-xl border-2 hover:border-gray-800 outline-none transition cursor-pointer
      flex justify-between items-start p-5
      `}
    >
      <div className="relative w-full">
        <p className="text-xl">{title}</p>
        <span className="text-sm w-full text-neutral-500 ">{subtitle}</span>
      </div>
      <div className="pl-4">
        <Icon size={35} />
      </div>
    </div>
  );
}
