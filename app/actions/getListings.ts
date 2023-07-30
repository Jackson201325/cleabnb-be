import prisma from "@/app/libs/prismadb"
import { SearchParams } from "../page"

type ListingsParams = {
  userId?: string | null
  params?: SearchParams | null
}

export async function getListings({ userId, params }: ListingsParams) {
  try {
    let query: any = {}

    if (userId) query.userId = userId

    if (params) query.category = params.category

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
