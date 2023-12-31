import prisma from "@/app/libs/prismadb";

export type ReservationParams = {
  userId?: string;
  authorId?: string;
  listingId?: string;
};

export async function getReservations(params: ReservationParams) {
  try {
    const { listingId, userId, authorId } = params;

    let query: any = {};

    if (listingId) query.listingId = listingId;

    if (userId) query.userId = userId;

    if (authorId) query.listing = { userId: authorId };

    const reservations = await prisma.reservation.findMany({
      where: query,
      include: {
        listing: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return reservations;
  } catch (error: any) {
    console.log(error);
    return null;
  }
}
