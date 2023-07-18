import { getServerSession } from 'next-auth/next'

import { authOptions } from '@/pages/api/auth/[...nextauth]'
import prisma from '@/app/libs/prismadb'

export async function getSession() {
  return await getServerSession(authOptions)
}

export async function getListings() {
  try {
    const session = await getSession()

    if (!session?.user?.email) return null

    const listings = await prisma.listing.findMany({
      orderBy: {
        createdAt: 'desc'
      },
    })

    if (!listings) return null

    return listings
  } catch (error: any) {
    console.log(error)
    return null
  }
}
