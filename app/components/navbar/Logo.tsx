"use client";
import { fontLogo } from "@/app/fonts";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Logo() {
  const router = useRouter();
  return (
    <div
      className="relative w-[75px] h-[50px] cursor-pointer hidden md:block"
      onClick={() => router.push("/")}
    >
      <Image src={"/images/logo.png"} fill sizes="75px" alt="logo" priority />
      <span
        className={`${fontLogo.className} absolute top-[22%] text-rose-500 left-14 text-xl hidden lg:block`}
      >
        airbnb
      </span>
    </div>
  );
}
