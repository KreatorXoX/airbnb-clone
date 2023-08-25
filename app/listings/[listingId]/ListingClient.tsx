"use client";

import ClientContainer from "@/app/components/ClientContainer";
import ListingBody from "@/app/components/listing/ListingBody";
import ListingHeader from "@/app/components/listing/ListingHeader";
import useCategories from "@/app/hooks/useCategories";
import { IUser } from "@/types";
import { Listing, Reservation, User } from "@prisma/client";
import React from "react";

type Props = {
  listing: Listing & { user: IUser };
  currentUser: IUser | null;
  reservations?: Reservation[];
};

export default function ListingClient({ listing, currentUser }: Props) {
  const { getCategoryById } = useCategories();
  const category = getCategoryById(listing.category);
  return (
    <ClientContainer>
      <div className=" max-w-screen-lg mx-auto">
        <div className="flex flex-col gap-5">
          <ListingHeader
            id={listing.id}
            title={listing.title}
            imageUrl={listing.imageSrc.url}
            location={listing.location}
            currentUser={currentUser}
          />
          <div className="grid grid-cols-1 md:grid-cols-6 md:gap-10 mt-5">
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
            <div className="w-full h-full  cols-span-1 md:col-span-2 bg-red-500 ">
              <div className="h-10 w-10 text-white">ASD</div>
            </div>
          </div>
        </div>
      </div>
    </ClientContainer>
  );
}
