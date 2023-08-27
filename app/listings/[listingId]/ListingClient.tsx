"use client";

import ClientContainer from "@/app/components/ClientContainer";
import ListingBody from "@/app/components/listing/ListingBody";
import ListingHeader from "@/app/components/listing/ListingHeader";
import ListingReservation from "@/app/components/listing/ListingReservation";
import useCategories from "@/app/hooks/useCategories";
import { useLoginModal } from "@/app/hooks/useLogin";
import { IReservation, IUser } from "@/types";
import { Listing, Reservation } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "react-hot-toast";
import { Range } from "react-date-range";

function createDateRange(startDate: Date, endDate: Date) {
  const dateRange = [];
  const currentDate = new Date(startDate);
  const end = new Date(endDate);

  // Set time to midnight for both start and end dates
  currentDate.setHours(0, 0, 0, 0);
  end.setHours(0, 0, 0, 0);

  while (currentDate <= end) {
    dateRange.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dateRange;
}

function getCalendarDayDifference(startDate: Date, endDate: Date) {
  // Set time to midnight for both start and end dates
  const start: any = new Date(startDate);
  start.setHours(0, 0, 0, 0);

  const end: any = new Date(endDate);
  end.setHours(0, 0, 0, 0);

  const oneDay = 24 * 60 * 60 * 1000; // Number of milliseconds in a day
  const diffInDays = Math.round(Math.abs((end - start) / oneDay));
  return diffInDays + 1;
}

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: "selection",
};

type Props = {
  listing: Listing & { user: IUser };
  currentUser: IUser | null;
  reservations?: IReservation[];
};

export default function ListingClient({
  listing,
  reservations = [],
  currentUser,
}: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(listing.price);
  const [dateRange, setDateRange] = useState<Range>(initialDateRange);

  const { getCategoryById } = useCategories();
  const category = getCategoryById(listing.category);

  const { onOpen } = useLoginModal();
  const router = useRouter();

  const disabledDates = useMemo(() => {
    let dates: Date[] = [];

    reservations.forEach((reservation) => {
      const reservedDates = createDateRange(
        reservation.startDate,
        reservation.endDate
      );

      dates = [...dates, ...reservedDates];
    });

    return dates;
  }, [reservations]);

  const handleReservation = useCallback(() => {
    if (!currentUser) return onOpen();

    setIsLoading(true);

    axios
      .post("/api/reservations", {
        totalPrice,
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
        listingId: listing.id,
      })
      .then(() => {
        toast.success("Success");
        setDateRange(initialDateRange);
        // redirect to trips
        router.refresh();
      })
      .catch(() => {
        toast.error("Something went wrong");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [currentUser, onOpen, totalPrice, dateRange, listing.id, router]);

  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      const dayCount = getCalendarDayDifference(
        dateRange.startDate,
        dateRange.endDate
      );

      if (dayCount && listing.price) {
        setTotalPrice(dayCount * listing.price);
      } else {
        setTotalPrice(listing.price);
      }
    }
  }, [dateRange, listing.price]);

  return (
    <ClientContainer>
      <div className="relative max-w-screen-lg mx-auto">
        <div className="flex flex-col gap-5">
          <ListingHeader
            id={listing.id}
            title={listing.title}
            imageUrl={listing.imageSrc.url}
            location={listing.location}
            currentUser={currentUser}
          />
          <div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-5">
            <ListingBody
              user={listing.user}
              location={listing.location}
              type={listing.type}
              category={category}
              amenities={listing.amenities}
              description={listing.description}
              bedroomCount={listing.bedroomCount}
              bedCount={listing.bedCount}
              bathroomCount={listing.bathroomCount}
              guestCount={listing.guestCount}
            />
            <div
              className="
              order-first
              pb-10
             md:order-last
            md:max-h-96 cols-span-1 md:col-span-3 md:sticky md:top-[22%]"
            >
              <ListingReservation
                price={listing.price}
                totalPrice={totalPrice}
                onDateChange={(value: Range) => setDateRange(value)}
                dateRange={dateRange}
                onSubmit={handleReservation}
                disabled={isLoading}
                disabledDates={disabledDates}
              />
            </div>
          </div>
        </div>
      </div>
    </ClientContainer>
  );
}
