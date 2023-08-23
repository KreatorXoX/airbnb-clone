import { ListingPlace } from "@/types";
import getListings from "./actions/getListings";
import ClientContainer from "./components/ClientContainer";
import EmptyState from "./components/EmptyState";
import ListingItem from "./components/listing/ListingItem";
import getCurrentUser from "./actions/getCurrentUser";

export default async function Home() {
  const listings = await getListings();
  const currentUser = await getCurrentUser();

  if (!listings || listings?.length === 0) return <EmptyState showReset />;
  return (
    // sm:grid-col-2
    <ClientContainer>
      <div className="pt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-10">
        {listings.map((listing: any) => {
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
