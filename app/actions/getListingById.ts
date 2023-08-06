import prisma from "@/app/libs/prismadb";
import { ListingParams } from "../api/favourites/[listingId]/route";

export async function getListingById(params: ListingParams) {
  try {
    const { listingId } = params;

    const listing = await prisma.listing.findUnique({
      where: {
        id: listingId,
      },
      include: {
        user: true,
      },
    });

    if (!listing) return null;

    return listing;
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong");
  }
}
