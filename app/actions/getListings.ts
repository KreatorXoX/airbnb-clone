import prisma from "@/app/lib/prismadb";
import { Listing } from "@prisma/client";
import { cache } from "react";

export type ListingParams = {
  userId?: string;
  location?: string;
  bedroomCount?: number;
  bedCount?: number;
  bathroomCount?: number;
  guestCount?: number;
  startDate?: string;
  endDate?: string;
  category?: string;
};

// export const revalidate = 3600;
// cached and revalidated listings every one hour.
//  cache(async (params: ListingParams) => {

const getListings = async (params: ListingParams) => {
  try {
    const {
      userId,
      location,
      bedroomCount,
      bedCount,
      bathroomCount,
      guestCount,
      startDate,
      endDate,
      category,
    } = params;

    let query: any = {};

    if (userId) {
      query.userId = userId;
    }
    if (location) {
      query.location = {
        is: { value: location },
      };
    }
    if (bedroomCount) {
      query.bedroomCount = {
        gte: +bedroomCount,
      };
    }
    if (bedCount) {
      query.bedCount = {
        gte: +bedCount,
      };
    }
    if (bathroomCount) {
      query.bathroomCount = {
        gte: +bathroomCount,
      };
    }
    if (guestCount) {
      query.guestCount = {
        gte: +guestCount,
      };
    }
    if (category) {
      query.category = { equals: category };
    }

    if (startDate && endDate) {
      query.NOT = {
        reservations: {
          some: {
            OR: [
              { endDate: { gte: startDate }, startDate: { lte: endDate } },
              { startDate: { lte: endDate }, endDate: { gte: endDate } },
            ],
          },
        },
      };
    }

    const listings = await prisma.listing.findMany({
      where: query,
      orderBy: { createdAt: "desc" },
    });

    if (!listings) return null;

    return listings as Listing[];
  } catch (error) {
    console.log(error);
  }
};

export default getListings;
