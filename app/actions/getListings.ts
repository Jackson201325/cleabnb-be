import prisma from "@/app/libs/prismadb"

export type SearchParams = {
  category?: string
  startDate?: string
  endDate?: string
  guestCount?: number
  bathroomCount?: number
  roomCount?: number
  location?: string
}

type ListingsParams = {
  userId?: string
  searchParams?: SearchParams
}

export async function getListings({ userId, searchParams }: ListingsParams) {
  try {
    let query: any = {}
    const {
      category,
      startDate,
      endDate,
      guestCount,
      bathroomCount,
      roomCount,
      location,
    } = searchParams ?? {}

    if (userId) query.userId = userId

    if (category) query.category = category

    if (roomCount) query.roomCount = { gte: +roomCount }

    if (guestCount) query.guestCount = { gte: +guestCount }

    if (bathroomCount) query.bathroomCount = { gte: +bathroomCount }

    if (location) query.locationValue = location

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

    console.log({ query })

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
