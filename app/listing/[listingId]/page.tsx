import { getCurrentUser } from "@/app/actions/getCurrentUser"
import { getListingById } from "@/app/actions/getListingById"
import { ListingParams } from "@/app/api/favourites/[listingId]/route"
import EmptyState from "@/app/components/EmptyState"

import ListingClient from "./ListingClient"
import { getReservations } from "@/app/actions/getResevations"

const Listing = async ({ params }: { params: ListingParams }) => {
  const listing = await getListingById(params)
  const currentUser = await getCurrentUser()
  const reservations = await getReservations(params)

  if (!listing || !reservations) {
    return <EmptyState />
  }

  return (
    <ListingClient
      listing={listing}
      reservations={reservations}
      currentUser={currentUser}
    />
  )
}

export default Listing
