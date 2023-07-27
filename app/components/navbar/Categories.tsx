"use client";
import React from "react";
import ClientContainer from "../ClientContainer";
import { TbBeach } from "react-icons/tb";
import { GiWindmill } from "react-icons/gi";
import { MdOutlineVilla } from "react-icons/md";
import CategoryBox from "./CategoryBox";
import { useSearchParams } from "next/navigation";

export const dummy_categories = [
  {
    label: "Beach",
    icon: TbBeach,
    desciption: "This property is close to the beach",
  },
  {
    label: "Windmills",
    icon: GiWindmill,
    desciption: "This property has windmills",
  },
  {
    label: "Modern",
    icon: MdOutlineVilla,
    desciption: "This property has a modern design",
  },
];
export default function Categories() {
  const params = useSearchParams();

  return (
    <ClientContainer>
      <div className="flex items-center justify-between pt-4 overflow-x-auto">
        {dummy_categories.map((category) => {
          const selected = params?.get("category") === category.label;
          return (
            <CategoryBox
              key={category.label}
              label={category.label}
              icon={category.icon}
              selected={selected}
            />
          );
        })}
      </div>
    </ClientContainer>
  );
}
