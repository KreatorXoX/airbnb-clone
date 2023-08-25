"use client";
import React from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import useFavourite from "@/app/hooks/useFavourite";
import { IUser } from "@/types";

type Props = {
  listingId: string;
  currentUser: IUser | null;
  big?: boolean;
};

export default function FavouriteButton({
  listingId,
  currentUser,
  big,
}: Props) {
  const { isFavourite, toggleFavourite } = useFavourite({
    listingId,
    currentUser,
  });
  return (
    <div
      onClick={toggleFavourite}
      className="cursor-pointer relative hover:opacity-80 transition"
    >
      <AiOutlineHeart
        size={big ? 36 : 28}
        className="fill-white absolute -top-[2px] -right-[2px]"
      />
      <AiFillHeart
        size={big ? 32 : 24}
        className={`${isFavourite ? "fill-rose-500" : "fill-neutral-500/70"}`}
      />
    </div>
  );
}
