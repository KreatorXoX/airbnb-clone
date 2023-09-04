import { create } from "zustand";

interface SearchFilter {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useSearchFilters = create<SearchFilter>()((set) => ({
  isOpen: false,
  onOpen: () => set(() => ({ isOpen: true })),
  onClose: () => set(() => ({ isOpen: false })),
}));
