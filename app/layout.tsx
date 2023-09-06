import "./globals.css";
import type { Metadata } from "next";

import Navbar from "./components/navbar/Navbar";

import RegisterModal from "./components/modals/RegisterModal";
import ToasterProvider from "./providers/ToasterProvider";
import LoginModal from "./components/modals/LoginModal";
import getCurrentUser from "./actions/getCurrentUser";
import { font } from "./fonts";
import SmallUserAccount from "./components/navbar/SmallUserAccount";

import RentModal from "./components/modals/RentModal";
import SearchModal from "./components/modals/SearchModal";
import { Suspense } from "react";
import DummyNavbar from "./components/navbar/DummyNavbar";

export const metadata: Metadata = {
  title: "Airbnb Clone",
  description:
    "This is a fullstack Airbnb clone that uses next.js 13 app directory",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();

  return (
    <html lang="en">
      <body className={font.className}>
        <Suspense fallback={<DummyNavbar />}>
          <Navbar currentUser={currentUser} />
        </Suspense>
        <RegisterModal />
        <LoginModal />
        <RentModal />
        <Suspense fallback={<div>Search Modal</div>}>
          <SearchModal />
        </Suspense>
        <ToasterProvider />
        <div className="absolute bottom-0 w-full md:hidden">
          <SmallUserAccount currentUser={currentUser} />
        </div>
        {children}
      </body>
    </html>
  );
}
