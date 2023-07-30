import { getCurrentUser } from "@/app/actions/getCurrentUser"
import prisma from "@/app/libs/prismadb"

import { NextResponse } from "next/server"

export type ListingParams = {
  listingId?: string
}

export async function DELETE(
  _request: Request,
  { params }: { params: ListingParams },
) {
  const currentUser = await getCurrentUser()

  if (!currentUser) return NextResponse.error()

  const { listingId } = params

  if (!listingId || typeof listingId !== "string") return NextResponse.error()

  const listing = await prisma.listing.deleteMany({
    where: {
      id: listingId,
      // we add this because to make sure that you are the owner of the listing you are deleting
      userId: currentUser.id,
    },
  })

  return NextResponse.json(listing)
}
