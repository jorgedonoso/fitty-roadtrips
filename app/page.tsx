"use client";

import ButtonSection from "@/components/ButtonSection";
import GallerySection from "@/components/GallerySection";
import MapSection from "@/components/MapSection";
import { MapProvider } from "@/src/context/MapContext";

export default function MapClient() {
  return (
    <MapProvider>
      <div className="flex h-screen flex-col">
        <MapSection />
        <ButtonSection />
        <GallerySection />
      </div>
    </MapProvider>
  );
}
