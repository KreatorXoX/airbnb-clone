import { categories } from "@/utils/categories";

const useCategories = () => {
  const getCategories = () => categories;

  const getCategoryById = (id: string) => {
    return categories.find((category) => category.id === id);
  };

  return {
    getCategories,
    getCategoryById,
  };
};

export default useCategories;
