import {
  Fanwood_Text,
  Ultra,
  Stint_Ultra_Expanded,
  Playfair_Display,
  Raleway,
  Chivo,
  Montserrat,
  Bitter,
} from "next/font/google";

// Fonts in specific order
export const ultra = Ultra({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export const playfairDisplay = Playfair_Display({
  weight: "900",
  subsets: ["latin"],
  display: "swap",
});

export const montserrat = Montserrat({
  weight: "900",
  subsets: ["latin"],
  display: "swap",
});

export const raleway = Raleway({
  weight: "900",
  subsets: ["latin"],
  display: "swap",
});

export const chivo = Chivo({
  weight: "900",
  subsets: ["latin"],
  display: "swap",
});

export const bitter = Bitter({
  weight: "900",
  subsets: ["latin"],
  display: "swap",
});

export const stintUltraExpanded = Stint_Ultra_Expanded({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

// Font map for easy lookup (in the same order)
export const fontMap = {
  Ultra: ultra,
  "Playfair Display": playfairDisplay,
  Montserrat: montserrat,
  Raleway: raleway,
  Chivo: chivo,
  Bitter: bitter,
  "Stint Ultra Expanded": stintUltraExpanded,
} as const;
