"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useCallback } from "react";
import { IconType } from "react-icons";

type Props = {
  icon: IconType;
  label: string;
  selected?: boolean;
};

export default function CategoryBox({ icon: Icon, label, selected }: Props) {
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
    
    ${selected ? "text-neutral-800" : "text-neutral-500"}
    ${selected ? "border-b-neutral-800" : "border-transparent"}
    flex flex-col items-center justify-center gap-2 p-3 border-b-2 hover:text-neutral-800 hover:border-b-2 hover:border-b-neutral-500 transition cursor-pointer`}
    >
      <Icon size={26} />
      <div className="font-medium text-sm">{label}</div>
    </div>
  );
}
