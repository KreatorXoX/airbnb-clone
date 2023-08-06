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
      className={`h-[32px] relative w-[32px] brightness-200 group-hover:brightness-100 transition`}
    >
      <Image
        src={iconUrl}
        fill
        alt={`${label}`}
        priority
        className={`${selected ? " brightness-0" : "brightness-150"}`}
      />
    </div>
  );
}
