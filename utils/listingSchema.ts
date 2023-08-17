import { z } from "zod";
// creating a new listing schema
export const createListingSchema = z.object({
  category: z
    .string({ required_error: "Category is required" })
    .nonempty("Category can not be an empty string"),
  type: z.string().default("entire"),
  location: z.object({
    value: z.string(),
    label: z.string(),
    countryFlag: z.string(),
    countryLatLng: z.array(z.number()),
    countryRegion: z.string(),
    countrySubregion: z.string(),
    zoom: z.number(),
  }),
  guestCount: z.number().min(1),
  bedroomCount: z.number().min(1),
  bedCount: z.number().min(1),
  bathroomCount: z.number().min(1),
  amenities: z.array(z.string().optional()),
  imageSrc: z.object({
    url: z
      .string({ required_error: "Image url is required" })
      .nonempty("Image Url can not be an empty string"),
    key: z
      .string({ required_error: "Image key is required" })
      .nonempty("Image Key can not be an empty string"),
  }),
  title: z
    .string({ required_error: "Title is required" })
    .nonempty("Title can not be an empty string"),
  description: z
    .string({ required_error: "Description is required" })
    .nonempty("Description can not be an empty string"),
  price: z.number().min(1),
});

export type CreateListingInput = z.TypeOf<typeof createListingSchema>;
