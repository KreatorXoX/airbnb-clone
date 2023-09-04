import prisma from "@/app/lib/prismadb";
import { Listing } from "@prisma/client";
import { cache } from "react";

export type ListingParams = {
  userId?: string;
};

// export const revalidate = 3600;
// cached and revalidated listings every one hour.
//  cache(async (params: ListingParams) => {

const getListings = async (params: ListingParams) => {
  try {
    const { userId } = params;

    let query: any = {};

    if (userId) {
      query.userId = userId;
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
