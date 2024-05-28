import { create } from "zustand";
import { persist } from "zustand/middleware";
import { IToast } from "@/components/common/Toast";

export interface ToasterStore {
  toasts: IToast[];
  addToast: (toast: IToast) => void;
  removeToast: (toastId: number) => void;
  clear: () => void;
}

export const useToasterStore = create<
  ToasterStore,
  [["zustand/persist", never]]
>(
  persist(
    (set, get) => ({
      toasts: [],
      addToast: (toast) => {
        set((state) => ({
          toasts: [...state.toasts, toast],
        }));
      },
      removeToast: (toastId) => {
        set((state) => ({
          toasts: state.toasts.filter((toast) => toast.id != toastId),
        }));
      },
      clear: () => {
        set({ toasts: [] });
      },
    }),
    {
      name: "toasterStore",
    }
  )
);
