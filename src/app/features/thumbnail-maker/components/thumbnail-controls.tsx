"use client";

import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TextPositionSelector } from "./text-position-selector";
import { Minus, Plus } from "lucide-react";
import { UseThumbnailUploadResult } from "../hooks/use-thumbnail-upload";
import { UseThumbnailTextResult } from "../hooks/use-thumbnail-text";
import { FontSelectionProps } from "../types"; // Import from new types file

interface ThumbnailControlsProps {
  upload: UseThumbnailUploadResult;
  textControls: UseThumbnailTextResult;
  fontSelection: FontSelectionProps; // Use the new prop type
}

export const ThumbnailControls = ({
  upload,
  textControls,
}: ThumbnailControlsProps) => {
  const { position, updatePosition, selectedImage } = upload;
  const { text, updateText } = textControls;

  return (
    <div className="w-full max-w-[533px] mx-auto mt-6">
      <Tabs defaultValue="text" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="text" className="bg-transparent">
            Text
          </TabsTrigger>
          <TabsTrigger value="image">Image</TabsTrigger>
        </TabsList>
        <TabsContent value="image" className="space-y-6 mt-4">
          {selectedImage && (
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none">
                  Scale
                </label>
                <Slider
                  value={[position.scale]}
                  onValueChange={([scale]) => updatePosition({ scale })}
                  min={position.minScale}
                  max={position.maxScale}
                  step={1}
                  className="py-2"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium leading-none">
                  X Position
                </label>
                <div className={position.isXLocked ? "opacity-50" : ""}>
                  <Slider
                    value={[position.x]}
                    onValueChange={([x]) =>
                      !position.isXLocked && updatePosition({ x })
                    }
                    min={-100}
                    max={100}
                    step={1}
                    className="py-2"
                    disabled={position.isXLocked}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium leading-none">
                  Y Position
                </label>
                <Slider
                  value={[position.y]}
                  onValueChange={([y]) => updatePosition({ y })}
                  min={-100}
                  max={100}
                  step={1}
                  className="py-2"
                />
              </div>
            </div>
          )}
        </TabsContent>
        <TabsContent value="text" className="mt-4 space-y-4">
          <div className="space-y-4">
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2 flex-1">
                  <Input
                    type="color"
                    className="h-4 w-4 rounded-full border border-zinc-200 dark:border-zinc-800 p-0 overflow-hidden [&::-webkit-color-swatch-wrapper]:p-0 [&::-webkit-color-swatch]:border-none"
                    value={text.color.title}
                    style={{ backgroundColor: text.color.title }}
                    onChange={(e) =>
                      updateText({
                        color: { ...text.color, title: e.target.value },
                      })
                    }
                  />
                  <div className="flex-1">
                    <Input
                      value={text.title}
                      onChange={(e) => updateText({ title: e.target.value })}
                      placeholder="Video Title"
                    />
                  </div>
                  <div className="flex gap-1">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-6 w-6"
                      onClick={() => {
                        const fontSizes = [
                          48, 62, 81, 105, 137, 178, 231, 243, 255, 268, 281,
                        ];
                        const currentSize = text.fontSize.title;
                        const currentIndex = fontSizes.indexOf(currentSize);
                        const newIndex = Math.max(currentIndex - 1, 0);
                        updateText({
                          fontSize: {
                            ...text.fontSize,
                            title: fontSizes[newIndex],
                          },
                        });
                      }}
                      disabled={text.fontSize.title === 48}
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-6 w-6"
                      onClick={() => {
                        const fontSizes = [
                          48, 62, 81, 105, 137, 178, 231, 243, 255, 268, 281,
                        ];
                        const currentSize = text.fontSize.title;
                        const currentIndex = fontSizes.indexOf(currentSize);
                        const newIndex = Math.min(
                          currentIndex + 1,
                          fontSizes.length - 1
                        );
                        updateText({
                          fontSize: {
                            ...text.fontSize,
                            title: fontSizes[newIndex],
                          },
                        });
                      }}
                      disabled={text.fontSize.title === 281}
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <label
                    htmlFor="title-caps"
                    className="text-sm font-medium leading-none"
                  >
                    Caps
                  </label>
                  <Switch
                    id="title-caps"
                    checked={text.caps.title}
                    onCheckedChange={(checked) =>
                      updateText({ caps: { ...text.caps, title: checked } })
                    }
                  />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2 flex-1">
                  <Input
                    type="color"
                    className="h-4 w-4 rounded-full border border-zinc-200 dark:border-zinc-800 p-0 overflow-hidden [&::-webkit-color-swatch-wrapper]:p-0 [&::-webkit-color-swatch]:border-none"
                    value={text.color.subtitle}
                    style={{ backgroundColor: text.color.subtitle }}
                    onChange={(e) =>
                      updateText({
                        color: { ...text.color, subtitle: e.target.value },
                      })
                    }
                  />
                  <div className="flex-1">
                    <Input
                      value={text.subtitle}
                      onChange={(e) => updateText({ subtitle: e.target.value })}
                      placeholder="Subtitle of the video here"
                    />
                  </div>
                  <div className="flex gap-1">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-6 w-6"
                      onClick={() => {
                        const fontSizes = [
                          48, 62, 81, 105, 137, 178, 231, 243, 255, 268, 281,
                        ];
                        const currentSize = text.fontSize.subtitle;
                        const currentIndex = fontSizes.indexOf(currentSize);
                        const newIndex = Math.max(currentIndex - 1, 0);
                        updateText({
                          fontSize: {
                            ...text.fontSize,
                            subtitle: fontSizes[newIndex],
                          },
                        });
                      }}
                      disabled={text.fontSize.subtitle === 48}
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-6 w-6"
                      onClick={() => {
                        const fontSizes = [
                          48, 62, 81, 105, 137, 178, 231, 243, 255, 268, 281,
                        ];
                        const currentSize = text.fontSize.subtitle;
                        const currentIndex = fontSizes.indexOf(currentSize);
                        const newIndex = Math.min(
                          currentIndex + 1,
                          fontSizes.length - 1
                        );
                        updateText({
                          fontSize: {
                            ...text.fontSize,
                            subtitle: fontSizes[newIndex],
                          },
                        });
                      }}
                      disabled={text.fontSize.subtitle === 281}
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <label
                    htmlFor="subtitle-caps"
                    className="text-sm font-medium leading-none"
                  >
                    Caps
                  </label>
                  <Switch
                    id="subtitle-caps"
                    checked={text.caps.subtitle}
                    onCheckedChange={(checked) =>
                      updateText({ caps: { ...text.caps, subtitle: checked } })
                    }
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none">
                  Gradient Height
                </label>
                <Slider
                  value={[text.gradient.transparentStop]}
                  onValueChange={([transparentStop]) =>
                    updateText({ gradient: { transparentStop } })
                  }
                  min={20}
                  max={150}
                  step={1}
                  className="py-2"
                />
              </div>

              <div className="flex items-center justify-between">
                <label
                  htmlFor="text-shadow"
                  className="text-sm font-medium leading-none"
                >
                  Text Shadow
                </label>
                <Switch
                  id="text-shadow"
                  checked={text.shadow.enabled}
                  onCheckedChange={(enabled) =>
                    updateText({ shadow: { enabled } })
                  }
                />
              </div>

              <div className="flex justify-center">
                <div className="flex flex-col items-center gap-1.5">
                  <TextPositionSelector
                    alignment={text.alignment}
                    position={text.position}
                    onPositionChange={(alignment, position) =>
                      updateText({ alignment, position })
                    }
                  />
                  <span className="text-xs text-muted-foreground">
                    Text Position
                  </span>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ThumbnailControls;
