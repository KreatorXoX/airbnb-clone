"use client";
import React, { useState } from "react";
import {
  useScroll,
  useMotionValueEvent,
  AnimatePresence,
  motion,
  useVelocity,
} from "framer-motion";
import { PiUserCircleLight, PiHeart, PiMagnifyingGlass } from "react-icons/pi";
import { useRouter } from "next/navigation";
import { useLoginModal } from "@/app/hooks/useLogin";

export default function SmallUserAccount() {
  const loginOpen = useLoginModal((state) => state.onOpen);
  const router = useRouter();
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);

  const [hidden, setHidden] = useState(false);
  useMotionValueEvent(scrollY, "velocityChange", (latest) => {
    if (latest < 0) {
      setHidden(false);
    } else if (latest > 0 && scrollVelocity.getVelocity() > 45000) {
      setHidden(true);
    }
  });

  return (
    <AnimatePresence>
      {!hidden && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ ease: [0.1, 0.25, 0.3, 1], duration: 0.8 }}
          className="w-full fixed bottom-0 border-t py-2
      flex justify-center items-center gap-20
      bg-white
      "
        >
          <button
            onClick={() => router.push("/")}
            className="flex flex-col items-center justify-center text-xs text-gray-400 gap-1 active:text-red-500"
          >
            <PiMagnifyingGlass size={26} />
            <span className="text-gray-600">Explore</span>
          </button>
          <button className="flex flex-col items-center justify-center text-xs text-gray-400 gap-1 active:text-red-500">
            <PiHeart size={26} />
            <span className="text-gray-600">Whishlists</span>
          </button>
          <button
            onClick={() => loginOpen()}
            className="flex flex-col items-center justify-center text-xs text-gray-400 gap-1 active:text-red-500"
          >
            <PiUserCircleLight size={26} />
            <span className="text-gray-600">Log in</span>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
