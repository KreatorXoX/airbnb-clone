"use client";
import React, { useState } from "react";
import Image from "next/image";
import { signOut } from "next-auth/react";
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
import { IUser } from "@/types";

type Props = {
  currentUser?: IUser | null;
};

export default function SmallUserAccount({ currentUser }: Props) {
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
      flex justify-center items-center gap-[10%]
      bg-white z-10
      "
        >
          <button
            onClick={() => router.push("/")}
            className="flex flex-col items-center justify-center text-xs text-gray-400 gap-1 active:text-red-500"
          >
            <PiMagnifyingGlass size={26} />
            <span className=" truncate text-gray-600">Explore</span>
          </button>
          <button
            onClick={() => {
              if (!currentUser) {
                loginOpen();
              } else {
                router.push("/favourites");
              }
            }}
            className="flex flex-col items-center justify-center text-xs text-gray-400 gap-1 active:text-red-500"
          >
            <PiHeart size={26} />
            <span className=" truncate text-gray-600">Whishlists</span>
          </button>

          <button
            onClick={() => {
              if (!currentUser) {
                loginOpen();
              } else {
                router.push("/trips");
              }
            }}
            className="flex flex-col items-center justify-center text-xs text-gray-400 gap-1 active:text-red-500"
          >
            <Image
              src="/images/miniLogo.svg"
              alt="mini logo"
              width={24}
              height={20}
              style={{ width: "auto", height: "auto" }}
            />
            <span className=" truncate text-gray-600">Trips</span>
          </button>

          <button
            onClick={() => {
              if (!currentUser) {
                loginOpen();
              } else {
                router.push("/me");
              }
            }}
            className="flex flex-col items-center justify-center text-xs text-gray-400 gap-1 active:text-red-500"
          >
            {currentUser?.image ? (
              <Image
                className="object-cover rounded-full"
                width={26}
                height={26}
                src={`${currentUser.image}`}
                alt={`${currentUser.name}`}
              />
            ) : (
              <PiUserCircleLight size={26} />
            )}
            <span className=" truncate text-gray-600 first-letter:uppercase">
              {currentUser ? currentUser.name : "Log in"}
            </span>
          </button>
          {/* {currentUser && (
            <button
              onClick={() => signOut()}
              className="flex flex-col items-center justify-center text-xs text-gray-400 gap-1 active:text-red-500"
            >
              <PiPower size={26} />
              <span className=" truncate text-gray-600">Log out</span>
            </button>
          )} */}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
