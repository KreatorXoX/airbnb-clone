import prisma from "@/app/lib/prismadb";
import { IUser } from "@/types";
import { Listing, User } from "@prisma/client";

import { cache } from "react";

type Params = {
  listingId?: string;
};

//export const revalidate = 3600;
// cached and revalidated listing every one hour.
//cache(async (params: Params) => {

const getListingById = async (params: Params) => {
  try {
    const listing = await prisma.listing.findUnique({
      where: {
        id: params.listingId,
      },

      select: {
        id: true,
        title: true,
        description: true,
        imageSrc: true,
        createdAt: true,
        category: true,
        bedroomCount: true,
        bedCount: true,
        bathroomCount: true,
        guestCount: true,
        location: true,
        price: true,
        amenities: true,
        type: true,
        userId: true,
        reservations: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
            favoriteListings: true,
            listings: true,
            reservations: true,
          },
        },
      },
    });

    if (!listing) return null;

    return listing as Listing & { user: IUser };
  } catch (error) {
    console.log(error);
  }
};

export default getListingById;
