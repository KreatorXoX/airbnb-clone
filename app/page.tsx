import { ListingPlace } from "@/types";
import getListings from "./actions/getListings";
import ClientContainer from "./components/ClientContainer";
import EmptyState from "./components/EmptyState";

export default async function Home() {
  const listings = await getListings();

  if (!listings || listings?.length === 0) return <EmptyState showReset />;
  return (
    <ClientContainer>
      <div className="grid grid-col-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-10">
        {listings.map((listing: any) => {
          return <div key={listing.id}>{listing.title}</div>;
        })}
      </div>
    </ClientContainer>
  );
}
