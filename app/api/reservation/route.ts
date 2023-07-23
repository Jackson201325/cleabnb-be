import prisma from "@/app/libs/prismadb"
import { NextResponse } from "next/server"

interface IReservationParams {
  startDate: string
  endDate: string
  listingId: string
  price: number
}

export default async function POST(
  _request: Request,
  { params }: { params: IReservationParams },
) {
  const { startDate, endDate, listingId, price } = params

  const reservation = await prisma.reservation.create({
    data: {
      startDate: startDate,
      endDate: endDate,
      totalPrice: price,
      listingId: listingId,
    },
  })

  return NextResponse.json(reservation)
}
