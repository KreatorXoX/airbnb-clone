"use client";

import ClientContainer from "@/app/components/ClientContainer";
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
        </div>
      </div>
    </ClientContainer>
  );
}
