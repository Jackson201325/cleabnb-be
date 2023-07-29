import prisma from "@/app/libs/prismadb"

type GetFavoritesParams = {
  userId?: string
}
export async function getFavourites({ userId }: GetFavoritesParams) {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  })

  if (!user) return null

  try {
    const favouriteListings = await prisma.listing.findMany({
      where: {
        id: {
          in: user.favoriteIds,
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    return favouriteListings
  } catch (error: any) {
    console.log(error)
    return null
  }
}
