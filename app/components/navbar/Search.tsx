"use client";
import React from "react";
import { BiSearch } from "react-icons/bi";
export default function Search() {
  return (
    <div className="border w-full md:w-auto py-2 rounded-full shadow-sm hover:shadow-md cursor-pointer">
      <div className="flex ml-10 items-start text-xs md:items-center md:justify-between flex-col md:flex-row">
        <div className="truncate md:text-sm font-medium px-5 ">Anywhere</div>
        <div className="flex items-center justify-start">
          <div
            className="truncate relative hidden group/item sm:inline-block text-gray-600 md:text-gray-800 md:text-sm md:font-medium px-5 md:px-6 border-r md:border-x flex-1 
          md:text-center text-left"
          >
            Any Week
          </div>
          <div className="md:text-sm pl-6 pr-2 text-gray-600 flex flex-row items-center gap-3">
            <div className="hidden sm:block">Add Guest</div>
            <div
              className="p-2 md:bg-rose-500 text-xl md:text-base rounded-full md:text-white absolute md:static 
            top-[1.15rem] left-[1.5rem] sm:top-6 sm:left-6
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
