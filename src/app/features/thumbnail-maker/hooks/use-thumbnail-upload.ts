"use client";

import { useEffect, useRef, useState } from "react";

export interface ImagePosition {
  scale: number;
  x: number;
  y: number;
  minScale: number;
  maxScale: number;
  isXLocked: boolean;
}

export interface UseThumbnailUploadResult {
  selectedImage: HTMLImageElement | null;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSelectImage: () => void;
  position: ImagePosition;
  updatePosition: (updates: Partial<ImagePosition>) => void;
}

export const useThumbnailUpload = (): UseThumbnailUploadResult => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedImage, setSelectedImage] = useState<HTMLImageElement | null>(
    null
  );
  const [position, setPosition] = useState<ImagePosition>({
    scale: 100,
    minScale: 100,
    maxScale: 300,
    x: 0,
    y: 0,
    isXLocked: true,
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Create object URL for the file
    const url = URL.createObjectURL(file);

    // Load the image
    const img = new Image();
    img.onload = () => {
      // Calculate minimum scale to make image width match canvas width
      const minScale = (1280 / img.width) * 100;

      // Maximum scale is 200% more than minimum scale
      const maxScale = minScale + 200;

      setSelectedImage(img);
      // Set position with calculated minimum and maximum scale
      setPosition({
        scale: minScale,
        x: 0,
        y: 0,
        minScale,
        maxScale,
        isXLocked: true, // X is locked at minimum scale
      });
      URL.revokeObjectURL(url); // Clean up the URL
    };
    img.src = url;
  };

  const handleSelectImage = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const updatePosition = (updates: Partial<ImagePosition>) => {
    setPosition((prev) => {
      // Calculate new scale first
      const newScale = updates.scale
        ? Math.min(Math.max(updates.scale, prev.minScale), prev.maxScale)
        : prev.scale;

      // Determine if X should be locked based on scale
      const isXLocked = newScale === prev.minScale;

      // If X is locked, force X position to 0
      const newX = isXLocked ? 0 : updates.x ?? prev.x;

      return {
        ...prev,
        ...updates,
        scale: newScale,
        x: newX,
        isXLocked,
      };
    });
  };

  return {
    selectedImage,
    fileInputRef,
    handleFileChange,
    handleSelectImage,
    position,
    updatePosition,
  };
};
