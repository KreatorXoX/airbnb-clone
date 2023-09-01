import EmptyState from "../components/EmptyState";
import getCurrentUser from "../actions/getCurrentUser";
import getFavourites from "../actions/getFavouriteListings";
import ProfileClient from "./ProfileClient";

export default async function MyProfilePage() {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <EmptyState title="Unauthorized" subtitle="Please login" />;
  }

  return <ProfileClient currentUser={currentUser} />;
}
