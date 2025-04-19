"use client";

import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TextPositionSelector } from "./text-position-selector";
import { NumberStepper } from "@/components/ui/number-stepper";
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
                    className="h-8 w-8 rounded-full border border-zinc-200 dark:border-zinc-800 p-0 overflow-hidden [&::-webkit-color-swatch-wrapper]:p-0 [&::-webkit-color-swatch]:border-none"
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
                      className="rounded"
                      value={text.title}
                      onChange={(e) => updateText({ title: e.target.value })}
                      placeholder="Video Title"
                    />
                  </div>
                  <NumberStepper
                    min={30}
                    max={280}
                    increment={10}
                    currentValue={text.fontSize.title}
                    onValueChange={(newSize: number) =>
                      updateText({
                        fontSize: {
                          ...text.fontSize,
                          title: newSize,
                        },
                      })
                    }
                  />
                </div>
                {/* Removed Caps Switch for Title */}
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2 flex-1">
                  <Input
                    type="color"
                    className="h-8 w-8 rounded-full border border-zinc-200 dark:border-zinc-800 p-0 overflow-hidden [&::-webkit-color-swatch-wrapper]:p-0 [&::-webkit-color-swatch]:border-none"
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
                      className="rounded"
                      onChange={(e) => updateText({ subtitle: e.target.value })}
                      placeholder="Subtitle of the video here"
                    />
                  </div>
                  <NumberStepper
                    min={30}
                    max={280}
                    increment={10}
                    currentValue={text.fontSize.subtitle}
                    onValueChange={(newSize: number) =>
                      updateText({
                        fontSize: {
                          ...text.fontSize,
                          subtitle: newSize,
                        },
                      })
                    }
                  />
                </div>
                {/* Removed Caps Switch for Subtitle */}
              </div>
            </div>
            <div className="flex justify-center">
              <TextPositionSelector
                alignment={text.alignment}
                position={text.position}
                onPositionChange={(alignment, position) =>
                  updateText({ alignment, position })
                }
              />
            </div>

            <div className="flex flex-row items-center gap-2">
              <label className="text-sm font-medium leading-none">
                Gradient
              </label>
              <Slider
                value={[text.gradient.transparentStop]}
                onValueChange={([transparentStop]) =>
                  updateText({ gradient: { transparentStop } })
                }
                min={0}
                max={150}
                step={1}
                className="py-2"
              />
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ThumbnailControls;
