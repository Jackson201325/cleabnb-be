import Container from "@/app/components/Container"
import { Listing, Reservation, User } from "@prisma/client"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useCallback, useState } from "react"
import toast from "react-hot-toast"
import Heading from "../components/Heading"
import ListingCard from "../components/modals/listings/ListingCard"

type Props = {
  reservations: (Reservation & { listing: Listing })[]
  currentUser: User
}

const TripsClient = ({ reservations, currentUser }: Props) => {
  const router = useRouter()
  const [deletingId, setDeletingId] = useState("")

  const onCancel = useCallback(
    (id: string) => {
      setDeletingId(id)

      axios
        .delete(`/api/reservations/${id}`)
        .then(() => {
          toast.success("Reservation cancelled")
          router.refresh()
        })
        .catch((error) => {
          console.error(error)
          toast.error("Error cancelling reservation")
        })
        .finally(() => {
          setDeletingId("")
        })
    },
    [router],
  )

  return (
    <Container>
      <Heading
        title="Trips"
        subtitle="Where you have been and where you are going"
      />
      <div className="mt-10 grid grid-cols1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {reservations.map((reservation) => (
          <ListingCard
            key={reservation.id}
            listing={reservation.listing}
            reservation={reservation}
            actionId={reservation.id}
            onAction={onCancel}
            disabled={deletingId === reservation.id}
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  )
}

export default TripsClient
