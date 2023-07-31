import prisma from "@/app/libs/prismadb"

export type SearchParams = {
  category?: string
  startDate?: string
  endDate?: string
  guestCount?: number
  bathroomCount?: number
  roomCount?: number
  locationValue?: string
}

type ListingsParams = {
  userId?: string | null
  params?: SearchParams
}

export async function getListings({ userId, params }: ListingsParams) {
  try {
    let query: any = {}
    const {
      category,
      startDate,
      endDate,
      guestCount,
      bathroomCount,
      roomCount,
      locationValue,
    } = params ?? {}

    if (userId) query.userId = userId

    if (category) query.category = category

    if (roomCount) query.roomCount = { gte: +roomCount }

    if (guestCount) query.roomCount = { gte: +guestCount }

    if (bathroomCount) query.roomCount = { gte: +bathroomCount }

    if (locationValue) query.locationValue = locationValue

    if (startDate && endDate) {
      query.NOT = {
        reservations: {
          some: {
            OR: [
              {
                endDate: { gte: startDate },
                startDate: { lte: startDate },
              },
              {
                startDate: { lte: endDate },
                endDate: { gte: endDate },
              },
            ],
          },
        },
      }
    }

    const listings = await prisma.listing.findMany({
      where: query,
      orderBy: {
        createdAt: "desc",
      },
    })

    if (!listings) return null

    return listings
  } catch (error: any) {
    console.log(error)
    return null
  }
}
