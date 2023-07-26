import React from "react"
import { getCurrentUser } from "../actions/getCurrentUser"
import { getReservations } from "../actions/getResevations"
import EmptyState from "../components/EmptyState"
import TripsClient from "./TripsClient"

const TripsPage = async () => {
  const currentUser = await getCurrentUser()

  if (!currentUser)
    return <EmptyState title="Unauthorized" subtitle="Please Login" />

  const reservations = await getReservations({ userId: currentUser.id })

  if (reservations?.length === 0 || !reservations)
    return (
      <EmptyState
        title="No trips found"
        subtitle="Looks like you have not reserved any trips"
      />
    )

  const tripsCientData = {
    reservations,
    currentUser,
  }

  return <TripsClient {...tripsCientData} />
}

export default TripsPage
