import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/lib/prismadb";

type Params = {
  reservationId?: string;
};

export async function DELETE(req: Request, { params }: { params: Params }) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { reservationId } = params;

  if (!reservationId || typeof reservationId !== "string") {
    throw new Error("Invalid reservation id");
  }

  const reservation = await prisma.reservation.deleteMany({
    where: {
      id: reservationId,
      OR: [
        // creator of the reservation can do this action
        { userId: currentUser.id },
        // creator of the listing can do this action
        { listing: { userId: currentUser.id } },
      ],
    },
  });

  return NextResponse.json(reservation);
}
