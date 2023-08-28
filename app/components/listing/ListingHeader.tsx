"use client";
import { Country } from "@/app/hooks/useCountries";
import { IUser } from "@/types";
import React from "react";
import Heading from "../Heading";
import Image from "next/image";
import FavouriteButton from "../FavouriteButton";

type Props = {
  id: string;
  title: string;
  imageUrl: string;
  location: Country;
  currentUser: IUser | null;
};

export default function ListingHeader({
  id,
  title,
  imageUrl,
  location,
  currentUser,
}: Props) {
  return (
    <>
      <Heading
        title={title}
        subtitle={`${location.countryRegion}, ${location.label}`}
      />
      <div className="w-full h-[60vh] overflow-hidden rounded-xl relative">
        <Image
          alt="Listing"
          src={imageUrl}
          fill
          sizes="33vw"
          className=" object-cover w-full"
        />
        <div className="absolute top-5 right-5">
          <FavouriteButton big listingId={id} currentUser={currentUser} />
        </div>
      </div>
    </>
  );
}
