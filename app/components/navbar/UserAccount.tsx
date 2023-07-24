"use client";
import React, { useState } from "react";
import Image from "next/image";
import { AiOutlineMenu } from "react-icons/ai";
import { BiSolidUserCircle } from "react-icons/bi";
import AccountItem from "./AccountItem";
import { useRegisterModal } from "@/app/hooks/useRegistration";
import { useOutsideClick } from "@/app/hooks/useOutsideClick";
import { useLoginModal } from "@/app/hooks/useLogin";
import { User } from "@prisma/client";
import { signOut } from "next-auth/react";

type Props = {
  currentUser?: User | null;
};

export default function UserAccount({ currentUser }: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const registerOpen = useRegisterModal((state) => state.onOpen);
  const loginOpen = useLoginModal((state) => state.onOpen);

  const menuRef = useOutsideClick(() => setIsOpen(false));

  return (
    <div className="relative" ref={menuRef}>
      <div className="flex items-center gap-3">
        <div
          className="hidden md:block text-sm font-medium md:py-3 px-4 rounded-full
  transition hover:bg-yellow-200/10 cursor-pointer
  "
        >
          <span className="whitespace-nowrap">Airbnb your home</span>
        </div>
        <div
          onClick={() => setIsOpen((prev) => !prev)}
          className="p-2 sm:p-4 md:py-1 md:px-2 border-[0.5px] flex items-center gap-3 rounded-full cursor-pointer transition hover:shadow-md"
        >
          <AiOutlineMenu className="text-xl text-gray-500" />
          <div className="hidden md:inline-block rounded-full">
            {currentUser?.image ? (
              <Image
                className="object-cover rounded-full"
                width={30}
                height={30}
                src={`${currentUser.image}`}
                alt={`${currentUser.name}`}
              />
            ) : (
              <BiSolidUserCircle className="text-gray-500 text-4xl" />
            )}
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="absolute rounded-xl min-w-[15rem] max-w-[30vw] shadow-md bg-white overflow-hidden right-0 top-14 text-sm md:text-base">
          <div className="flex flex-col cursor-pointer">
            {currentUser ? (
              <>
                <AccountItem onClick={() => {}} label="My trips" />
                <AccountItem onClick={() => {}} label="My favorites" />
                <AccountItem onClick={() => {}} label="My reservations" />
                <AccountItem onClick={() => {}} label="My properties" />
                <AccountItem onClick={() => {}} label="Airbnb my home" />
                <div className="w-full bg-gray-200 h-[1px] my-2"></div>
                <AccountItem onClick={signOut} label="Logout" />
              </>
            ) : (
              <>
                <AccountItem onClick={registerOpen} label="Sign up" />
                <AccountItem onClick={loginOpen} label="Log in" />
                <div className="w-full bg-gray-200 h-[1px] my-2"></div>
                <AccountItem onClick={() => {}} label="Airbnb your home" />
                <AccountItem onClick={() => {}} label="Help" />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
