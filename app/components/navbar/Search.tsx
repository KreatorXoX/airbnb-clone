"use client";
import { useSearchFilters } from "@/app/hooks/useSearchFilters";
import React from "react";
import { BiSearch } from "react-icons/bi";
export default function Search() {
  const { onOpen } = useSearchFilters();
  return (
    <div
      onClick={() => onOpen()}
      className="border w-full md:w-fit py-2 rounded-full shadow-md md:shadow-sm hover:shadow-md cursor-pointer"
    >
      <div className="flex ml-10 md:ml-5 items-start text-xs md:items-center md:justify-between flex-col md:flex-row">
        <div className="truncate font-bold md:text-sm px-5 ">Anywhere</div>
        <div className="flex items-center justify-start">
          <div
            className="truncate md:font-bold relative group/item  text-gray-600 md:text-gray-800 md:text-sm px-5 md:px-6 md:border-x flex-1 
          md:text-center text-left"
          >
            Any Week
            <span className=" inline md:hidden h-[2px] rounded-full w-[2px] bg-gray-500 absolute top-2 right-2"></span>
          </div>
          <div className="md:text-sm md:pl-6 pr-2 text-gray-600 flex flex-row items-center gap-3">
            <div>Add Guest</div>
            <div
              className="p-2 md:bg-rose-500 text-xl md:text-base rounded-full md:text-white absolute md:static 
            top-6 left-6
            "
            >
              <BiSearch />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
