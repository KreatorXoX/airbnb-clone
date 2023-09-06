import { NextRequest, NextResponse } from "next/server";

import prisma from "@/app/lib/prismadb";
import cloudinary from "@/app/lib/cloudinary";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const {
    category,
    type,
    location,
    guestCount,
    bedroomCount,
    bedCount,
    bathroomCount,
    amenities,
    imageSrc,
    price,
    title,
    description,
  } = body;

  const currentUser = await getCurrentUser();

  if (!currentUser) {
    cloudinary.uploader.destroy(imageSrc.key);

    return new NextResponse("Unauthorized", {
      status: 401,
      statusText: "Login to create a new listing",
    });
  }

  const data = {
    category,
    type,
    location,
    guestCount: parseInt(guestCount, 10),
    bedroomCount: parseInt(bedroomCount, 10),
    bedCount: parseInt(bedCount, 10),
    bathroomCount: parseInt(bathroomCount, 10),
    amenities: amenities.filter((val: any) => val),
    imageSrc,
    price: parseInt(price, 10),
    title,
    description,
    userId: currentUser.id,
  };

  try {
    const listing = await prisma.listing.create({
      data: data,
    });

    if (!listing) {
      cloudinary.uploader.destroy(imageSrc.key);
      return new NextResponse("Creating listing error", {
        status: 500,
        statusText: "Failed to create new listing in Prisma",
      });
    }

    //revalidatePath("/");

    return NextResponse.json(listing);
  } catch (error) {
    cloudinary.uploader.destroy(imageSrc.key);
    console.log(error);
  }
}
