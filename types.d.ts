import { Country } from "./app/hooks/useCountries";

type ListingPlace = {
  category: string;
  type: "entire" | "room" | "shared";
  location: Country | null;
  guestCount: number;
  bedroomCount: number;
  bedCount: number;
  bathroomCount: number;
  amenities: string[] | null;
  imageSrc: string;
  price: number;
  title: string;
  description: string;
};
