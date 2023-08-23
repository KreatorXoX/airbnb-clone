"use client";
import { User } from "@prisma/client";
import React from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

type Props = {
  listingId: string;
  currentUser: Partial<User> | null;
};

export default function FavouriteButton({ listingId, currentUser }: Props) {
  const isFavourite = true;
  const toggleFavourite = () => {};
  return (
    <div
      onClick={toggleFavourite}
      className="cursor-pointer relative hover:opacity-80 transition"
    >
      <AiOutlineHeart
        size={28}
        className="fill-white absolute -top-[2px] -right-[2px]"
      />
      <AiFillHeart
        size={24}
        className={`${isFavourite ? "fill-rose-500" : "fill-neutral-500/70"}`}
      />
    </div>
  );
}
