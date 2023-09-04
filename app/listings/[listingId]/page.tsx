import getCurrentUser from "@/app/actions/getCurrentUser";
import getListingById from "@/app/actions/getListingById";
import EmptyState from "@/app/components/EmptyState";
import React from "react";
import ListingClient from "./ListingClient";
import getReservations from "@/app/actions/getReservations";

// cannot setup a generateStaticParams for some reason
// it returns undefined eventhough the we get all the listings
// and return it as listings.map(listing=>({
//  listingId:listing.id
//}))
// ill look into it deeply

type Params = {
  listingId: string;
};

export default async function ListingPage({ params }: { params: Params }) {
  const listing = await getListingById(params);
  const currentUser = await getCurrentUser();
  const reservations = await getReservations(params);

  if (!listing) {
    return <EmptyState />;
  }
  return (
    <ListingClient
      listing={listing}
      currentUser={currentUser}
      reservations={reservations}
    />
  );
}
