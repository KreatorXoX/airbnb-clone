"use client";

import ClientContainer from "../ClientContainer";
import Logo from "./Logo";
import Search from "./Search";
import UserAccount from "./UserAccount";
import Categories from "./Categories";
import { IUser } from "@/types";
import { usePathname } from "next/navigation";

type Props = {
  currentUser?: IUser | null;
};

export default function Navbar({ currentUser }: Props) {
  const pathname = usePathname();

  return (
    <nav className="fixed w-full bg-white pb-1 md:pb-0  shadow-sm md:shadow-none z-10">
      <div className=" py-4 border-transparent md:border-gray-200 md:border-b select-none">
        <ClientContainer>
          <div className="flex flex-row items-center justify-between gap-2 md:gap-0">
            <Logo />
            <Search />
            <UserAccount currentUser={currentUser} />
          </div>
        </ClientContainer>
      </div>
      {pathname === "/" && <Categories />}
    </nav>
  );
}
