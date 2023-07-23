import { getCurrentUser } from "@/app/actions/getCurrentUser"
import { getListingById } from "@/app/actions/getListingById"
import { listingParamsType } from "@/app/api/favourites/[listingId]/route"
import EmptyState from "@/app/components/EmptyState"

import ListingClient from "./ListingClient"

const Listing = async (params: { params: listingParamsType }) => {
  const listing = await getListingById(params)
  const currentUser = await getCurrentUser()

  if (!listing) {
    return <EmptyState />
  }

  return <ListingClient listing={listing} currentUser={currentUser} />
}

export default Listing
