import { create } from "zustand";

type Toast = {
  isOpen: boolean;
  message: string;
  open: (message: string) => void;
  close: () => void;
};

export const useToast = create<Toast>()((set) => ({
  isOpen: false,
  open: (message: string) => set(() => ({ isOpen: true, message })),
  close: () => set(() => ({ isOpen: false })),
  message: "",
}));
