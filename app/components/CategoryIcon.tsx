import React from "react";
import Image from "next/image";
type Props = {
  iconUrl: string;
  selected?: boolean;
  label: string;
  big?: boolean;
};

export default function CategoryIcon({ selected, iconUrl, label, big }: Props) {
  let style;

  switch (big) {
    case true:
      style = "h-[50px] w-[50px]";
      break;
    case undefined:
      style = "h-[32px] w-[32px]";
      break;
    // ...other cases
  }

  return (
    <div
      className={`${style} relative  brightness-200 group-hover:brightness-100 transition`}
    >
      <Image
        src={iconUrl}
        fill
        sizes="33vw"
        alt={`${label}`}
        priority
        className={`${selected ? " brightness-0" : "brightness-150"}`}
      />
    </div>
  );
}
