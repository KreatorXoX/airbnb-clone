"use client";
import React, { useState } from "react";
import {
  useScroll,
  useMotionValueEvent,
  AnimatePresence,
  motion,
  useVelocity,
} from "framer-motion";
export default function SmallUserAccount() {
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);

  const [hidden, setHidden] = useState(true);
  useMotionValueEvent(scrollY, "velocityChange", (latest) => {
    if (latest < 0) {
      setHidden(false);
    } else if (latest > 0 && scrollVelocity.getVelocity() > 48000) {
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
          className="w-full fixed bottom-0 border-t p-4
      flex justify-center items-center gap-5
      bg-white
      "
        >
          <div
            className="cursor-pointer"
            onClick={() => console.log("clicked")}
          >
            Explore
          </div>
          <div>Whilist</div>
          <div>User</div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
