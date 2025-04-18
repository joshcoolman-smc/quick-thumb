import { fontMap } from "../fonts";
import type { FontConfig, FontWeight, FontIdentifier } from "../types"; // Import from new types file

// Keys for localStorage
export const STORAGE_KEYS = {
  TEXT_SETTINGS: "thumbnail-maker:text-settings",
  FONT_SELECTION: "thumbnail-maker:font-selection",
};

// Helper to find font by family and weight
export const findFont = ({ family, weight }: FontIdentifier): FontConfig => {
  // Convert family and weight to a font config
  return {
    family,
    weight: Number(weight) as FontWeight, // Ensure weight is a number
    displayName: family.split(" ")[0], // Use first word as display name
    instance: fontMap[family as keyof typeof fontMap],
  };
};

// Safe storage operations with type safety
export const storage = {
  get: <T>(key: string, fallback: T): T => {
    try {
      if (typeof localStorage !== "undefined") {
        const item = localStorage.getItem(key);
        if (!item) return fallback;

        try {
          return JSON.parse(item) as T;
        } catch (parseError) {
          console.error(`Error parsing ${key} from localStorage:`, parseError);
          return fallback;
        }
      }
      return fallback;
    } catch (error) {
      console.error(`Error retrieving ${key} from localStorage:`, error);
      return fallback;
    }
  },

  set: <T>(key: string, value: T): void => {
    try {
      if (typeof localStorage !== "undefined") {
        localStorage.setItem(key, JSON.stringify(value));
      }
    } catch (error) {
      console.error(`Error storing ${key} to localStorage:`, error);
    }
  },
};
