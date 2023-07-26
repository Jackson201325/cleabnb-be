import { getCurrentUser } from "@/app/actions/getCurrentUser"
import prisma from "@/app/libs/prismadb"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  const currentUser = await getCurrentUser()

  if (!currentUser) return NextResponse.error()

  const body = await request.json()

  const { startDate, endDate, listingId, price } = body

  if (!startDate || !endDate || !listingId || !price)
    return NextResponse.error()

  const listingAndReservation = await prisma.listing.update({
    where: {
      id: listingId
    },
    data: {
      reservations: {
        create: {
          userId: currentUser.id,
          startDate: startDate,
          endDate: endDate,
          totalPrice: price,
        },
      },
    },
  })

  return NextResponse.json(listingAndReservation)
}
