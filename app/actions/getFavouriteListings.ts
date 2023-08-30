import prisma from "@/app/lib/prismadb";
import { Listing } from "@prisma/client";
import getCurrentUser from "./getCurrentUser";

export default async function getFavourites() {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return [];
    }

    const favourites = await prisma.listing.findMany({
      where: {
        id: {
          in: [...(currentUser.favoriteListings || [])],
        },
      },
    });

    if (!favourites) return [];

    return favourites as Listing[];
  } catch (error) {
    console.log(error);
  }
}
