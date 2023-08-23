"use client";
import { User, Listing, Reservation } from "@prisma/client";
import { useRouter } from "next/navigation";
import React, { useCallback, useMemo } from "react";
import Image from "next/image";
import FavouriteButton from "../FavouriteButton";
import Button from "../Button";
import useCategories from "@/app/hooks/useCategories";

type Props = {
  listing: Listing;
  currentUser: Partial<User> | null;
  reservation?: Reservation;
  onAction?: (id: string) => void;
  actionLabel?: string;
  actionId?: string;
  disabled?: boolean;
};

export default function ListingItem({
  listing,
  currentUser,
  reservation,
  onAction,
  actionId = "",
  actionLabel,
  disabled,
}: Props) {
  const { getCategoryById } = useCategories();
  const category = getCategoryById(listing.category);
  const router = useRouter();
  const location = listing.location;

  const handleCancel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();

      if (disabled) {
        return;
      }

      // if (onAction && actionId) {
      //   onAction(actionId);
      // }

      onAction?.(actionId);
    },
    [onAction, actionId, disabled]
  );

  const price = useMemo(() => {
    if (reservation) {
      return reservation.totalPrice;
    }
    return listing.price;
  }, [listing.price, reservation]);

  const reservationDate = useMemo(() => {
    if (!reservation) {
      return null;
    }
    const start = new Date(reservation.startDate);
    const end = new Date(reservation.endDate);

    return `${start.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })} - ${end.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })}`;
  }, [reservation]);

  return (
    <div
      onClick={() => router.push(`/listings/${listing.id}`)}
      className="col-span-1 cursor-pointer group"
    >
      <div className="flex flex-col gap-2 w-full">
        <div className=" aspect-square w-full relative overflow-hidden rounded-xl">
          <Image
            fill
            src={listing.imageSrc.url}
            alt="listing"
            className="object-cover h-full w-full group-hover:scale-105 transition"
          />
          <div className="absolute top-3 right-3">
            <FavouriteButton listingId={listing.id} currentUser={currentUser} />
          </div>
        </div>
        <div>
          {location.countryRegion} - {location.label}
        </div>
        <div className="font-light text-neutral-500">
          {reservationDate || category?.label}
        </div>
        <div className="flex items-center gap-1">
          <div className="font-semibold">${price.toFixed(2)}</div>
          {!reservation && <div className="font-light">night</div>}
        </div>
        {onAction && actionLabel && (
          <Button
            disabled={disabled}
            small
            label={actionLabel}
            onClick={handleCancel}
          />
        )}
      </div>
    </div>
  );
}
