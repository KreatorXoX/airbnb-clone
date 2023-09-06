import React from "react";
import ClientContainer from "../ClientContainer";
import Logo from "./Logo";
import UserAccount from "./UserAccount";

type Props = {};

export default function DummyNavbar({}: Props) {
  return (
    <nav className="fixed w-full bg-white pb-1 md:pb-0  shadow-sm md:shadow-none z-10">
      <div className=" py-4 border-transparent md:border-gray-200 md:border-b select-none">
        <ClientContainer>
          <div className="flex flex-row items-center justify-between gap-2 md:gap-0">
            <Logo />

            <UserAccount />
          </div>
        </ClientContainer>
      </div>
    </nav>
  );
}
