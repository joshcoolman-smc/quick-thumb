# Thumbnail Maker Feature Documentation

## Overview

This feature allows users to create simple thumbnails by uploading an image, positioning it, and overlaying customizable title and subtitle text. Key settings like text content, styling, and font choices are persisted in `localStorage`.

## Architecture

The feature follows a modular pattern located in `src/app/features/thumbnail-maker/`.

-   **`components/`**: Contains UI components.
    -   `ThumbnailPreview.tsx`: Renders the canvas preview with the image and text overlay.
    -   `ThumbnailControls.tsx`: Provides UI controls (sliders, inputs, switches) for image and text settings, organized in tabs.
    -   `font-selector/`: Components for font selection UI (`FontSelectorSidebar.tsx`, `FontSelectorSheet.tsx`).
    -   `ThumbnailMakerClient.tsx`: A client-side wrapper component that integrates hooks and the Zustand store, manages hydration, and passes props to child components. Ensures client-specific logic runs correctly.
-   **`hooks/`**: Contains custom React hooks for managing specific state logic.
    -   `useThumbnailUpload.ts`: Manages image file selection, loading, and positioning state.
    -   `useThumbnailText.ts`: Manages text content, styling (color, size, caps, shadow), gradient, and text position/alignment state. Includes persistence to `localStorage`.
-   **`store/`**: Contains Zustand stores for global/shared state.
    -   `font-selection-store.ts`: Manages title and subtitle font selections using Zustand. Includes persistence to `localStorage` via `persist` middleware and handles client-side rehydration.
-   **`types.ts`**: Defines shared TypeScript interfaces and types (e.g., `FontConfig`, `FontSelectionProps`). Also includes the `allFonts` constant array.
-   **`utils/`**: Utility functions.
    -   `storage.ts`: Helper functions for safe interaction with `localStorage`.
-   **`fonts.ts`**: Defines and exports `next/font` instances used in the application.

## State Management

-   **Image State:** Managed by `useThumbnailUpload` hook.
-   **Text State:** Managed by `useThumbnailText` hook, persisted to `localStorage`.
-   **Font Selection State:** Managed by `useFontSelectionStore` (Zustand), persisted to `localStorage`.

## Persistence

Text settings (content, size, color, position, etc.) and font selections (title/subtitle) are saved to the browser's `localStorage` to persist user preferences across sessions. Hydration issues related to reading `localStorage` on the client are handled by the `ThumbnailMakerClient` component and the Zustand store's rehydration mechanism.

## Key Features & Implementation Details

-   **Image Upload & Positioning:**
    -   Users can upload images.
    -   Images cover the 16:9 preview area while maintaining aspect ratio.
    -   Controls allow scaling and positioning (X/Y) with boundary constraints.
    -   Minimum scale ensures the image always fills the preview width.
    -   X-position is locked when at minimum scale.
-   **Text Overlay:**
    -   Title and subtitle text can be added.
    -   Controls for text content, color, font size, and capitalization (Caps toggle).
    -   Text shadow option.
    -   Adjustable gradient overlay height at the bottom.
    -   Text position selection (top, middle, bottom) and alignment (left, center, right).
-   **Font Selection:**
    -   Users can select different fonts for the title and subtitle from a predefined list (`allFonts`).
    -   Selection UI available in a sidebar (`FontSelectorSidebar`) and a sheet (`FontSelectorSheet` - currently seems unused but available).
    -   Selected fonts are applied to the preview.
-   **Canvas Rendering:**
    -   Uses the native HTML Canvas API in `ThumbnailPreview` for rendering the image and text.
    -   Dynamically imported with SSR disabled (`dynamic(() => ..., { ssr: false })`) to ensure browser APIs are available.
-   **Styling:**
    -   Uses Tailwind CSS and shadcn/ui components for styling.
    -   Supports dark mode (inherited from `next-themes`).

## Technical Decisions

-   Using native canvas API for rendering flexibility.
-   Zustand for managing font selection state and handling `localStorage` persistence/hydration reliably.
-   Custom hooks (`useThumbnailUpload`, `useThumbnailText`) for encapsulating related state and logic.
-   `localStorage` for persisting user settings client-side.
-   Client wrapper component (`ThumbnailMakerClient`) to manage client-side initialization and hydration.
-   Dynamic imports (`next/dynamic`) with `ssr: false` for components relying heavily on browser APIs (like Canvas).
-   Feature module pattern for organization.
-   TypeScript for type safety.
-   `next/font` for font optimization.
-   shadcn/ui and Tailwind CSS for UI components and styling.

*(Previous step-by-step progress log removed for brevity, replaced with current architecture and feature summary)*
