"use client";
import React from "react";
import ClientContainer from "../ClientContainer";
import { TbBeach } from "react-icons/tb";
import { GiWindmill } from "react-icons/gi";
import { MdOutlineVilla } from "react-icons/md";
import CategoryBox from "./CategoryBox";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
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
  {
    label: "Beach1",
    icon: TbBeach,
    desciption: "This property is close to the beach",
  },
  {
    label: "Windmills1",
    icon: GiWindmill,
    desciption: "This property has windmills",
  },
  {
    label: "Modern1",
    icon: MdOutlineVilla,
    desciption: "This property has a modern design",
  },
  {
    label: "Beach2",
    icon: TbBeach,
    desciption: "This property is close to the beach",
  },
  {
    label: "Windmills2",
    icon: GiWindmill,
    desciption: "This property has windmills",
  },
  {
    label: "Modern2",
    icon: MdOutlineVilla,
    desciption: "This property has a modern design",
  },
  {
    label: "Beach3",
    icon: TbBeach,
    desciption: "This property is close to the beach",
  },
  {
    label: "Windmills3",
    icon: GiWindmill,
    desciption: "This property has windmills",
  },
  {
    label: "Modern3",
    icon: MdOutlineVilla,
    desciption: "This property has a modern design",
  },
  {
    label: "Beach4",
    icon: TbBeach,
    desciption: "This property is close to the beach",
  },
  {
    label: "Windmills4",
    icon: GiWindmill,
    desciption: "This property has windmills",
  },
  {
    label: "Modern4",
    icon: MdOutlineVilla,
    desciption: "This property has a modern design",
  },
];
export default function Categories() {
  const params = useSearchParams();

  return (
    <ClientContainer>
      <div className="flex items-center justify-between pt-2 md:pt-4 overflow-x-scroll no-scrollbar whitespace-nowrap">
        {dummy_categories.map((category) => {
          const selected = params?.get("category") === category.label;
          return (
            <div
              key={category.label}
              className={`${
                selected ? "text-neutral-800" : "text-neutral-500"
              } relative`}
            >
              <CategoryBox
                label={category.label}
                icon={category.icon}
                selected={selected}
              />

              {selected && (
                <motion.span
                  layoutId="bgNavigation"
                  className="absolute inset-0 -z-10 border-green-600 border-b-2"
                  transition={{ type: "spring", bounce: 0.2, duration: 1 }}
                ></motion.span>
              )}
            </div>
          );
        })}
      </div>
    </ClientContainer>
  );
}
