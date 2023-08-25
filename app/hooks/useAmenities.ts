import { amenities } from "@/utils/amenities";

const useAmenities = () => {
  const getAmenities = () => amenities;

  const getAmenitiesByIds = (ids: string[]) => {
    return amenities.filter((amenity) => ids.includes(amenity.id));
  };

  return {
    getAmenities,
    getAmenitiesByIds,
  };
};

export default useAmenities;
