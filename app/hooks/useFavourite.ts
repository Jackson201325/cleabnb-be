import useLoginModal from "@/app/hooks/useLoginModal";
import { User } from "@prisma/client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { toast } from "react-hot-toast";

type useFavouriteType = {
  listingId: string;
  currentUser: User | null;
};

export const useFavourite = ({ listingId, currentUser }: useFavouriteType) => {
  const router = useRouter();
  const loginModal = useLoginModal();

  const hasFavourited = useMemo(() => {
    const favouriteListings = currentUser?.favoriteIds || [];

    return favouriteListings.includes(listingId);
  }, [currentUser, listingId]);

  const toggleFavourite = useCallback(
    async (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();

      if (!currentUser) {
        return loginModal.open();
      }

      try {
        let request;

        if (hasFavourited) {
          request = () => axios.delete(`/api/favourites/${listingId}`);
        } else {
          request = () => axios.post(`/api/favourites/${listingId}`);
        }

        await request();
        router.refresh();
        toast.success("Favourite updated");
      } catch (error) {
        console.log(error);
        toast.error("something went wrong");
      }
    },
    [currentUser, hasFavourited, listingId, loginModal, router]
  );

  return {
    hasFavourited,
    toggleFavourite,
  };
};

export default useFavourite;
