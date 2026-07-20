import { create } from 'zustand';

export const useStore = create((set) => ({
  // Estado del sistema
  isAuthenticated: false,
  systemReady: false,
  
  // Gestión de UI (Tiling / Modales)
  activeWindows: [], // Almacena ['CV', 'CERTIFICADOS', 'PROYECTOS']
  
  // Acciones
  unlockSystem: () => set({ isAuthenticated: true }),
  bootSequenceComplete: () => set({ systemReady: true }),
  
  openWindow: (windowId) => set((state) => ({
    activeWindows: state.activeWindows.includes(windowId) 
      ? state.activeWindows 
      : [...state.activeWindows, windowId]
  })),
  
  closeWindow: (windowId) => set((state) => ({
    activeWindows: state.activeWindows.filter(id => id !== windowId)
  }))
}));
