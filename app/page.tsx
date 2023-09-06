import getListings, { ListingParams } from "./actions/getListings";
import ClientContainer from "./components/ClientContainer";
import EmptyState from "./components/EmptyState";
import ListingItem from "./components/listing/ListingItem";
import getCurrentUser from "./actions/getCurrentUser";
import { Listing } from "@prisma/client";
import Map from "./components/Map";
type SearchParams = {
  searchParams: ListingParams;
};

export const dynamic = "force-dynamic";

export default async function Home({ searchParams }: SearchParams) {
  const listings = await getListings(searchParams || {});
  const currentUser = await getCurrentUser();
  const isMapNeeded = searchParams.location;
  if (!listings || listings?.length === 0) return <EmptyState showReset />;
  return (
    <ClientContainer>
      <div
        className={`pt-[10rem] md:pt-[12rem]  grid ${
          isMapNeeded ? "grid-cols-2 " : "grid-cols-1 pb-20"
        } relative`}
      >
        <div
          className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3
          ${
            isMapNeeded
              ? "xl:grid-cols-3 2xl:grid-cols-4 pt-[25rem] sm:pt-0"
              : "xl:grid-cols-4 2xl:grid-cols-6"
          } gap-10
           `}
        >
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
        {searchParams.location && (
          <div className="h-full w-full absolute top-[10rem] sm:static sm:inline-block rounded-xl">
            <Map
              givenLatLng={listings[0].location.countryLatLng}
              givenZoom={5}
              staticMap
              fullHeight
              listingLocations={listings.map(
                (listing) => listing.location.countryLatLng
              )}
            />
          </div>
        )}
      </div>
    </ClientContainer>
  );
}
