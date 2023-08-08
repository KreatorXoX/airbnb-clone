"use client";
import React, { useRef, useState } from "react";
import ClientContainer from "../ClientContainer";

import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import CategoryBox from "./CategoryBox";
import { useSearchParams } from "next/navigation";
import {
  AnimatePresence,
  motion,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { categories } from "@/utils/categories";

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
      <div className="relative flex items-center md:pb-6 md:pt-4">
        <div
          ref={imageSlider}
          className="flex items-center justify-between gap-4 md:gap-10 pt-2 md:pt-3 overflow-x-scroll no-scrollbar whitespace-nowrap "
        >
          {categories.map((category) => {
            const selected = params?.get("category") === category.id;
            return (
              <div
                key={category.id}
                className={`${
                  selected ? "text-neutral-800" : "text-neutral-500"
                } relative`}
              >
                <CategoryBox
                  id={category.id}
                  label={category.label}
                  iconUrl={category.iconUrl}
                  selected={selected}
                />

                {selected && (
                  <motion.span
                    layoutId="bgNavigation"
                    className="absolute inset-0 top-1 -z-10 border-green-600 border-b-2"
                    transition={{ type: "spring", bounce: 0.2, duration: 1 }}
                  ></motion.span>
                )}
              </div>
            );
          })}
        </div>
        <AnimatePresence>
          {leftArrowVisible && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.45 }}
              className="absolute -left-2 z-5 h-[3.5rem] bg-white top-1 md:top-6  md:h-[3.9rem] w-12 flex items-center justify-center"
            >
              <button
                className="border border-gray-400 p-1 rounded-full focus:outline-none"
                onClick={() =>
                  handleHorizantalScroll(imageSlider.current, 20, 120, -5)
                }
              >
                <BiChevronLeft size={20} />
              </button>
              <div
                className="bg-gradient-to-r from-white md:h-[3.9rem] h-[3.5rem] absolute left-12 top-0
              w-10
              "
              ></div>
            </motion.div>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {rightArrowVisible && (
            <motion.div
              initial={{ opacity: 1, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="absolute -right-2 z-5 bg-white h-[3.5rem] top-1 md:top-6  md:h-[3.9rem] w-12 flex items-center justify-center"
            >
              <button
                className="border border-gray-400 p-1 rounded-full focus:outline-none"
                onClick={() =>
                  handleHorizantalScroll(imageSlider.current, 20, 120, 5)
                }
              >
                <BiChevronRight size={20} />
              </button>
              <div
                className="bg-gradient-to-l from-white md:h-[3.9rem] h-[3.5rem] absolute right-12 top-0
              w-10
              "
              ></div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </ClientContainer>
  );
}
