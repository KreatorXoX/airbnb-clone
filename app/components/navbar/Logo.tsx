"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Logo() {
  const router = useRouter();
  return (
    <div
      className="relative w-[75px] h-[50px] cursor-pointer"
      onClick={() => router.push("/")}
    >
      <Image
        className="hidden md:inline-block "
        src={"/images/logo.png"}
        fill
        sizes="75px"
        alt="logo"
        priority
      />
      <span
        className={`font-logo absolute top-[22%] text-rose-500 left-14 text-xl hidden lg:block`}
      >
        airbnb
      </span>
    </div>
  );
}
