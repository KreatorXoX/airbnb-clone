"use client";

import ClientContainer from "@/app/components/ClientContainer";
import DatePicker from "@/app/components/inputs/DatePicker";
import ListingBody from "@/app/components/listing/ListingBody";
import ListingHeader from "@/app/components/listing/ListingHeader";
import useCategories from "@/app/hooks/useCategories";
import { IUser } from "@/types";
import { Listing, Reservation } from "@prisma/client";
import React from "react";

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: "selection",
};

type Props = {
  listing: Listing & { user: IUser };
  currentUser: IUser | null;
  reservations?: Reservation[];
};

export default function ListingClient({
  listing,
  reservations = [],
  currentUser,
}: Props) {
  const { getCategoryById } = useCategories();
  const category = getCategoryById(listing.category);
  return (
    <ClientContainer>
      <div className="relative max-w-screen-lg mx-auto">
        <div className="flex flex-col gap-5">
          <ListingHeader
            id={listing.id}
            title={listing.title}
            imageUrl={listing.imageSrc.url}
            location={listing.location}
            currentUser={currentUser}
          />
          <div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-5">
            <ListingBody
              user={listing.user}
              location={listing.location}
              type={listing.type}
              category={category}
              amenities={listing.amenities}
              description={listing.description}
              bedroomCount={listing.bedroomCount}
              bedCount={listing.bedCount}
              bathroomCount={listing.bathroomCount}
              guestCount={listing.guestCount}
            />
            <div
              className="
              order-first
             md:order-last
            md:max-h-96 cols-span-1 md:col-span-3 md:sticky md:top-[22%]"
            >
              <div className="p-2 border rounded-xl">
                <DatePicker />
              </div>
            </div>
          </div>
        </div>
      </div>
    </ClientContainer>
  );
}
