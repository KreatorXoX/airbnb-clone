import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

import prisma from "@/app/lib/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export async function POST(req: NextRequest) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    // cloudinary.uploader.destroy()
    // get public_id  to delete image right now we are only getting the secure_url
    return new NextResponse("Unauthorized", {
      status: 401,
      statusText: "Login to create a new listing",
    });
  }

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

  const listing = await prisma.listing.create({
    data: data,
  });

  if (!listing)
    return new NextResponse("Creating listing error", {
      status: 500,
      statusText: "Failed to create new listing in Prisma",
    });

  return NextResponse.json(listing);
}
