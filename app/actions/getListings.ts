import prisma from "@/app/lib/prismadb";
import { Listing } from "@prisma/client";

export default async function getListings() {
  try {
    const listings = await prisma.listing.findMany({
      orderBy: { createdAt: "desc" },
    });

    if (!listings) return null;

    return listings as Listing[];
  } catch (error) {
    console.log(error);
  }
}
