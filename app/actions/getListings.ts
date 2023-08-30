import prisma from "@/app/lib/prismadb";
import { Listing } from "@prisma/client";

export type ListingParams = {
  userId?: string;
};
export default async function getListings(params: ListingParams) {
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
}
