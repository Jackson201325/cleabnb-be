import { getCurrentUser } from "@/app/actions/getCurrentUser"
import prisma from "@/app/libs/prismadb"
import { NextResponse } from "next/server"

type DeleteReservationParams = {
  reservationId: string
}

export async function DELETE(
  request: Request,
  { params }: { params: DeleteReservationParams },
) {
  const currentUser = await getCurrentUser()

  console.log({ currentUser })

  if (!currentUser) return NextResponse.error()

  const { reservationId } = params

  console.log({ reservationId })

  const reservations = await prisma.reservation.deleteMany({
    where: {
      id: reservationId,
      OR: [{ userId: currentUser.id }, { listing: { userId: currentUser.id } }],
    },
  })

  console.log({ reservations })

  return NextResponse.json(reservations)
}
