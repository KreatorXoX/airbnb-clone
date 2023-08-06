"use client";
import { fontLogo } from "@/app/fonts";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Logo() {
  const router = useRouter();
  return (
    <div
      className="relative w-[75px] h-[47px] cursor-pointer hidden md:inline-block"
      onClick={() => router.push("/")}
    >
      <Image src={"/images/logo.png"} fill sizes="75px" alt="logo" priority />
      <span
        className={`${fontLogo.className} absolute top-[18%] text-rose-500 left-14 tracking-tighter text-[1.35rem] hidden lg:block`}
      >
        airbnb
      </span>
    </div>
  );
}
