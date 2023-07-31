import { create } from "zustand";

interface RentModalState {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useRentalModal = create<RentModalState>()((set) => ({
  isOpen: false,
  onOpen: () => set(() => ({ isOpen: true })),
  onClose: () => set(() => ({ isOpen: false })),
}));
