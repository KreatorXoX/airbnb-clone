"use client";
import React, { useState } from "react";
import {
  useScroll,
  useMotionValueEvent,
  AnimatePresence,
  motion,
} from "framer-motion";
export default function SmallUserAccount() {
  const { scrollYProgress } = useScroll();

  const [hidden, setHidden] = useState(true);
  useMotionValueEvent(scrollYProgress, "velocityChange", (latest) => {
    if (latest < 0) {
      setHidden(false);
    } else if (latest > 0) {
      setHidden(true);
    }
  });

  return (
    <AnimatePresence>
      {!hidden && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ease: [0.1, 0.25, 0.3, 1], duration: 0.8 }}
          className={` w-full fixed md:hidden bottom-0 border-t p-4
      flex justify-center items-center gap-5
      bg-white
      `}
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
