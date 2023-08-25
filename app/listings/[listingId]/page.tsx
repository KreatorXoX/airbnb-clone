import getCurrentUser from "@/app/actions/getCurrentUser";
import getListingById from "@/app/actions/getListingById";
import EmptyState from "@/app/components/EmptyState";
import React from "react";
import ListingClient from "./ListingClient";
type Props = {
  listingId?: string;
};

export default async function ListingPage({ params }: { params: Props }) {
  const listing = await getListingById(params);
  const currentUser = await getCurrentUser();

  if (!listing) {
    return <EmptyState />;
  }
  return (
    <div className="pt-0 md:pt-10 pb-20">
      <ListingClient listing={listing} currentUser={currentUser} />
    </div>
  );
}
