import { getCurrentUser } from "@/app/actions/getCurrentUser"
import { NextResponse } from "next/server"
import prisma from "@/app/libs/prismadb"
import { listingParamsType } from "../api/favourites/[listingId]/route"

export async function getListingById({
  params,
}: {
  params: listingParamsType
}) {
  try {
    // const currentUser = await getCurrentUser()

    // if (!currentUser) return NextResponse.error()
    const { listingId } = params

    const listing = await prisma.listing.findUnique({
      where: {
        id: listingId,
      },
      include: {
        user: true,
      },
    })

    if (!listing) return null

    // if (listing && listing.userId != currentUser.id) return NextResponse.error()

    return listing
  } catch (error) {
    console.log(error)
    throw new Error("Something went wrong")
  }
}
