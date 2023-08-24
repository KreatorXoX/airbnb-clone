import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { toast } from "react-hot-toast";
import { useLoginModal } from "./useLogin";
import { IUser } from "@/types";

type UseFavourite = {
  listingId: string;
  currentUser?: IUser | null;
};

const useFavourite = ({ listingId, currentUser }: UseFavourite) => {
  const router = useRouter();
  const { onOpen } = useLoginModal();

  const isFavourite = useMemo(() => {
    const list = currentUser?.favoriteListings || [];
    return list.includes(listingId);
  }, [currentUser, listingId]);

  const toggleFavourite = useCallback(
    async (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();

      if (!currentUser) {
        return onOpen();
      }

      try {
        let req;

        if (isFavourite) {
          console.log("delete fav");
          req = () => axios.delete(`/api/favourites/${listingId}`);
        } else {
          console.log("add fav");
          req = () => axios.post(`/api/favourites/${listingId}`);
        }

        await req();
        router.refresh();
        toast.success("Successful");
      } catch (error) {
        toast.error("Something went wrong ");
      }
    },
    [currentUser, isFavourite, listingId, onOpen, router]
  );

  return {
    isFavourite,
    toggleFavourite,
  };
};

export default useFavourite;
