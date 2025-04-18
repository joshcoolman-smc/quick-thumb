"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { UseThumbnailTextResult } from "../../hooks/use-thumbnail-text";
import { FontConfig, FontSelectionProps } from "../../types"; // Import from new types file
import { fontMap } from "../../fonts";

interface FontSelectorSidebarProps {
  fontSelection: FontSelectionProps; // Use the new prop type
  textControls: UseThumbnailTextResult;
}

export const FontSelectorSidebar = ({
  fontSelection,
  textControls,
}: FontSelectorSidebarProps) => {
  const { fonts, selection, updateTitleFont, updateSubtitleFont } =
    fontSelection;
  const { text, updateText } = textControls;

  const FontPreviewBlock = ({
    font,
    isSelected,
    onSelect,
  }: {
    font: FontConfig;
    isSelected: boolean;
    onSelect: () => void;
  }) => (
    <Button
      variant={isSelected ? "default" : "ghost"}
      className={`w-full justify-start px-3 py-1.5 h-auto hover:bg-zinc-800 ${
        isSelected ? "bg-zinc-800 text-zinc-200" : "text-zinc-400"
      }`}
      onClick={onSelect}
    >
      <div
        className={`text-lg ${
          fontMap[font.family as keyof typeof fontMap].className
        }`}
        style={{ fontWeight: font.weight }}
      >
        {font.displayName}
      </div>
    </Button>
  );

  return (
    <div className="w-[500px] border-l border-zinc-800 bg-zinc-900 p-3">
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <div className="px-1.5 text-sm font-medium text-zinc-200">
            Title Font
          </div>
          <ScrollArea className="h-[calc(100vh-80px)] rounded-md border-zinc-800">
            <div className="flex flex-col gap-0.5 p-1.5">
              {fonts.map((font) => (
                <FontPreviewBlock
                  key={`${font.family}-${font.weight}`}
                  font={font}
                  isSelected={
                    font.family === selection.title.family &&
                    font.weight === Number(selection.title.weight)
                  }
                  onSelect={() => updateTitleFont(font)}
                />
              ))}
            </div>
          </ScrollArea>
        </div>
        <div className="space-y-1.5">
          <div className="px-1.5 text-sm font-medium text-zinc-200">
            Subtitle Font
          </div>
          <ScrollArea className="h-[calc(100vh-80px)] rounded-md border-zinc-800">
            <div className="flex flex-col gap-0.5 p-1.5">
              {fonts.map((font) => (
                <FontPreviewBlock
                  key={`${font.family}-${font.weight}`}
                  font={font}
                  isSelected={
                    font.family === selection.subtitle.family &&
                    font.weight === Number(selection.subtitle.weight)
                  }
                  onSelect={() => updateSubtitleFont(font)}
                />
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
};
