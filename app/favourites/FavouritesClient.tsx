import Container from "@/app/components/Container"
import { Listing, User } from "@prisma/client"

import { FC } from "react"

import Heading from "../components/Heading"
import ListingCard from "../components/modals/listings/ListingCard"

type Props = {
  favouriteListings: Listing[]
  currentUser: User
}

const FavouritesClient: FC<Props> = ({ favouriteListings, currentUser }) => {
  return (
    <Container>
      <Heading
        title="My Favourites"
        subtitle="Change your favourite listings"
      />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {favouriteListings.map((favoriteListing) => (
          <ListingCard
            key={favoriteListing.id}
            listing={favoriteListing}
            actionId={favoriteListing.id}
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  )
}

export default FavouritesClient
