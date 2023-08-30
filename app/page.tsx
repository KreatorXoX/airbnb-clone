import { ListingPlace } from "@/types";
import getListings, { ListingParams } from "./actions/getListings";
import ClientContainer from "./components/ClientContainer";
import EmptyState from "./components/EmptyState";
import ListingItem from "./components/listing/ListingItem";
import getCurrentUser from "./actions/getCurrentUser";
import { Listing } from "@prisma/client";

type SearchParams = {
  searchParams: ListingParams;
};

export default async function Home({ searchParams }: SearchParams) {
  const listings = await getListings(searchParams);
  const currentUser = await getCurrentUser();

  if (!listings || listings?.length === 0) return <EmptyState showReset />;
  return (
    <ClientContainer>
      <div className="pt-[10rem] md:pt-[12rem] pb-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-10">
        {listings.map((listing: Listing) => {
          return (
            <ListingItem
              key={listing.id}
              listing={listing}
              currentUser={currentUser}
            />
          );
        })}
      </div>
    </ClientContainer>
  );
}
