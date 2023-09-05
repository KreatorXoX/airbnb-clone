"use client";
import { Country } from "@/app/hooks/useCountries";
import { IUser } from "@/types";
import { Category } from "@/utils/categories";
import React from "react";
import { BiSolidUserCircle } from "react-icons/bi";
import Image from "next/image";
import ListingCategory from "./ListingCategory";
import ListingInfo from "./ListingInfo";

import useAmenities from "@/app/hooks/useAmenities";
import Map from "../Map";

type Props = {
  user: IUser | null;
  location: Country;
  category?: Category;
  amenities: string[];
  type: string;
  description: string;
  bedroomCount: number;
  bedCount: number;
  bathroomCount: number;
  guestCount: number;
};

export default function ListingBody({
  user,
  location,
  category,
  amenities,
  type,
  description,
  bedroomCount,
  bedCount,
  bathroomCount,
  guestCount,
}: Props) {
  const { getAmenitiesByIds } = useAmenities();

  const listingAmenities = getAmenitiesByIds(amenities);

  const coordinates = location.countryLatLng;
  const zoom = location.zoom;

  return (
    <div className="col-span-4 flex flex-col gap-8">
      {/* body header */}
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <div className="text-xl font-semibold flex items-center justify-between gap-4 ">
            <h3 className=" first-letter:uppercase">
              {type === "room"
                ? "room in this"
                : type === "entire"
                ? "entire"
                : "shared room in this"}{" "}
              {category?.label} Hosted by {user?.name}
            </h3>
          </div>
          <div className="flex flex-row items-center gap-4 font-light text-neutral-500">
            <span>
              {guestCount} {guestCount === 1 ? "guest" : "guests"}
            </span>
            <span>
              {bedroomCount} {bedroomCount === 1 ? "bedroom" : "bedrooms"}
            </span>

            <span>
              {bedCount} {bedCount === 1 ? "bed" : "beds"}
            </span>
            <span>
              {bathroomCount} {bathroomCount === 1 ? "bathroom" : "bathrooms"}
            </span>
          </div>
        </div>
        <div className="relative">
          {user?.image ? (
            <Image
              className="object-cover rounded-full"
              width={50}
              height={50}
              src={`${user.image}`}
              alt={`${user.name}`}
            />
          ) : (
            <BiSolidUserCircle className="text-gray-500" size={45} />
          )}
        </div>
      </div>
      <hr />
      {/* category description */}
      <ListingCategory category={category!} />
      <hr />
      {/* listing description */}
      <ListingInfo description={description} />
      <hr />
      {/* amenities */}
      <div className="flex flex-col gap-4">
        <h5 className="text-xl">What this place offers</h5>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {listingAmenities?.map((amenity) => (
            <div key={amenity.id} className=" col-span-1">
              <div className=" flex items-center">
                <div className="relative h-8 w-8">
                  <Image
                    alt="amenity"
                    src={amenity.iconUrl}
                    sizes="33vw"
                    fill
                    className=" object-cover"
                  />
                </div>
                <span className="text-sm text-neutral-800">
                  {amenity.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <hr />
      {/* location of the place */}
      <Map givenLatLng={coordinates} givenZoom={zoom} staticMap />
    </div>
  );
}
