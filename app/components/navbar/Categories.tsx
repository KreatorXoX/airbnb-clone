"use client";
import React, { useRef, useState } from "react";
import ClientContainer from "../ClientContainer";
import { TbBeach } from "react-icons/tb";
import { GiWindmill } from "react-icons/gi";
import { MdOutlineVilla } from "react-icons/md";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import CategoryBox from "./CategoryBox";
import { useSearchParams } from "next/navigation";
import {
  AnimatePresence,
  motion,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";

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
  const [leftArrowVisible, setLeftArrowVisible] = useState(false);
  const [rightArrowVisible, setRightArrowVisible] = useState(true);
  const imageSlider = useRef<HTMLDivElement>(null);
  const { scrollXProgress, scrollX } = useScroll({ container: imageSlider });

  useMotionValueEvent(scrollXProgress, "change", (latest) => {
    if (imageSlider) {
      if (imageSlider.current?.scrollLeft === 0) {
        setLeftArrowVisible(false);
      } else {
        setLeftArrowVisible(true);
      }
    }

    if (latest > 0.99) {
      setRightArrowVisible(false);
    } else {
      setRightArrowVisible(true);
    }
  });

  const handleHorizantalScroll = (
    element: HTMLDivElement | null,
    speed: number,
    distance: number,
    step: number
  ) => {
    let scrollAmount = 0;
    const slideTimer = setInterval(() => {
      if (element) {
        element.scrollLeft += step;
        scrollAmount += Math.abs(step);
        if (scrollAmount >= distance) {
          clearInterval(slideTimer);
        }
      }
    }, speed);
  };
  return (
    <ClientContainer>
      <div className="relative flex items-center">
        <AnimatePresence>
          {leftArrowVisible && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.45 }}
              className="absolute left-0 z-10 bg-white h-[4.25rem] md:h-20 top-2 md:top-4 w-10 flex items-center justify-center"
            >
              <button
                className="border border-gray-400 p-1 rounded-full"
                onClick={() =>
                  handleHorizantalScroll(imageSlider.current, 20, 120, -5)
                }
              >
                <BiChevronLeft size={20} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <div
          ref={imageSlider}
          className="flex items-center justify-between pt-2 md:pt-4 overflow-x-scroll no-scrollbar whitespace-nowrap "
        >
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
        <AnimatePresence>
          {rightArrowVisible && (
            <motion.div
              initial={{ opacity: 1, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="absolute z-10 bg-white h-[4.25rem] md:h-20 top-2 md:top-4 right-0 w-10 flex items-center justify-center"
            >
              <button
                className="border border-gray-400 p-1 rounded-full"
                onClick={() =>
                  handleHorizantalScroll(imageSlider.current, 20, 120, 5)
                }
              >
                <BiChevronRight size={20} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </ClientContainer>
  );
}
