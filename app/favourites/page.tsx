import { getCurrentUser } from "../actions/getCurrentUser"
import { getFavourites } from "../actions/getFavourites"
import EmptyState from "../components/EmptyState"
import FavouritesClient from "./FavouritesClient"

const FavouritesPage = async () => {
  const currentUser = await getCurrentUser()

  if (!currentUser)
    return <EmptyState title="Unauthorized" subtitle="Please Login" />

  const favouriteListings = await getFavourites({ userId: currentUser.id })

  if (!favouriteListings) {
    return (
      <EmptyState
        title="No favourites found"
        subtitle="Looks like you have not liked any place"
      />
    )
  }

  const favouriteClientData = {
    favouriteListings,
    currentUser,
  }

  return <FavouritesClient {...favouriteClientData} />
}

export default FavouritesPage
