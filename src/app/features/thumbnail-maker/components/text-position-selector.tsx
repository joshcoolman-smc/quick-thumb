"use client";

import { cn } from "@/lib/utils";
import { TextAlignment, TextPosition } from "../hooks/use-thumbnail-text";

interface TextPositionSelectorProps {
  alignment: TextAlignment;
  position: TextPosition;
  onPositionChange: (alignment: TextAlignment, position: TextPosition) => void;
}

export const TextPositionSelector = ({
  alignment,
  position,
  onPositionChange,
}: TextPositionSelectorProps) => {
  const isActive = (a: TextAlignment, p: TextPosition) =>
    alignment === a && position === p;

  return (
    <div>
      <div className="grid grid-cols-3  gap-[1px] bg-zinc-500 w-32  aspect-video border border-zinc-200 dark:border-zinc-500">
        {/* Top row */}
        <button
          type="button"
          className={cn(
            "cursor-pointer",
            isActive("left", "top") ? "bg-zinc-600" : "bg-zinc-800"
          )}
          onClick={() => onPositionChange("left", "top")}
        />
        <button
          type="button"
          className={cn(
            "cursor-pointer",
            "flex items-center flex-col gap-[2px] justify-start ",
            isActive("center", "top") ? "bg-zinc-600" : "bg-zinc-800"
          )}
          onClick={() => onPositionChange("center", "top")}
        ></button>
        <button
          type="button"
          className={cn(
            "cursor-pointer",
            "flex items-end flex-col gap-[2px] justify-start ",
            isActive("right", "top") ? "bg-zinc-600" : "bg-zinc-800"
          )}
          onClick={() => onPositionChange("right", "top")}
        ></button>

        {/* Middle row */}
        <button
          type="button"
          className={cn(
            "cursor-pointer",
            isActive("left", "middle") ? "bg-zinc-600" : "bg-zinc-800"
          )}
          onClick={() => onPositionChange("left", "middle")}
        />
        <button
          type="button"
          className={cn(
            "cursor-pointer",
            isActive("center", "middle") ? "bg-zinc-600" : "bg-zinc-800"
          )}
          onClick={() => onPositionChange("center", "middle")}
        />
        <button
          type="button"
          className={cn(
            "cursor-pointer",
            isActive("right", "middle") ? "bg-zinc-600" : "bg-zinc-800"
          )}
          onClick={() => onPositionChange("right", "middle")}
        />

        {/* Bottom row */}
        <button
          type="button"
          className={cn(
            "cursor-pointer",
            isActive("left", "bottom") ? "bg-zinc-600" : "bg-zinc-800"
          )}
          onClick={() => onPositionChange("left", "bottom")}
        />
        <button
          type="button"
          className={cn(
            "cursor-pointer",
            isActive("center", "bottom") ? "bg-zinc-600" : "bg-zinc-800"
          )}
          onClick={() => onPositionChange("center", "bottom")}
        />
        <button
          type="button"
          className={cn(
            "cursor-pointer",
            isActive("right", "bottom") ? "bg-zinc-600" : "bg-zinc-800"
          )}
          onClick={() => onPositionChange("right", "bottom")}
        />
      </div>

      <div className="text-xs text-center w-full pt-1 text-muted-foreground">
        Text Position
      </div>
    </div>
  );
};

export default TextPositionSelector;
