import { create } from "zustand";

export const useStore = create((set) => ({
  // Active modal: 'projects' | 'resume' | 'certificates' | 'themes' | null
  activeModal: null,
  openModal: (modalType) => set({ activeModal: modalType }),
  closeModal: () => set({ activeModal: null }),

  // Active 3D/Canvas background
  activeBackground: "floatinglines",
  setBackground: (id) => set({ activeBackground: id }),
}));
