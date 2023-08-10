"use client";
import React, { useCallback, useState } from "react";

import Image from "next/image";
type Props = {
  id: string;
  onClick: (id: string) => void;
  title: string;
  subtitle: string;
  selected?: boolean;
  iconUrl: string;
};

export default function PlaceTypeInput({
  id,
  title,
  subtitle,
  onClick,
  selected,
  iconUrl,
}: Props) {
  return (
    <div
      onClick={() => onClick(id)}
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
      <div>
        <Image alt="amenity" src={iconUrl} width={50} height={50} />
      </div>
    </div>
  );
}
