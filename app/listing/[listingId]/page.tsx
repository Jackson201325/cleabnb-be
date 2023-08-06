import { getCurrentUser } from "@/app/actions/getCurrentUser";
import { getListingById } from "@/app/actions/getListingById";
import { getReservations } from "@/app/actions/getReservations";
import { ListingParams } from "@/app/api/favourites/[listingId]/route";
import EmptyState from "@/app/components/EmptyState";

import ListingClient from "./ListingClient";

const Listing = async ({ params }: { params: ListingParams }) => {
  const currentUser = await getCurrentUser();
  const listing = await getListingById(params);
  const reservations = await getReservations(params);

  if (!listing) return <EmptyState />;

  return (
    <ListingClient
      listing={listing}
      reservations={reservations}
      currentUser={currentUser}
    />
  );
};

export default Listing;
