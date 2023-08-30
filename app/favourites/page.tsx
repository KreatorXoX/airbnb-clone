import EmptyState from "../components/EmptyState";
import getCurrentUser from "../actions/getCurrentUser";
import getFavourites from "../actions/getFavouriteListings";
import FavouritesClient from "./FavouritesClient";

export default async function MyFavouritesPage() {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <EmptyState title="Unauthorized" subtitle="Please login" />;
  }

  const favourites = await getFavourites();

  if (favourites?.length === 0)
    return (
      <EmptyState
        title="No favourites found"
        subtitle="Looks like you have no favourite listings."
      />
    );

  return <FavouritesClient favourites={favourites} currentUser={currentUser} />;
}
