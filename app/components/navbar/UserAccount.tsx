"use client";
import React, { useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { BiSolidUserCircle } from "react-icons/bi";
import AccountItem from "./AccountItem";
import { useRegisterModal } from "@/app/hooks/useRegistration";
export default function UserAccount() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const registerOpen = useRegisterModal((state) => state.onOpen);

  return (
    <div className="relative">
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
          <div className="hidden md:inline-block">
            <BiSolidUserCircle className="text-4xl text-gray-500" />
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="absolute rounded-xl min-w-[15rem] max-w-[30vw] shadow-md bg-white overflow-hidden right-0 top-14 text-sm md:text-base">
          <div className="flex flex-col cursor-pointer">
            <>
              <AccountItem onClick={() => registerOpen()} label="Sign up" />
              <AccountItem onClick={() => {}} label="Log in" />
              <div className="w-full bg-gray-200 h-[1px] my-2"></div>
              <AccountItem onClick={() => {}} label="Airbnb your home" />
              <AccountItem onClick={() => {}} label="Log in" />
            </>
          </div>
        </div>
      )}
    </div>
  );
}
