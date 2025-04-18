import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import {
  FontConfig,
  FontWeight,
  allFonts,
  SerializedFontSelection,
} from "../types"; // Import from new types file
import { storage, STORAGE_KEYS } from "../utils/storage"; // Reuse storage utils

interface FontSelectionState {
  title: FontConfig;
  subtitle: FontConfig;
  actions: {
    updateTitleFont: (font: FontConfig) => void;
    updateSubtitleFont: (font: FontConfig) => void;
  };
}

// Define default fonts using the existing logic
const defaultFonts = {
  title:
    allFonts.find((f) => f.family === "Ultra" && f.weight === 400) ||
    allFonts[0],
  subtitle:
    allFonts.find((f) => f.family === "Bitter" && f.weight === 900) ||
    allFonts[0],
};

export const useFontSelectionStore = create<FontSelectionState>()(
  persist(
    (set, get) => ({
      title: defaultFonts.title, // Initial state before hydration
      subtitle: defaultFonts.subtitle, // Initial state before hydration
      actions: {
        updateTitleFont: (font) => set({ title: font }),
        updateSubtitleFont: (font) => set({ subtitle: font }),
      },
    }),
    {
      name: STORAGE_KEYS.FONT_SELECTION, // Key for localStorage
      storage: createJSONStorage(() => localStorage), // Use localStorage
      // Only persist the font identifiers, not the full config with instances
      partialize: (state) => ({
        title: { family: state.title.family, weight: state.title.weight },
        subtitle: {
          family: state.subtitle.family,
          weight: state.subtitle.weight,
        },
      }),
      // We will trigger rehydration manually using store.persist.rehydrate()
      skipHydration: true,
    }
  )
);
