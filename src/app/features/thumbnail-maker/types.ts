import { fontMap } from "./fonts";

export type FontWeight = 400 | 600 | 700 | 900;

export interface FontConfig {
  family: string;
  weight: FontWeight;
  displayName: string;
  instance: any; // Consider defining a more specific type if possible
}

// Define the structure for storing in localStorage
export interface SerializedFontSelection {
  title: { family: string; weight: FontWeight };
  subtitle: { family: string; weight: FontWeight };
}

// Type for the findFont function parameter
export interface FontIdentifier {
  family: string;
  weight: FontWeight;
}

// Fonts in specific order (Moved from use-font-selection.ts)
export const allFonts: FontConfig[] = [
  {
    family: "Ultra",
    weight: 400,
    displayName: "Ultra",
    instance: fontMap["Ultra"],
  },
  {
    family: "Playfair Display",
    weight: 900,
    displayName: "Playfair",
    instance: fontMap["Playfair Display"],
  },
  {
    family: "Montserrat",
    weight: 900,
    displayName: "Montserrat",
    instance: fontMap["Montserrat"],
  },
  {
    family: "Raleway",
    weight: 900,
    displayName: "Raleway",
    instance: fontMap["Raleway"],
  },
  {
    family: "Chivo",
    weight: 900,
    displayName: "Chivo",
    instance: fontMap["Chivo"],
  },
  {
    family: "Bitter",
    weight: 900,
    displayName: "Bitter",
    instance: fontMap["Bitter"],
  },
  {
    family: "Stint Ultra Expanded",
    weight: 400,
    displayName: "Stint",
    instance: fontMap["Stint Ultra Expanded"],
  },
];

// Interface for the props passed down from ThumbnailMakerClient
// This matches the old UseFontSelectionResult structure
export interface FontSelectionProps {
  fonts: typeof allFonts;
  selection: {
    title: FontConfig;
    subtitle: FontConfig;
  };
  updateTitleFont: (font: FontConfig) => void;
  updateSubtitleFont: (font: FontConfig) => void;
}
