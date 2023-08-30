import { NextRequest, NextResponse } from "next/server";

import prisma from "@/app/lib/prismadb";
import cloudinary from "@/app/lib/cloudinary";
import getCurrentUser from "@/app/actions/getCurrentUser";

type Params = {
  listingId?: string;
};

export async function DELETE(req: Request, { params }: { params: Params }) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return new NextResponse("Unauthorized", {
      status: 401,
      statusText: "Login to delete your property",
    });
  }

  const { listingId } = params;

  if (!listingId || typeof listingId !== "string") {
    throw new Error("Invalid listing id");
  }

  try {
    const listing = await prisma.listing.findUnique({
      where: {
        id: listingId,
      },
    });

    if (!listing) {
      return new NextResponse("Fetching listing error", {
        status: 500,
        statusText: "Failed to fetch listing in Prisma",
      });
    }

    const result = await prisma.listing.deleteMany({
      where: { id: listingId, userId: currentUser.id },
    });

    if (!result) {
      return new NextResponse("Deleting listing error", {
        status: 500,
        statusText: "Failed to delete listing in Prisma",
      });
    }

    cloudinary.uploader.destroy(listing.imageSrc.key);

    return NextResponse.json({ message: "Success" });
  } catch (error: any) {
    console.log(error.message);
  }
}
