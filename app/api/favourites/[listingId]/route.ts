import { getCurrentUser } from "@/app/actions/getCurrentUser"
import prisma from "@/app/libs/prismadb"
import { NextResponse } from "next/server"

export type listingParamsType = {
  listingId: string
}

export async function POST(
  _request: Request,
  { params }: { params: listingParamsType },
) {
  const currentUser = await getCurrentUser()

  if (!currentUser) {
    return NextResponse.error()
  }

  const { listingId } = params

  if (!listingId || typeof listingId !== "string") {
    return NextResponse.error()
  }

  const favouriteListingIds = currentUser.favoriteIds || []

  const user = await prisma.user.update({
    where: {
      id: currentUser.id,
    },
    data: {
      favoriteIds: [...favouriteListingIds, listingId],
    },
  })

  return NextResponse.json(user)
}

export async function DELETE(
  _request: Request,
  { params }: { params: listingParamsType },
) {
  const currentUser = await getCurrentUser()

  if (!currentUser) {
    return NextResponse.error()
  }

  const { listingId } = params

  if (!listingId || typeof listingId !== "string") {
    return NextResponse.error()
  }

  const favouriteListingIds = currentUser.favoriteIds.filter((id) => id !== listingId)

  const user = await prisma.user.update({
    where: {
      id: currentUser.id,
    },
    data: {
      favoriteIds: [...favouriteListingIds],
    },
  })
}
