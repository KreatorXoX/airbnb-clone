import prisma from "@/app/lib/prismadb";
import { IReservation } from "@/types";
import { Listing, Reservation } from "@prisma/client";

type Params = {
  listingId?: string;
  userId?: string;
  creatorId?: string;
};
export default async function getReservations(params: Params) {
  try {
    const { listingId, userId, creatorId } = params;

    const query: any = {};

    // if we look up reservations with listingId
    // we get all the reservations on that listing
    // which means that a customer who wants to create a reservation
    // should see all the reserved dates.
    if (listingId) query.listingId = listingId;

    // if we look up reservations with userId
    // we get all the reservations that user created
    // which means that a customer who wants to see their
    // own reservations.
    if (userId) query.userId = userId;

    // if we look up reservations with creatorId
    // we get all the reservations made to the creator of the listing
    // which means that a customer who wants to see their
    // own listing's reservations
    if (creatorId) query.listing = { userId: creatorId };
    const reservations = await prisma.reservation.findMany({
      where: query,
      include: { listing: true },
      orderBy: {
        createdAt: "desc",
      },
    });

    if (!reservations) return [];

    return reservations as IReservation[];
  } catch (error) {
    console.log(error);
  }
}
