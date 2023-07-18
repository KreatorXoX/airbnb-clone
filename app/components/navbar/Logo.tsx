"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Poppins } from "next/font/google";

const font = Poppins({ subsets: ["latin"], weight: "600" });
export default function Logo() {
  const router = useRouter();
  return (
    <div className="relative">
      <Image
        className="hidden md:inline-block cursor-pointer"
        src={"/images/logo.png"}
        height={75}
        width={75}
        alt="logo"
      />
      <span
        className={`${font.className} absolute top-[22%] text-rose-500 left-14 text-xl hidden lg:block`}
      >
        airbnb
      </span>
    </div>
  );
}
