import { getCurrentUser } from "../actions/getCurrentUser"
import { getReservations } from "../actions/getReservations"
import EmptyState from "../components/EmptyState"
import ReservationClient from "./ReservationClient"

type Props = {}

const ReservationPage = async (props: Props) => {
  const currentUser = await getCurrentUser()

  if (!currentUser) {
    return <EmptyState title="Unauthorized" subtitle="Please Login" />
  }

  const reservations = await getReservations({ authorId: currentUser.id })

  if (!reservations || reservations.length === 0) {
    return (
      <EmptyState
        title="No reservations found"
        subtitle="Looks like you have not reserved any trips"
      />
    )
  }

  const reservationClientData = {
    reservations,
    currentUser,
  }

  return <ReservationClient {...reservationClientData} />
}

export default ReservationPage
