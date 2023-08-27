import { Listing, Reservation } from "@prisma/client";
import { Country } from "./app/hooks/useCountries";

interface IUser {
  id: string;
  name: string | null;
  email: string;
  image: string | null;
  favoriteListings: string[] | null;
  listings: Listing[] | null;
  reservations: Reservation[] | null;
}

interface IReservation {
  id: string;
  userId: string;
  listingId: string;
  startDate: Date;
  endDate: Date;
  totalPrice: number;
  createdAt: Date;
  user: string;
  listing: Listing;
}

type ListingPlace = {
  category: string;
  type: "entire" | "room" | "shared";
  location: Country | null;
  guestCount: number;
  bedroomCount: number;
  bedCount: number;
  bathroomCount: number;
  amenities: string[] | null | undefined;
  imageSrc: { url: string; key: string };
  price: number;
  title: string;
  description: string;
};
