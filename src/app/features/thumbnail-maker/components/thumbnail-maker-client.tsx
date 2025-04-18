"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useThumbnailUpload } from "@/app/features/thumbnail-maker/hooks/use-thumbnail-upload";
import { useThumbnailText } from "@/app/features/thumbnail-maker/hooks/use-thumbnail-text";
import { useFontSelectionStore } from "@/app/features/thumbnail-maker/store/font-selection-store";
import { FontSelectorSidebar } from "@/app/features/thumbnail-maker/components/font-selector/font-selector-sidebar";
import { allFonts, FontSelectionProps } from "../types"; // Import from new types file

// Dynamically import the components with SSR disabled
const ThumbnailPreview = dynamic(
  () =>
    import("@/app/features/thumbnail-maker/components/thumbnail-preview").then(
      (mod) => mod.default
    ),
  { ssr: false }
);

const ThumbnailControls = dynamic(
  () =>
    import("@/app/features/thumbnail-maker/components/thumbnail-controls").then(
      (mod) => mod.default
    ),
  { ssr: false }
);

export function ThumbnailMakerClient() {
  const upload = useThumbnailUpload();
  const textControls = useThumbnailText();

  // Use the Zustand store - select state and actions separately
  const { title, subtitle } = useFontSelectionStore();
  const { updateTitleFont, updateSubtitleFont } = useFontSelectionStore(
    (state) => state.actions
  );

  // State to track hydration based on Zustand's persist status
  const [isHydrated, setIsHydrated] = useState(false);

  // Trigger rehydration on mount
  useEffect(() => {
    useFontSelectionStore.persist.rehydrate();
  }, []);

  // Update isHydrated state based on store's hydration status
  useEffect(() => {
    const checkHydration = () => {
      setIsHydrated(useFontSelectionStore.persist.hasHydrated());
    };

    // Check immediately and subscribe to changes
    checkHydration();
    const unsubscribe = useFontSelectionStore.persist.onHydrate(checkHydration);

    // Also handle finishHydration if onHydrate isn't sufficient
    const unsubscribeFinish =
      useFontSelectionStore.persist.onFinishHydration(checkHydration);

    return () => {
      unsubscribe();
      unsubscribeFinish();
    };
  }, []);

  // Prepare props for child components, ensuring they don't render until hydrated
  const fontSelectionProps: FontSelectionProps = {
    fonts: allFonts, // Pass the static list of fonts
    selection: { title, subtitle },
    updateTitleFont,
    updateSubtitleFont,
  };

  // Prevent rendering children until hydration is complete to avoid mismatches
  if (!isHydrated) {
    // Optionally return a loading state or null
    return null; // Or a loading spinner
  }

  return (
    <>
      <div className="flex-1 flex flex-col items-center p-8">
        <ThumbnailPreview
          upload={upload}
          textControls={textControls}
          fontSelection={fontSelectionProps}
        />
        <ThumbnailControls
          upload={upload}
          textControls={textControls}
          fontSelection={fontSelectionProps}
        />
      </div>
      <FontSelectorSidebar
        fontSelection={fontSelectionProps}
        textControls={textControls}
      />
    </>
  );
}
