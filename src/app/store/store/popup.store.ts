import { create } from "zustand";

interface PopupState {
  popup: boolean;
  setPopup: (popup: boolean) => void;
}
export const usePopupStore = create<PopupState>((set) => ({
  popup: false,
  setPopup: (popup) => set({ popup: popup }),
}));
