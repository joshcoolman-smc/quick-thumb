"use client";

import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";
import { ThumbnailText } from "../hooks/use-thumbnail-text";

interface FontSizeControlsProps {
  text: ThumbnailText;
  onFontSizeChange: (type: "title" | "subtitle", increment: boolean) => void;
}

const fontSizes = [48, 62, 81, 105, 137, 178, 231, 243, 255, 268, 281];

export const FontSizeControls = ({
  text,
  onFontSizeChange,
}: FontSizeControlsProps) => {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center">
        <span className="text-xs text-muted-foreground whitespace-nowrap w-[85px]">
          Title Size
        </span>
        <div className="flex gap-1 ml-auto">
          <Button
            variant="outline"
            size="icon"
            className="h-6 w-6"
            onClick={() => onFontSizeChange("title", false)}
            disabled={text.fontSize.title === fontSizes[0]}
          >
            <Minus className="h-3 w-3" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="h-6 w-6"
            onClick={() => onFontSizeChange("title", true)}
            disabled={text.fontSize.title === fontSizes[fontSizes.length - 1]}
          >
            <Plus className="h-3 w-3" />
          </Button>
        </div>
      </div>
      <div className="flex items-center">
        <span className="text-xs text-muted-foreground whitespace-nowrap w-[85px]">
          Subtitle Size
        </span>
        <div className="flex gap-1 ml-auto">
          <Button
            variant="outline"
            size="icon"
            className="h-6 w-6"
            onClick={() => onFontSizeChange("subtitle", false)}
            disabled={text.fontSize.subtitle === fontSizes[0]}
          >
            <Minus className="h-3 w-3" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="h-6 w-6"
            onClick={() => onFontSizeChange("subtitle", true)}
            disabled={
              text.fontSize.subtitle === fontSizes[fontSizes.length - 1]
            }
          >
            <Plus className="h-3 w-3" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FontSizeControls;
