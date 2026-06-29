"use client";

import ButtonSection from "@/components/ButtonSection";
import GallerySection from "@/components/GallerySection";
import MapSection from "@/components/MapSection";
import { MapProvider } from "@/src/context/MapContext";

export default function MapClient() {
  return (
    <MapProvider>
      <div className="flex h-screen flex-col bg-zinc-100">
        <h1 className="text-4xl text-center bg-primary text-white p-2 font-bold font-mono">
          50 road trips
        </h1>
        <MapSection />
        <ButtonSection />
        <GallerySection />
      </div>
    </MapProvider>
  );
}
