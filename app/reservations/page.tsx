import EmptyState from "../components/EmptyState";
import getCurrentUser from "../actions/getCurrentUser";
import getReservations from "../actions/getReservations";
import ReservationsClient from "./ReservationsClient";

export default async function ReservationsPage() {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <EmptyState title="Unauthorized" subtitle="Please login" />;
  }

  const reservations = await getReservations({ creatorId: currentUser.id });

  if (reservations?.length === 0)
    return (
      <EmptyState
        title="No reservations found"
        subtitle="Looks like you haven no reservations on your property."
      />
    );

  return (
    <ReservationsClient reservations={reservations} currentUser={currentUser} />
  );
}
