"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Type } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FontConfig, FontSelectionProps } from "../../types"; // Import from new types file
import { fontMap } from "../../fonts";

interface FontSelectorSheetProps {
  fontSelection: FontSelectionProps; // Use the new prop type
}

export const FontSelectorSheet = ({
  fontSelection,
}: FontSelectorSheetProps) => {
  const { fonts, selection, updateTitleFont, updateSubtitleFont } =
    fontSelection;

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
      className="w-full justify-start px-4 py-2.5 h-auto"
      onClick={onSelect}
    >
      <div
        className={`text-xl ${
          fontMap[font.family as keyof typeof fontMap].className
        }`}
        style={{ fontWeight: font.weight }}
      >
        {font.displayName}
      </div>
    </Button>
  );

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon">
          <Type className="h-4 w-4" />
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[400px] sm:w-[540px]">
        <SheetHeader>
          <SheetTitle>Font Selection</SheetTitle>
        </SheetHeader>
        <div className="mt-4">
          <Tabs defaultValue="title">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="title">Title Font</TabsTrigger>
              <TabsTrigger value="subtitle">Subtitle Font</TabsTrigger>
            </TabsList>
            <TabsContent value="title" className="mt-4">
              <ScrollArea className="h-[500px] rounded-md border p-4">
                <div className="flex flex-col gap-1">
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
            </TabsContent>
            <TabsContent value="subtitle" className="mt-4">
              <ScrollArea className="h-[500px] rounded-md border p-4">
                <div className="flex flex-col gap-1">
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
            </TabsContent>
          </Tabs>
        </div>
      </SheetContent>
    </Sheet>
  );
};
