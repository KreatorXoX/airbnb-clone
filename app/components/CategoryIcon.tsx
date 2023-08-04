import React from "react";
import Image from "next/image";
type Props = {
  iconUrl: string;
  selected?: boolean;
  label: string;
};

export default function CategoryIcon({ selected, iconUrl, label }: Props) {
  return (
    <div
      className={`${
        selected ? "brightness-100" : "brightness-200"
      } h-[32px] relative w-[32px] brightness-200 group-hover:brightness-100 transition`}
    >
      <Image src={iconUrl} fill alt={`${label}`} priority />
    </div>
  );
}
