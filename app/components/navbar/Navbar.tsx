"use client";
import { User } from "@prisma/client";
import ClientContainer from "../ClientContainer";
import Logo from "./Logo";
import Search from "./Search";
import UserAccount from "./UserAccount";
import Categories from "./Categories";

type Props = {
  currentUser?: User | null;
};

export default function Navbar({ currentUser }: Props) {
  return (
    <nav className="fixed w-full bg-white pb-1 md:pb-0  shadow-sm md:shadow-none">
      <div className="pb-2 py-4 border-transparent md:border-gray-200 md:border-b select-none">
        <ClientContainer>
          <div className="flex flex-row items-center justify-between gap-2 md:gap-0">
            <Logo />
            <Search />
            <UserAccount currentUser={currentUser} />
          </div>
        </ClientContainer>
      </div>
      <Categories />
    </nav>
  );
}
