"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useCallback } from "react";
import CategoryIcon from "../CategoryIcon";

type Props = {
  id: string;
  iconUrl: string;
  label: string;
  selected?: boolean;
};

export default function CategoryBox({ id, iconUrl, label, selected }: Props) {
  const router = useRouter();
  const params = useSearchParams();

  const handleClick = useCallback(() => {
    if (params) {
      const initialQuery = Object.fromEntries(params?.entries());

      const newQuery = {
        ...initialQuery,
        category: id,
      };
      const updatedQueryString = new URLSearchParams(newQuery);

      if (params.get("category") === id) {
        updatedQueryString.delete("category");
      }

      const url = `http://localhost:3000?${updatedQueryString}`;
      router.push(url);
    }
  }, [params, id, router]);
  return (
    <div
      onClick={handleClick}
      className={`
      ${
        selected
          ? "text-black"
          : " hover:border-b-2 hover:border-b-neutral-500 "
      }
    flex flex-col items-center pb-1 px-1 justify-center group border-b-2 border-transparent hover:text-neutral-900 transition cursor-pointer
     
    `}
    >
      <CategoryIcon iconUrl={iconUrl} label={label} selected={selected} />
      <div className="font-medium text-xs md:text-sm">{label}</div>
    </div>
  );
}
