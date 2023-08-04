"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useCallback } from "react";
import Image from "next/image";
import CategoryIcon from "../CategoryIcon";

type Props = {
  iconUrl: string;
  label: string;
  selected?: boolean;
};

export default function CategoryBox({ iconUrl, label, selected }: Props) {
  const router = useRouter();
  const params = useSearchParams();

  const handleClick = useCallback(() => {
    if (params) {
      const initialQuery = Object.fromEntries(params?.entries());

      const newQuery = {
        ...initialQuery,
        category: label,
      };
      const updatedQueryString = new URLSearchParams(newQuery);

      if (params.get("category") === label) {
        updatedQueryString.delete("category");
      }

      const url = `http://localhost:3000?${updatedQueryString}`;
      router.push(url);
    }
  }, [params, label, router]);
  return (
    <div
      onClick={handleClick}
      className={`
      ${selected ? "" : " hover:border-b-2 hover:border-b-neutral-500 "}
    flex flex-col items-center pb-1 px-1 justify-center group border-b-2 border-transparent hover:text-neutral-800 transition cursor-pointer
     
    `}
    >
      {/* <div
        className={`${
          selected ? "brightness-100" : "brightness-200"
        } h-[32px] relative w-[32px] brightness-200 group-hover:brightness-100 transition`}
      >
        <Image src={iconUrl} fill alt={`${label}`} priority />
      </div> */}
      <CategoryIcon iconUrl={iconUrl} label={label} selected={selected} />
      <div className="font-medium text-xs md:text-sm">{label}</div>
    </div>
  );
}
