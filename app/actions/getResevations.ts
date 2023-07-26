import prisma from "@/app/libs/prismadb"
import { Reservation } from "@prisma/client"
import { NextResponse } from "next/server"
import { ListingParams } from "../api/favourites/[listingId]/route"

export type ReservationParams = {
  userId?: string
  authorId?: string
  listingId?: string
}

export async function getReservations(params: ReservationParams) {
  try {
    const { listingId, userId, authorId } = params

    const query: any = {}

    if (listingId) {
      query.listingId = listingId
    }

    if (userId) {
      query.userId = userId
    }

    if (authorId) {
      query.listing = { user_id: authorId }
    }

    const reservations = await prisma.reservation.findMany({
      where: query,
      include: {
        listing: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    console.log({ reservations })
    return reservations
  } catch (error: any) {
    console.log(error)
    return null
  }
}