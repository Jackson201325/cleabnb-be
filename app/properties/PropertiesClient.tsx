"use client"

import Container from "@/app/components/Container"
import { Listing, User } from "@prisma/client"

import axios from "axios"
import { useRouter } from "next/navigation"
import { FC, useCallback, useState } from "react"
import toast from "react-hot-toast"

import Heading from "../components/Heading"
import ListingCard from "../components/modals/listings/ListingCard"

type Props = {
  listings: Listing[]
  currentUser: User
}

const PropertyClient: FC<Props> = ({ listings, currentUser }) => {
  const router = useRouter()
  const [deletingId, setDeletingId] = useState("")

  const onDelete = useCallback(
    (id: string) => {
      setDeletingId(id)

      axios
        .delete(`/api/listing/${id}`)
        .then(() => {
          toast.success("Listing deleted")
          router.refresh()
        })
        .catch((error) => {
          console.error(error)
          toast.error("Error deleting listing")
        })
        .finally(() => {
          setDeletingId("")
        })
    },
    [router],
  )

  return (
    <Container>
      <Heading title="My properties" subtitle="Manage your properties" />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {listings.map((listing) => (
          <ListingCard
            key={listing.id}
            listing={listing}
            actionId={listing.id}
            actionLabel="Delete property"
            onAction={onDelete}
            disabled={deletingId === listing.id}
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  )
}

export default PropertyClient
