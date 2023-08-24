import { getServerSession } from "next-auth/next";

import { authOptions } from "@/pages/api/auth/[...nextauth]";
import prisma from "@/app/lib/prismadb";
import { IUser } from "@/types";

export default async function getCurrentUser() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return null;
    }
    const currentUser = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        favoriteListings: true,
        listings: true,
        reservations: true,
      },
    });

    if (!currentUser) {
      return null;
    }

    const user: IUser = {
      ...currentUser,
    };

    return user;
  } catch (error) {
    return null;
  }
}
