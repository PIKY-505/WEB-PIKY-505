import { create } from "zustand";

export const useStore = create((set) => ({
  // --- NAVEGACIÓN (Selector / "Tienda") ---
  activeShop: null, // 'backgrounds' | 'cursors' | 'trails'
  openShop: (shopType) => set({ activeShop: shopType }),
  closeShop: () => set({ activeShop: null }),

  // --- NAVEGACIÓN DEL PORTFOLIO (Modales) ---
  activeModal: null, // 'projects' | 'resume' | 'certificates'
  openModal: (modalType) => set({ activeModal: modalType, activeShop: null }), // Cierra la tienda al abrir modal
  closeModal: () => set({ activeModal: null }),

  // --- TERMINAL INTERACTIVA ---
  isTerminalOpen: false,
  openTerminal: () => set({ isTerminalOpen: true }),
  closeTerminal: () => set({ isTerminalOpen: false }),
  toggleTerminal: () => set((state) => ({ isTerminalOpen: !state.isTerminalOpen })),

  // --- ESTADO INICIAL / AJUSTES ---
  // Todos los items se asumen como desbloqueados por defecto.
  
  // 1. FONDOS
  activeBackground: "floatinglines",
  setBackground: (id) => set({ activeBackground: id }),

  // 2. CURSORES
  activeCursor: "default",
  setCursor: (id) => set({ activeCursor: id }),

  // 3. RASTROS / MASCOTAS
  activeTrail: "none",
  setTrail: (id) => set({ activeTrail: id })
}));

// Exportamos también como useGameStore temporalmente si algún componente antiguo lo requiere (aunque los limpiaremos)
export const useGameStore = useStore;
