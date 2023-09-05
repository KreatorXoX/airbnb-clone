"use client";
import { useSearchFilters } from "@/app/hooks/useSearchFilters";
import { useSearchParams } from "next/navigation";
import React, { useMemo } from "react";
import { BiSearch } from "react-icons/bi";
import useCountries from "@/app/hooks/useCountries";
export default function Search() {
  const { onOpen } = useSearchFilters();
  const params = useSearchParams();
  const { getCountryByCode } = useCountries();

  let initialQuery: any = {};
  if (params) {
    initialQuery = Object.fromEntries(params?.entries());
  }

  const locationLabel = useMemo(() => {
    if (initialQuery.location) {
      return getCountryByCode(initialQuery.location)?.label;
    }
    return "Anywhere";
  }, [initialQuery.location, getCountryByCode]);

  const weekLabel = useMemo(() => {
    if (initialQuery.startDate && initialQuery.endDate) {
      const start = new Date(initialQuery.startDate as string);
      const end = new Date(initialQuery.endDate as string);
      return `${start.toDateString()} - ${end.toDateString()}`;
    }
    return "Any Week";
  }, [initialQuery.startDate, initialQuery.endDate]);

  const guestLabel = useMemo(() => {
    if (initialQuery.guestCount) {
      return `${
        initialQuery.guestCount === "1"
          ? `${initialQuery.guestCount} Guest`
          : `${initialQuery.guestCount} Guests`
      }`;
    }
    return "Add Guest";
  }, [initialQuery.guestCount]);

  return (
    <div
      onClick={() => onOpen()}
      className="border w-full md:w-fit py-2 rounded-full shadow-md md:shadow-sm hover:shadow-md cursor-pointer"
    >
      <div className="flex ml-10 md:ml-5 items-start text-xs md:items-center md:justify-between flex-col md:flex-row">
        <div className="truncate font-bold md:text-sm px-5 ">
          {locationLabel}
        </div>
        <div className="flex items-center justify-start">
          <div
            className="truncate md:font-bold relative group/item  text-gray-600 md:text-gray-800 md:text-sm px-5 md:px-6 md:border-x flex-1 
          md:text-center text-left"
          >
            {weekLabel}
            <span className=" inline md:hidden h-[2px] rounded-full w-[2px] bg-gray-500 absolute top-2 right-2"></span>
          </div>
          <div className="md:text-sm md:pl-6 pr-2 text-gray-600 flex flex-row items-center gap-3">
            <div>{guestLabel}</div>
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
