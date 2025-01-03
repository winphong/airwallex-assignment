import { ToastType } from "@/ui/Toast/constants";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

type Toast = {
  isOpen: boolean;
  title: string;
  description: string;
  type: ToastType;
  open: ({
    title,
    description,
    type,
  }: {
    title: string;
    description: string;
    type: ToastType;
  }) => void;
  close: () => void;
};

export const useToast = create<Toast>()(
  devtools(
    persist(
      (set) => ({
        isOpen: false,
        title: "",
        description: "",
        type: ToastType.Success,
        open: ({ title, type, description }) =>
          set(() => ({ isOpen: true, title, type, description })),
        close: () => set(() => ({ isOpen: false })),
      }),
      { name: "toast" }
    ),
    { name: "toast" }
  )
);
