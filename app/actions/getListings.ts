import { getServerSession } from "next-auth/next";

import { authOptions } from "@/pages/api/auth/[...nextauth]";
import prisma from "@/app/lib/prismadb";

export default async function getListings() {
  try {
    const listings = await prisma.listing.findMany();

    if (!listings) return null;

    return listings;
  } catch (error) {
    console.log(error);
  }
}
