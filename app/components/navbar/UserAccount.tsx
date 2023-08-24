"use client";
import React, { useCallback, useState } from "react";
import Image from "next/image";
import { AiOutlineMenu } from "react-icons/ai";
import { BiSolidUserCircle } from "react-icons/bi";
import AccountItem from "./AccountItem";
import { useRegisterModal } from "@/app/hooks/useRegistration";
import { useOutsideClick } from "@/app/hooks/useOutsideClick";
import { useLoginModal } from "@/app/hooks/useLogin";
import { signOut } from "next-auth/react";
import { useRentalModal } from "@/app/hooks/useRent";
import LoginModal from "../modals/LoginModal";
import { IUser } from "@/types";

type Props = {
  currentUser?: IUser | null;
};

export default function UserAccount({ currentUser }: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const registerOpen = useRegisterModal((state) => state.onOpen);
  const loginOpen = useLoginModal((state) => state.onOpen);
  const rentOpen = useRentalModal((state) => state.onOpen);

  const menuRef = useOutsideClick(() => setIsOpen(false));

  const onRent = useCallback(() => {
    if (!currentUser) {
      return loginOpen();
    }
    rentOpen();
  }, [rentOpen, currentUser, loginOpen]);

  return (
    <div className="relative hidden md:inline-block" ref={menuRef}>
      <div className="flex items-center gap-3">
        <div
          onClick={onRent}
          className="hidden md:block text-sm font-medium px-4 rounded-full
  transition hover:bg-yellow-200/10 cursor-pointer
  "
        >
          <span className="whitespace-nowrap font-bold">Airbnb your home</span>
        </div>
        <div
          onClick={() => setIsOpen((prev) => !prev)}
          className="px-2 py-1 border-[0.5px] flex items-center gap-2 rounded-full cursor-pointer transition hover:shadow-md"
        >
          <AiOutlineMenu className="text-gray-800" />
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
              <BiSolidUserCircle className="text-gray-500" size={35} />
            )}
          </div>
        </div>
      </div>
      {isOpen && (
        <div
          className="absolute rounded-xl min-w-[15rem] max-w-[30vw] shadow-md bg-white overflow-hidden right-0 top-14 text-sm md:text-base
        z-10
        "
        >
          <div className="flex flex-col cursor-pointer">
            {currentUser ? (
              <>
                <AccountItem onClick={() => {}} label="My trips" />
                <AccountItem onClick={() => {}} label="My favorites" />
                <AccountItem onClick={() => {}} label="My reservations" />
                <AccountItem onClick={() => {}} label="My properties" />
                <AccountItem onClick={onRent} label="Airbnb my home" />
                <div className="w-full bg-gray-200 h-[1px] my-2"></div>
                <AccountItem onClick={signOut} label="Logout" />
              </>
            ) : (
              <>
                <AccountItem onClick={registerOpen} label="Sign up" />
                <AccountItem onClick={loginOpen} label="Log in" />
                <div className="w-full bg-gray-200 h-[1px] my-2"></div>
                <AccountItem onClick={onRent} label="Airbnb your home" />
                <AccountItem onClick={() => {}} label="Help" />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
