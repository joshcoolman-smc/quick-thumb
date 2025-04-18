"use client";

import { useEffect, useState } from "react";
import { storage, STORAGE_KEYS } from "../utils/storage";

export type TextAlignment = "left" | "center" | "right";
export type TextPosition = "top" | "middle" | "bottom";

export interface ThumbnailText {
  title: string;
  subtitle: string;
  alignment: TextAlignment;
  position: TextPosition;
  fontSize: {
    title: number;
    subtitle: number;
  };
  caps: {
    title: boolean;
    subtitle: boolean;
  };
  color: {
    title: string;
    subtitle: string;
  };
  gradient: {
    transparentStop: number; // percentage from bottom where gradient becomes transparent
  };
  shadow: {
    enabled: boolean;
  };
}

export interface UseThumbnailTextResult {
  text: ThumbnailText;
  updateText: (updates: Partial<ThumbnailText>) => void;
}

export const useThumbnailText = (): UseThumbnailTextResult => {
  const [text, setText] = useState<ThumbnailText>(() =>
    storage.get(STORAGE_KEYS.TEXT_SETTINGS, {
      title: "Video Title",
      subtitle: "Subtitle of the video here",
      alignment: "left",
      position: "bottom",
      fontSize: {
        title: 105,
        subtitle: 62,
      },
      caps: {
        title: false,
        subtitle: false,
      },
      color: {
        title: "#d4d4d8",
        subtitle: "#d4d4d8",
      },
      gradient: {
        transparentStop: 40, // default 40% from bottom
      },
      shadow: {
        enabled: true, // default enabled for better readability
      },
    })
  );

  // Save to localStorage when settings change
  useEffect(() => {
    storage.set(STORAGE_KEYS.TEXT_SETTINGS, text);
  }, [text]);

  const updateText = (updates: Partial<ThumbnailText>) => {
    setText((prev) => ({
      ...prev,
      ...updates,
    }));
  };

  return {
    text,
    updateText,
  };
};
