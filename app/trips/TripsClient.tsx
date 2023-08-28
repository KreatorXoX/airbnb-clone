"use client";
import { IReservation, IUser } from "@/types";
import React, { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import ClientContainer from "../components/ClientContainer";
import Heading from "../components/Heading";
import ListingItem from "../components/listing/ListingItem";
import axios, { AxiosError } from "axios";
import { toast } from "react-hot-toast";

type Props = { reservations?: IReservation[]; currentUser: IUser };

export default function TripsClient({ reservations, currentUser }: Props) {
  const [isDeleting, setIsDeleting] = useState<string>();
  const router = useRouter();
  const handleCancel = useCallback(
    (id: string) => {
      setIsDeleting(id);

      axios
        .delete(`/api/reservations/${id}`)
        .then(() => {
          toast.success("Reservation cancelled");
          router.refresh();
        })
        .catch((err) => {
          toast.error(err.response?.data.error);
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
        <Heading
          title="My Trips"
          subtitle="Where you've been and where you're going"
        />

        <div className="mt-10 pb-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-10">
          {reservations?.map((reservation) => (
            <ListingItem
              key={reservation.id}
              actionId={reservation.id}
              actionLabel="Cancel reservation"
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
