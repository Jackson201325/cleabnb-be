import { getCurrentUser } from "@/app/actions/getCurrentUser"
import prisma from "@/app/libs/prismadb"

import { NextResponse } from "next/server"

type DeleteReservationParams = {
  reservationId: string
}

export async function DELETE(
  _request: Request,
  { params }: { params: DeleteReservationParams },
) {
  const currentUser = await getCurrentUser()

  if (!currentUser) return NextResponse.error()

  const { reservationId } = params

  const reservations = await prisma.reservation.deleteMany({
    where: {
      id: reservationId,
      OR: [{ userId: currentUser.id }, { listing: { userId: currentUser.id } }],
    },
  })

  return NextResponse.json(reservations)
}
