"use client";
import { IReservation, IUser } from "@/types";
import React, { useCallback, useState } from "react";
import ClientContainer from "../components/ClientContainer";
import Heading from "../components/Heading";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";
import ListingItem from "../components/listing/ListingItem";

type Props = {
  reservations?: IReservation[];
  currentUser: IUser;
};

export default function ReservationsClient({
  reservations,
  currentUser,
}: Props) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState<string>();

  const handleCancel = useCallback(
    (id: string) => {
      setIsDeleting(id);

      axios
        .delete(`/api/reservations/${id}`)
        .then(() => {
          toast.success("Reservation canceled");
          router.refresh();
        })
        .catch((err) => {
          toast.error("Something went wrong while canceling");
        })
        .finally(() => {
          setIsDeleting(undefined);
        });
    },
    [router]
  );
  return (
    <ClientContainer>
      <div className="relative pb-10 md:pb-0 pt-[7rem]">
        <Heading title="Reservations" subtitle="Bookings on your properties" />

        <div className="mt-10 pb-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-10">
          {reservations?.map((reservation) => (
            <ListingItem
              key={reservation.id}
              actionId={reservation.id}
              actionLabel="Cancel guest reservation"
              onAction={handleCancel}
              disabled={isDeleting === reservation.id}
              reservation={reservation}
              listing={reservation.listing}
              currentUser={currentUser}
            />
          ))}
        </div>
      </div>
    </ClientContainer>
  );
}
