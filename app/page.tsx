import Container from "@/app/components/Container";
import EmptyState from "@/app/components/EmptyState";

import { getCurrentUser } from "./actions/getCurrentUser";
import { SearchParams, getListings } from "./actions/getListings";
import ListingCard from "./components/modals/listings/ListingCard";

export default async function Home({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const currentUser = await getCurrentUser();
  const listings = await getListings({ searchParams });

  if (listings?.length === 0) return <EmptyState showReset />;

  return (
    <Container>
      <div className="pt-24 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {listings?.map((listing) => (
          <ListingCard
            key={listing.id}
            listing={listing}
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );
}
