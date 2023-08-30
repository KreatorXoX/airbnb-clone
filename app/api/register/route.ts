import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

import prisma from "@/app/lib/prismadb";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const { email, name, password } = body;

  const hashedPassword = await bcrypt.hash(password, 12);
  if (!hashedPassword) {
    throw new Error("Trouble when hashing the password");
  }
  const user = await prisma.user.create({
    data: {
      name,
      email,
      hashedPassword,
    },
  });

  if (!user) {
    return new NextResponse("Creating user error", {
      status: 500,
      statusText: "Failed to create user in Prisma",
    });
  }

  return NextResponse.json(user);
}
