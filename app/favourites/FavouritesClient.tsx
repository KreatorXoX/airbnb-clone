"use client";
import { Listing } from "@prisma/client";

import ClientContainer from "../components/ClientContainer";
import Heading from "../components/Heading";
import ListingItem from "../components/listing/ListingItem";

import { IUser } from "@/types";

type Props = { favourites?: Listing[]; currentUser: IUser };

export default function FavouritesClient({ favourites, currentUser }: Props) {
  return (
    <ClientContainer>
      <div className="relative pb-10 md:pb-0 pt-[7rem]">
        <Heading
          title="Favourites"
          subtitle="List of places you have favourited"
        />

        <div className="mt-10 pb-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-10">
          {favourites?.map((favourite) => (
            <ListingItem
              key={favourite.id}
              listing={favourite}
              currentUser={currentUser}
            />
          ))}
        </div>
      </div>
    </ClientContainer>
  );
}
