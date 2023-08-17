import prisma from "@/app/lib/prismadb";

export default async function getListings() {
  try {
    const listings = await prisma.listing.findMany({
      orderBy: { createdAt: "desc" },
    });

    if (!listings) return null;

    return listings;
  } catch (error) {
    console.log(error);
  }
}
