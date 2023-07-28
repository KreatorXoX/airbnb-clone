import "./globals.css";
import type { Metadata } from "next";

import Navbar from "./components/navbar/Navbar";

import RegisterModal from "./components/modals/RegisterModal";
import ToasterProvider from "./providers/ToasterProvider";
import LoginModal from "./components/modals/LoginModal";
import getCurrentUser from "./actions/getCurrentUser";
import { font } from "./fonts";
import SmallUserAccount from "./components/navbar/SmallUserAccount";

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
        <Navbar currentUser={currentUser} />
        {children}
        <RegisterModal />
        <LoginModal />
        <ToasterProvider />
        <div className="absolute min-h-screen top-0 w-full">
          <div className="relative min-h-screen ">
            <SmallUserAccount />
          </div>
        </div>
      </body>
    </html>
  );
}
