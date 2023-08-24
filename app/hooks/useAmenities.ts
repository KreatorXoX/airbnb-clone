import { amenities } from "@/utils/amenities";

const useAmenities = () => {
  const getAmenities = () => amenities;

  const getAmenityById = (id: string) => {
    return amenities.find((amenity) => amenity.id === id);
  };

  return {
    getAmenities,
    getAmenityById,
  };
};

export default useAmenities;
