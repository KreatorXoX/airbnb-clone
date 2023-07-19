import "./globals.css";
import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import { Poppins } from "next/font/google";

import Navbar from "./components/navbar/Navbar";
import Modal from "./components/modals/Modal";
import RegisterModal from "./components/modals/RegisterModal";

export const metadata: Metadata = {
  title: "Airbnb Clone",
  description:
    "This is a fullstack Airbnb clone that uses next.js 13 app directory",
};

const fontLogo = Poppins({
  subsets: ["latin"],
  variable: "--font-logo",
  weight: "600",
});
const font = Nunito({
  subsets: ["latin"],
  variable: "--font-general",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${font.variable} ${fontLogo.variable}`}>
      <body className="font-general">
        <Navbar />
        {children}
        <RegisterModal />
      </body>
    </html>
  );
}
