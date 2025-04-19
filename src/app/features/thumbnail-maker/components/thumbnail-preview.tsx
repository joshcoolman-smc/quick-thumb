"use client";

import { useEffect, useRef } from "react";
import { UseThumbnailUploadResult } from "../hooks/use-thumbnail-upload";
import { UseThumbnailTextResult } from "../hooks/use-thumbnail-text";
import { FontSelectionProps } from "../types"; // Import from new types file
import { fontMap } from "../fonts";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

interface ThumbnailPreviewProps {
  className?: string;
  upload: UseThumbnailUploadResult;
  textControls: UseThumbnailTextResult;
  fontSelection: FontSelectionProps; // Use the new prop type
}

export const ThumbnailPreview = ({
  className = "",
  upload,
  textControls,
  fontSelection,
}: ThumbnailPreviewProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const {
    selectedImage,
    fileInputRef,
    handleFileChange,
    handleSelectImage,
    position,
  } = upload;
  const { text } = textControls;

  // Draw image and text on canvas when it loads or position/text changes
  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (selectedImage) {
      // Calculate drawing dimensions based on image's natural size and scale
      const scale = position.scale / 100;
      const drawWidth = selectedImage.width * scale;
      const drawHeight = selectedImage.height * scale;

      // Calculate maximum allowed offset to keep image within bounds
      const maxOffsetY = Math.max(0, (drawHeight - canvas.height) / 2);

      // Calculate position with bounds checking
      // When at minimum scale (isXLocked), force X to be centered
      const x = position.isXLocked
        ? (canvas.width - drawWidth) / 2
        : (canvas.width - drawWidth) / 2 +
          (position.x * Math.max(0, (drawWidth - canvas.width) / 2)) / 100;
      const y =
        (canvas.height - drawHeight) / 2 + (position.y * maxOffsetY) / 100;

      // Draw the image
      ctx.drawImage(selectedImage, x, y, drawWidth, drawHeight);

      // Draw gradient overlay (only if transparentStop > 0)
      if (text.gradient.transparentStop > 0) {
        const gradient = ctx.createLinearGradient(
          0,
          canvas.height - (canvas.height * text.gradient.transparentStop) / 100, // Start at the transparent stop point
          0,
          canvas.height // End at bottom
        );
        gradient.addColorStop(0, "rgba(0,0,0,0)"); // Transparent at top
        gradient.addColorStop(1, "rgba(0,0,0,0.8)"); // 80% black at bottom

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
    }

    // Draw text overlay (on top of gradient)
    ctx.textAlign = text.alignment;

    // Calculate x position based on alignment
    const xPos =
      text.alignment === "left"
        ? 50
        : text.alignment === "right"
        ? canvas.width - 50
        : canvas.width / 2;

    // Calculate dynamic spacing based on font sizes
    const margin = {
      top: 30, // Reduced from 50 to move text higher
      bottom: 50,
    };
    // Calculate dynamic gap that decreases as subtitle size increases
    const titleSubtitleGap = Math.max(
      6,
      Math.round(24 - text.fontSize.subtitle * 0.1)
    );

    // Calculate Y positions based on text.position
    let titleY: number;
    let subtitleY: number;

    switch (text.position) {
      case "top":
        titleY = margin.top + text.fontSize.title * 0.8; // Multiply by 0.8 to account for font metrics
        subtitleY = titleY + titleSubtitleGap + text.fontSize.subtitle;
        break;
      case "middle":
        // Position title baseline slightly below vertical center
        const middleY = canvas.height / 2;
        titleY = middleY + text.fontSize.title * 0.2; // Move baseline down by 20% of title font size
        subtitleY = titleY + titleSubtitleGap + text.fontSize.subtitle;
        break;
      default: // bottom
        subtitleY = canvas.height - margin.bottom;
        titleY = subtitleY - titleSubtitleGap - text.fontSize.subtitle;
        break;
    }

    // Always apply text shadow
    ctx.shadowColor = "rgba(0, 0, 0, 0.75)";
    ctx.shadowBlur = 3;
    ctx.shadowOffsetX = 3;
    ctx.shadowOffsetY = 3;

    // Draw title with color
    ctx.fillStyle = text.color.title;
    const titleFont =
      fontMap[fontSelection.selection.title.family as keyof typeof fontMap];
    ctx.font = `${
      fontSelection.selection.title.weight === 900 ? "900" : "normal"
    } ${text.fontSize.title}px ${titleFont.style.fontFamily}`;
    // Draw title
    ctx.fillText(text.title, xPos, titleY);

    // Draw subtitle with color
    ctx.fillStyle = text.color.subtitle;
    const subtitleFont =
      fontMap[fontSelection.selection.subtitle.family as keyof typeof fontMap];
    ctx.font = `${
      fontSelection.selection.subtitle.weight === 900 ? "900" : "normal"
    } ${text.fontSize.subtitle}px ${subtitleFont.style.fontFamily}`;
    // Draw subtitle
    ctx.fillText(text.subtitle, xPos, subtitleY);
  }, [selectedImage, position, text, fontSelection]);

  return (
    <div className={`flex flex-col gap-4 ${className}`}>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
      <div className="space-y-4">
        <div
          className={`h-[300px] w-[533px] mx-auto rounded-lg border border-zinc-200 bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900 ${
            !selectedImage ? "cursor-pointer" : ""
          }`}
          onClick={() => !selectedImage && handleSelectImage()}
        >
          <canvas
            ref={canvasRef}
            width={1280}
            height={720}
            className="w-full h-full rounded-lg"
          />
        </div>
        <div className="flex justify-between items-center px-0.5">
          <Button variant="outline" size="sm" onClick={handleSelectImage}>
            Upload
          </Button>
          {selectedImage && (
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e.stopPropagation();
                if (!canvasRef.current) return;

                // Create a temporary canvas without rounded corners
                const tempCanvas = document.createElement("canvas");
                tempCanvas.width = 1280;
                tempCanvas.height = 720;
                const tempCtx = tempCanvas.getContext("2d");
                if (!tempCtx) return;

                // Draw the current canvas content to the temp canvas
                tempCtx.drawImage(canvasRef.current, 0, 0);

                // Convert to jpeg and download
                tempCanvas.toBlob(
                  (blob) => {
                    if (!blob) return;
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement("a");
                    a.href = url;
                    a.download = "thumbnail.jpg";
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                    URL.revokeObjectURL(url);
                  },
                  "image/jpeg",
                  0.95
                );
              }}
            >
              <Download className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ThumbnailPreview;
