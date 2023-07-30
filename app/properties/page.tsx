import { getCurrentUser } from "../actions/getCurrentUser"
import { getListings } from "../actions/getListings"
import EmptyState from "../components/EmptyState"
import PropertyClient from "./PropertiesClient"

const PropertiesPage = async () => {
  const currentUser = await getCurrentUser()

  if (!currentUser)
    return <EmptyState title="Unauthorized" subtitle="Please Login" />

  const userId = currentUser.id

  const listings = await getListings({ userId })

  if (!listings || listings.length === 0) {
    return (
      <EmptyState
        title="No properties found"
        subtitle="Looks like you do not have any property"
      />
    )
  }

  const proppertyClientData = {
    listings,
    currentUser,
  }

  return <PropertyClient {...proppertyClientData} />
}

export default PropertiesPage
