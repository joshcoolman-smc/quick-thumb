"use client";

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
    <div className="grid grid-cols-3 gap-0.5 w-full max-w-[150px] aspect-video border border-zinc-200 dark:border-zinc-800">
      {/* Top row */}
      <button
        type="button"
        className={`bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors ${
          isActive("left", "top") ? "bg-zinc-200 dark:bg-zinc-800" : ""
        }`}
        onClick={() => onPositionChange("left", "top")}
      />
      <button
        type="button"
        className={`bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors ${
          isActive("center", "top") ? "bg-zinc-200 dark:bg-zinc-800" : ""
        }`}
        onClick={() => onPositionChange("center", "top")}
      />
      <button
        type="button"
        className={`bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors ${
          isActive("right", "top") ? "bg-zinc-200 dark:bg-zinc-800" : ""
        }`}
        onClick={() => onPositionChange("right", "top")}
      />

      {/* Middle row */}
      <button
        type="button"
        className={`bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors ${
          isActive("left", "middle") ? "bg-zinc-200 dark:bg-zinc-800" : ""
        }`}
        onClick={() => onPositionChange("left", "middle")}
      />
      <button
        type="button"
        className={`bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors ${
          isActive("center", "middle") ? "bg-zinc-200 dark:bg-zinc-800" : ""
        }`}
        onClick={() => onPositionChange("center", "middle")}
      />
      <button
        type="button"
        className={`bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors ${
          isActive("right", "middle") ? "bg-zinc-200 dark:bg-zinc-800" : ""
        }`}
        onClick={() => onPositionChange("right", "middle")}
      />

      {/* Bottom row */}
      <button
        type="button"
        className={`bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors ${
          isActive("left", "bottom") ? "bg-zinc-200 dark:bg-zinc-800" : ""
        }`}
        onClick={() => onPositionChange("left", "bottom")}
      />
      <button
        type="button"
        className={`bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors ${
          isActive("center", "bottom") ? "bg-zinc-200 dark:bg-zinc-800" : ""
        }`}
        onClick={() => onPositionChange("center", "bottom")}
      />
      <button
        type="button"
        className={`bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors ${
          isActive("right", "bottom") ? "bg-zinc-200 dark:bg-zinc-800" : ""
        }`}
        onClick={() => onPositionChange("right", "bottom")}
      />
    </div>
  );
};

export default TextPositionSelector;
