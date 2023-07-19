"use client";
import ClientContainer from "../ClientContainer";
import Logo from "./Logo";
import Search from "./Search";
import UserAccount from "./UserAccount";

export default function Navbar() {
  return (
    <nav className=" fixed w-full bg-white shadow-sm">
      <div className="py-4 border-b-[1px] select-none">
        <ClientContainer>
          <div className="flex flex-row items-center justify-between gap-2 md:gap-0">
            <Logo />
            <Search />
            <UserAccount />
          </div>
        </ClientContainer>
      </div>
    </nav>
  );
}
